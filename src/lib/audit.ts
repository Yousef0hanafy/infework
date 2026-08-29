import { supabase } from "@/integrations/supabase/client";

/** Records an internal admin action in the audit log. Never throws. */
export async function logAudit(params: {
  action: string;
  targetTable: string;
  targetId?: string | null;
  detail?: string | null;
}) {
  try {
    const { data } = await supabase.auth.getUser();
    await supabase.from("audit_events").insert({
      action: params.action,
      target_table: params.targetTable,
      target_id: params.targetId ?? null,
      actor_email: data.user?.email ?? null,
      detail: params.detail ?? null,
    });
  } catch {
    // Auditing must never block the operation it describes.
  }
}
