import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const contactSchema = z.object({
  inquiry_type: z.enum(["technical", "general", "supplier"]).optional().default("technical"),
  name: z.string().trim().max(150).optional().default(""),
  phone: z.string().trim().max(50).optional().default(""),
  organization: z.string().trim().max(200).optional().default(""),
  capacity: z.string().trim().max(200).optional().default(""),
  supplier_category: z.string().trim().max(200).optional().default(""),
  website: z.string().trim().max(300).optional().default(""),
  audience_type: z.string().trim().max(50).optional().default("other"),
  need_type: z.string().trim().max(50).optional().default("other"),
  location_text: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(5).max(3000),
  consent: z.literal(true),
  honeypot: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactResult = { success: boolean; message?: string };

export const submitContact = createServerFn({ method: "POST" })
  .validator((input: unknown) => input)
  .handler(async ({ data }): Promise<ContactResult> => {
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, message: "Invalid submission." };
    }
    const { honeypot, ...payload } = parsed.data;
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
        console.warn(
          "[Infeworks] Supabase credentials not configured; enquiry logged to server stdout.",
          { ...payload, message: fullMessage },
        );
        return { success: true };
      }

      const { createClient } = await import("@supabase/supabase-js");
      const client = createClient<Database>(supabaseUrl, supabaseKey, {
        auth: {
          storage: undefined,
          persistSession: false,
          autoRefreshToken: false,
        },
      });

      // Map expanded UI options to strict database CHECK constraints explicitly
      const audienceMap: Record<string, string> = {
        state: "state",
        industrial: "industrial",
        agricultural: "agricultural",
        developer: "other",
        contractor: "other",
        other: "other",
        general: "other",
        supplier: "other",
        technical: "other",
      };

      const rawAudience = payload.audience_type || payload.inquiry_type || "other";
      const dbAudience = audienceMap[rawAudience];
      if (!dbAudience) {
        return { success: false, message: "Invalid client type selected." };
      }

      const needMap: Record<string, string> = {
        turnkey: "turnkey",
        "water-treatment": "other",
        wastewater: "other",
        pumping: "other",
        networks: "other",
        mep: "other",
        om: "om",
        design: "design",
        other: "other",
        general: "other",
        supplier: "other",
        technical: "other",
      };

      const rawNeed = payload.need_type || payload.inquiry_type || "other";
      const dbNeed = needMap[rawNeed];
      if (!dbNeed) {
        return { success: false, message: "Invalid project scope selected." };
      }

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
      console.error("[Infeworks] contact submission failed", error);
      return { success: false, message: "Something went wrong." };
    }
  });
