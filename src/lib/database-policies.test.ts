import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const sql = readFileSync("docs/security/phase1-hardening.sql", "utf8");
const db = new PGlite();
const admin = "00000000-0000-0000-0000-000000000001";
const ordinary = "00000000-0000-0000-0000-000000000002";
beforeAll(async () => {
  await db.exec(`
    CREATE ROLE anon; CREATE ROLE authenticated; CREATE ROLE service_role BYPASSRLS;
    CREATE SCHEMA auth; CREATE SCHEMA storage;
    CREATE TABLE auth.users(id uuid PRIMARY KEY, raw_app_meta_data jsonb, is_anonymous boolean);
    CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql AS $$ SELECT nullif(current_setting('request.jwt.claim.sub',true),'')::uuid $$;
    CREATE FUNCTION auth.jwt() RETURNS jsonb LANGUAGE sql AS $$ SELECT jsonb_build_object('email',current_setting('request.jwt.claim.email',true)) $$;
    GRANT USAGE ON SCHEMA public,auth,storage TO anon,authenticated,service_role;
    GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA auth TO anon,authenticated;
    INSERT INTO auth.users VALUES ('${admin}','{"role":"admin"}',false),('${ordinary}','{}',false);
    CREATE TABLE public.projects(id uuid PRIMARY KEY, status text);
    CREATE TABLE public.media_assets(id uuid, project_id uuid, storage_path text, is_public boolean);
    CREATE TABLE public.leads(id uuid, email text, message text, status text);
    CREATE TABLE public.audit_events(id uuid, actor_email text);
    CREATE TABLE storage.buckets(id text, public boolean);
    CREATE TABLE storage.objects(id uuid, bucket_id text, name text);
    INSERT INTO storage.buckets VALUES ('project-media',false);
    INSERT INTO public.projects VALUES ('${admin}','published'),('${ordinary}','draft');
    INSERT INTO public.leads VALUES ('${admin}','private@example.test','Private enquiry','new');
    INSERT INTO public.media_assets VALUES ('${admin}','${admin}','approved.webp',true),('${ordinary}','${ordinary}','internal.webp',true);
    INSERT INTO public.media_assets VALUES (gen_random_uuid(),'${admin}','private.webp',false);
    INSERT INTO storage.objects VALUES (gen_random_uuid(),'project-media','private.webp');
    INSERT INTO storage.objects VALUES ('${admin}','project-media','approved.webp'),('${ordinary}','project-media','internal.webp');
  `);
  for (const table of [
    "public_project_profiles",
    "claims",
    "evidence",
    "locations",
    "capabilities",
    "project_capabilities",
    "site_settings",
  ])
    await db.exec(`CREATE TABLE public.${table}(id uuid);`);
  for (const table of [
    "projects",
    "public_project_profiles",
    "claims",
    "evidence",
    "locations",
    "capabilities",
    "project_capabilities",
    "leads",
    "site_settings",
    "media_assets",
    "audit_events",
  ])
    await db.exec(`
    ALTER TABLE public.${table} ENABLE ROW LEVEL SECURITY;
    GRANT ALL ON public.${table} TO authenticated,service_role;
    CREATE POLICY historical_open_policy ON public.${table} FOR ALL TO authenticated USING(true) WITH CHECK(true);
  `);
  await db.exec(`
    ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
    GRANT ALL ON storage.objects TO anon,authenticated,service_role;
    CREATE POLICY historical_storage_open ON storage.objects FOR ALL TO public USING(true) WITH CHECK(true);
    GRANT SELECT ON public.projects,public.media_assets TO anon;
    CREATE POLICY published_projects ON public.projects FOR SELECT TO anon USING(status='published');
    CREATE POLICY public_media ON public.media_assets FOR SELECT TO anon USING(is_public);
    GRANT INSERT ON public.leads TO anon;
    CREATE POLICY new_lead ON public.leads FOR INSERT TO anon WITH CHECK(status='new');
  `);
}, 30000);
afterAll(async () => {
  await db.close();
});

