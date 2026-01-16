import { createClient } from "./supabase";

export async function getCoachs() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("coaches")
    .select("*");

  if (error) {
    console.error("Error obteniendo coaches:", error.message);
    return [];
  }

  return data;
}
