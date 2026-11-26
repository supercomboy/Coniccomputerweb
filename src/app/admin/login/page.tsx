"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Lock } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { SITE } from "@/data/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const configured = isSupabaseConfigured();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createSupabaseBrowserClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError("Email hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.");
        return;
      }

      router.push("/admin/");
      router.refresh();
    } catch {
      setError("Không thể kết nối đến hệ thống đăng nhập Supabase.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[75vh] max-w-md flex-col justify-center px-4 py-12">
      <div className="rounded-2xl border border-border-subtle bg-surface p-7 shadow-sm sm:p-8">
        <div className="flex flex-col items-center text-center">
          <img
            src={SITE.logoPng}
            alt="Conic Computer"
            width={150}
            height={56}
            className="h-10 w-auto object-contain"
          />
          <h1 className="mt-5 text-xl font-bold text-ink">Đăng nhập quản trị bài viết</h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Sử dụng tài khoản Admin đã tạo trong Supabase Authentication.
          </p>
        </div>

        {!configured ? (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">Chưa cấu hình biến môi trường Supabase</p>
            <p className="mt-1 text-xs leading-relaxed">
              Vui lòng thêm <code>NEXT_PUBLIC_SUPABASE_URL</code> và{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> vào Vercel Environment Variables (hoặc{" "}
              <code>.env.local</code>) rồi tải lại trang.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            {error && (
              <div
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-brand-red"
              >
                {error}
              </div>
            )}

            <div>
              <label htmlFor="admin-email" className="block text-sm font-semibold text-ink">
                Email quản trị
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@coniccomputer.com"
                className="mt-1.5 w-full rounded-lg border border-border-subtle px-3.5 py-2.5 text-sm text-ink focus:border-brand-red focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-semibold text-ink">
                Mật khẩu
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-lg border border-border-subtle px-3.5 py-2.5 text-sm text-ink focus:border-brand-red focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-red-dark disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex min-h-8 items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Quay về trang chủ website
          </Link>
        </div>
      </div>
    </section>
  );
}
