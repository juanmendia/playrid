import { createClient } from "./supabase";

export async function getCoaches() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("coaches")
    .select("*");

  if (error) {
    console.error("Error fetching coaches:", error.message);
    throw error;
  }

  return data;
}
