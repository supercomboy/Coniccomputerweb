import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/login/";
  const isAdminApi = pathname.startsWith("/api/admin");

  const { url, anonKey, configured } = getSupabaseConfig();

  // Nếu chưa cấu hình biến môi trường Supabase
  if (!configured) {
    if (isAdminApi) {
      return NextResponse.json(
        { error: "Chưa cấu hình biến môi trường Supabase trên server." },
        { status: 503 }
      );
    }
    if (!isLoginPage) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login/";
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    if (isAdminApi) {
      return NextResponse.json({ error: "Chưa đăng nhập quản trị." }, { status: 401 });
    }
    if (!isLoginPage) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login/";
      return NextResponse.redirect(loginUrl);
    }
    return response;
  }

  // Đã đăng nhập mà vào /admin/login -> đẩy thẳng vào /admin/
  if (isLoginPage) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin/";
    return NextResponse.redirect(adminUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
