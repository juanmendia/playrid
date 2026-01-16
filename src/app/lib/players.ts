import { supabase } from "./supabase";

export async function getPlayers() {
  const { data, error } = await supabase.from("players").select("*");
  if (error) throw error;
  return data;
}

export async function createPlayer(profile_id: string, nickname: string, position: string) {
  const { data, error } = await supabase
    .from("players")
    .insert([{ profile_id, nickname, position }])
    .select();
  if (error) throw error;
  return data[0];
}
