"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { SITE } from "@/data/site";

export function AdminHeader({ userEmail }: { userEmail?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    router.push("/admin/login/");
    router.refresh();
  };

  return (
    <header className="border-b border-border-subtle bg-surface">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/" className="flex items-center gap-2.5">
            <img
              src={SITE.logoPng}
              alt="Conic Computer"
              width={120}
              height={45}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <span className="h-5 w-px bg-border-subtle" aria-hidden="true" />
          <span className="text-sm font-semibold text-ink">Quản trị bài viết</span>
        </div>

        <div className="flex items-center gap-3">
          {userEmail && (
            <span className="hidden text-xs text-ink-muted sm:inline">{userEmail}</span>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-8 items-center gap-1.5 rounded-lg border border-border-subtle px-3 py-1.5 text-xs font-semibold text-ink hover:bg-surface-muted"
          >
            Xem website
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-navy-light"
          >
            <LogOut className="h-3.5 w-3.5" />
            Đăng xuất
          </button>
        </div>
      </div>
    </header>
  );
}
