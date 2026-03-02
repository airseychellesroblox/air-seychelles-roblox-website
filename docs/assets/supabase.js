import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://nmzccyjvlvuukugikbfd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5temNjeWp2bHZ1dWt1Z2lrYmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzODMxNzMsImV4cCI6MjA4Nzk1OTE3M30.Ix9qxfozxXtSrkR3uTt29pE0ZtfqFFrBGc9gxxusnHU
";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function sendToSheets(type, data) {
  const { data: res, error } = await supabase.functions.invoke("to-sheets", {
    body: { type, data },
  });
  if (error) throw error;
  return res;
}
