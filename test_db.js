import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cnmuvufxndpiqgqwkkzr.supabase.co";
const supabaseKey = "sb_publishable_1i2gdC4GdA6puNs6Ajm77w_EU393GBK";
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from("capabilities").select("*");
  console.log("Capabilities:", data);
  if (error) {
    console.error("Error fetching capabilities:", error);
  }
}

main();
