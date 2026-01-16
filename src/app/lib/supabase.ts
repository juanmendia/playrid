import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wncezclaxdnoyeqoggmn.supabase.co";
const supabaseAnonKey = "sb_publishable_AFHcogrjLh86t93Utv5j8w_u_UuUG-k";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
