import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "./config";

/** Server client có gắn cookie phiên đăng nhập Admin (dùng trong /admin và /api/admin) */
export async function createSupabaseServerClient() {
  const { url, anonKey, configured } = getSupabaseConfig();
  if (!configured) return null;

  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Bỏ qua khi gọi từ Server Component read-only
        }
      },
    },
  });
}

/** Public anon client không đọc cookie (dùng cho SSR/ISR/Sitemap công khai) */
export function createSupabasePublicClient() {
  const { url, anonKey, configured } = getSupabaseConfig();
  if (!configured) return null;

  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
