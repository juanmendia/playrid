import { supabase } from "./supabase";

export async function getPlayers() {
  return supabase.from("players").select("*");
}
