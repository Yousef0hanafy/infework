import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const contactSchema = z.object({
  audience_type: z.enum(["state", "industrial", "agricultural", "other"]),
  need_type: z.enum(["design", "execution", "om", "turnkey", "other"]),
  location_text: z.string().trim().max(200).optional().default(""),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(10).max(2000),
  consent: z.literal(true),
  honeypot: z.string().max(0).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactResult = { success: boolean; message?: string };

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
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
      const supabaseUrl = process.env['SUPABASE_URL'];
      const supabaseKey = process.env['SUPABASE_PUBLISHABLE_KEY'];
      if (!supabaseUrl || !supabaseKey) {
        console.warn("[Infeworks] Supabase credentials not configured; enquiry logged to server stdout.", payload);
        return { success: true };
      }
      const { createClient } = await import("@supabase/supabase-js");
      const client = createClient<Database>(
        supabaseUrl,
        supabaseKey,
        {
          auth: {
            storage: undefined,
            persistSession: false,
            autoRefreshToken: false,
          },
        },
      );
      const { error } = await client.from("leads").insert({
        audience_type: payload.audience_type,
        need_type: payload.need_type,
        location_text: payload.location_text || null,
        email: payload.email,
        message: payload.message,
        status: "new",
      });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("[Infeworks] contact submission failed", error);
      return { success: false, message: "Something went wrong." };
    }
  });
