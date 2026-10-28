import { createContactFormSchema } from "./contact-schema";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const contactSchema = createContactFormSchema(false);

export type ContactInput = z.input<typeof contactSchema>;
export type ContactResult = { success: boolean; message?: string };

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }): Promise<ContactResult> => {
    if (
      data &&
      typeof data === "object" &&
      "honeypot" in data &&
      typeof data.honeypot === "string" &&
      data.honeypot.length > 0
    )
      return { success: true };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, message: "Invalid submission." };
    }
    const { honeypot, ...fields } = parsed.data;
    const payload = {
      ...fields,
      audience_type:
        fields.inquiry_type === "technical" ? fields.audience_type : fields.inquiry_type,
      need_type: fields.inquiry_type === "technical" ? fields.need_type : fields.inquiry_type,
      location_text: fields.inquiry_type === "technical" ? fields.location_text : "",
      capacity: fields.inquiry_type === "technical" ? fields.capacity : "",
      supplier_category: fields.inquiry_type === "supplier" ? fields.supplier_category : "",
      website: fields.inquiry_type === "supplier" ? fields.website : "",
    };
    if (honeypot) {
      // Silently accept bots without processing.
      return { success: true };
    }

    try {
      const supabaseUrl = process.env["SUPABASE_URL"];
      const supabaseKey = process.env["SUPABASE_PUBLISHABLE_KEY"];

      const metaHeaders = [
        payload.inquiry_type ? `[Type: ${payload.inquiry_type.toUpperCase()}]` : "",
        payload.name ? `[Name: ${payload.name}]` : "",
        payload.organization ? `[Org: ${payload.organization}]` : "",
        payload.phone ? `[Phone: ${payload.phone}]` : "",
        payload.capacity ? `[Capacity: ${payload.capacity}]` : "",
        payload.supplier_category ? `[Supplier Category: ${payload.supplier_category}]` : "",
        payload.website ? `[Link: ${payload.website}]` : "",
        payload.audience_type && payload.audience_type !== "other"
          ? `[Audience: ${payload.audience_type}]`
          : "",
        payload.need_type && payload.need_type !== "other" ? `[Scope: ${payload.need_type}]` : "",
      ]
        .filter(Boolean)
        .join(" ");

      const fullMessage = metaHeaders ? `${metaHeaders}\n\n${payload.message}` : payload.message;

      if (!supabaseUrl || !supabaseKey) {
        console.warn("[Infeworks] Enquiry storage is not configured.");
        return { success: false, message: "Enquiry not saved. Please contact our team directly." };
      }

      const { createClient } = await import("@supabase/supabase-js");
      const { createBoundedFetch } = await import("./upstream-fetch.server");
      const boundedFetch = createBoundedFetch({ timeoutMs: 5000 });
      const client = createClient<Database>(supabaseUrl, supabaseKey, {
        db: { retry: false },
        global: {
          fetch: (input, init) => {
            const headers = new Headers(init?.headers);
            if (
              supabaseKey.startsWith("sb_") &&
              headers.get("Authorization") === `Bearer ${supabaseKey}`
            )
              headers.delete("Authorization");
            headers.set("apikey", supabaseKey);
            return boundedFetch(input, { ...init, headers });
          },
        },
        auth: {
          storage: undefined,
          persistSession: false,
          autoRefreshToken: false,
        },
      });

      // Validate audience and need values against updated database constraints
      const validAudiences = new Set([
        "state",
        "industrial",
        "agricultural",
        "developer",
        "contractor",
        "commercial",
        "supplier",
        "general",
        "technical",
        "other",
      ]);

      const rawAudience = payload.audience_type || payload.inquiry_type || "other";
      const dbAudience = validAudiences.has(rawAudience) ? rawAudience : "other";

      const validNeeds = new Set([
        "design",
        "execution",
        "om",
        "turnkey",
        "water-treatment",
        "wastewater",
        "pumping",
        "networks",
        "mep",
        "pumps",
        "pipes",
        "valves",
        "membranes",
        "electrical",
        "automation",
        "chemicals",
        "civil-subcontract",
        "supplier",
        "general",
        "technical",
        "other",
      ]);

      const rawNeed = payload.need_type || payload.inquiry_type || "other";
      const dbNeed = validNeeds.has(rawNeed) ? rawNeed : "other";

      const { error } = await client.from("leads").insert({
        audience_type: dbAudience,
        need_type: dbNeed,
        location_text: payload.location_text || null,
        email: payload.email,
        message: fullMessage,
        status: "new",
      });

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("[Infeworks] Enquiry storage failed; receipt was not confirmed.");
      return { success: false, message: "Something went wrong." };
    }
  });
