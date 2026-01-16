import { supabase } from "@/app/lib/supabase";

export async function getCoaches() {
  return supabase.from("coachs").select("*");
}
