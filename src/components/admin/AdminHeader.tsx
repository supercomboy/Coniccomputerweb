"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, FileText, LogOut, Tag } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { SITE } from "@/data/site";

export function AdminHeader({ userEmail }: { userEmail?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const isPricing = pathname?.startsWith("/admin/pricing");

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
        <div className="flex items-center gap-4">
          <Link href="/admin/" className="flex items-center gap-2.5">
            <img
              src={SITE.logoPng}
              alt="Conic Computer"
              width={120}
              height={45}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <span className="hidden h-5 w-px bg-border-subtle sm:inline-block" aria-hidden="true" />
          <nav className="flex items-center gap-1" aria-label="Điều hướng quản trị">
            <Link
              href="/admin/"
              className={`inline-flex min-h-8 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                !isPricing
                  ? "bg-brand-navy text-white"
                  : "text-ink-muted hover:bg-surface-muted hover:text-ink"
              }`}
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Bài viết</span>
            </Link>
            <Link
              href="/admin/pricing/"
              className={`inline-flex min-h-8 items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
                isPricing
                  ? "bg-brand-navy text-white"
                  : "text-ink-muted hover:bg-surface-muted hover:text-ink"
              }`}
            >
              <Tag className="h-4 w-4" aria-hidden="true" />
              <span>Bảng giá</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          {userEmail && (
            <span className="hidden text-xs text-ink-muted md:inline">{userEmail}</span>
          )}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-8 items-center gap-1.5 rounded-lg border border-border-subtle px-3 py-1.5 text-xs font-semibold text-ink hover:bg-surface-muted sm:inline-flex"
          >
            Xem website
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-lg bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-navy-light"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </header>
  );
}