async function asUser(role: string, id = "", email = "") {
  await db.exec("RESET ROLE;");
  await db.query(
    "SELECT set_config('request.jwt.claim.sub',$1,false),set_config('request.jwt.claim.email',$2,false)",
    [id, email],
  );
  await db.exec(`SET ROLE ${role};`);
}

describe.sequential("prepared database guards", () => {
  it("demonstrates the existing ordinary-user access defect", async () => {
    await asUser("authenticated", ordinary, "ordinary@example.test");
    expect((await db.query("SELECT * FROM public.leads")).rows).toHaveLength(1);
    await asUser("postgres");
  });
  it("applies the prepared SQL on a private bucket with an established admin", async () => {
    await db.exec(sql);
  });
  it("blocks an ordinary signed-in user even while legacy permissive policies remain", async () => {
    await asUser("authenticated", ordinary, "ordinary@example.test");
    expect((await db.query("SELECT * FROM public.leads")).rows).toEqual([]);
    expect(
      (await db.query("UPDATE public.projects SET status='published' RETURNING id")).rows,
    ).toEqual([]);
    expect((await db.query("SELECT * FROM storage.objects")).rows).toEqual([]);
    await expect(
      db.exec("INSERT INTO public.audit_events(actor_email) VALUES ('forged@example.test')"),
    ).rejects.toThrow();
  });
  it("allows an authorized admin but rejects a forged audit identity", async () => {
    await asUser("authenticated", admin, "admin@example.test");
    expect((await db.query("SELECT * FROM public.leads")).rows).toHaveLength(1);
    await db.exec("INSERT INTO public.audit_events(actor_email) VALUES ('admin@example.test')");
    await expect(
      db.exec("INSERT INTO public.audit_events(actor_email) VALUES ('other@example.test')"),
    ).rejects.toThrow();
  });
  it("keeps anonymous approved media readable while hiding internal objects", async () => {
    await asUser("anon");
    expect(
      (await db.query<{ name: string }>("SELECT name FROM storage.objects")).rows.map(
        (x) => x.name,
      ),
    ).toEqual(["approved.webp"]);
    await expect(
      db.exec("INSERT INTO public.leads(email,message,status) VALUES ('bad','x','new')"),
    ).rejects.toThrow();
    await db.exec(
      "INSERT INTO public.leads(email,message,status) VALUES ('visitor@example.test','A valid engineering enquiry','new')",
    );
    await expect(db.query("SELECT * FROM public.leads")).rejects.toThrow();
    await expect(
      db.exec(
        "INSERT INTO storage.objects(bucket_id,name) VALUES ('project-media','unauthorized.webp')",
      ),
    ).rejects.toThrow();
    expect((await db.query("DELETE FROM storage.objects RETURNING name")).rows).toEqual([]);
  });
  it("refuses rollout while the bucket is public and leaves existing guards intact", async () => {
    await asUser("postgres");
    await db.exec("UPDATE storage.buckets SET public=true WHERE id='project-media'");
    await expect(db.exec(sql)).rejects.toThrow(/private bucket/);
    await db.exec("ROLLBACK; UPDATE storage.buckets SET public=false WHERE id='project-media'");
    await asUser("authenticated", ordinary, "ordinary@example.test");
    expect((await db.query("SELECT * FROM public.leads")).rows).toEqual([]);
  });
  it("refuses rollout without a confirmed administrator", async () => {
    await asUser("postgres");
    await db.exec("UPDATE auth.users SET raw_app_meta_data='{}'");
    await expect(db.exec(sql)).rejects.toThrow(/administrator/);
    await db.exec("ROLLBACK;");
    await db.exec(`UPDATE auth.users SET raw_app_meta_data='{"role":"admin"}' WHERE id='${admin}'`);
  });
  it("blocks an anonymous signed-in identity even if its metadata claims admin", async () => {
    await asUser("postgres");
    await db.exec(
      `UPDATE auth.users SET is_anonymous=true,raw_app_meta_data='{"role":"admin"}' WHERE id='${ordinary}'`,
    );
    await asUser("authenticated", ordinary, "ordinary@example.test");
    expect((await db.query("SELECT * FROM public.leads")).rows).toEqual([]);
  });
});
