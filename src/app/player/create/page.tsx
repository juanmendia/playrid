import { createClient } from "./supabase";

export async function getPlayers() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("players")
    .select("*");

  if (error) {
    console.error("Error fetching players:", error.message);
    throw error;
  }

  return data;
}
