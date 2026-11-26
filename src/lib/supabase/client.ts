import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./config";

export function createSupabaseBrowserClient() {
  const { url, anonKey, configured } = getSupabaseConfig();
  if (!configured) {
    throw new Error("Chưa cấu hình NEXT_PUBLIC_SUPABASE_URL và NEXT_PUBLIC_SUPABASE_ANON_KEY.");
  }
  return createBrowserClient(url, anonKey);
}
