import { supabase } from "./supabase";

export async function getCoachs() {
  const { data, error } = await supabase.from("coachs").select("*");
  if (error) throw error;
  return data;
}

export async function createCoach(profile_id: string, nickname: string, position: string) {
  const { data, error } = await supabase
    .from("coachs")
    .insert([{ profile_id, nickname, position }])
    .select();
  if (error) throw error;
  return data[0];
}
