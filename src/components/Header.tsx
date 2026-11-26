"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  Clock,
  ExternalLink,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { NAV_LINKS, NAV_SERVICES, SITE } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(true);

  const isServiceActive = NAV_SERVICES.some((item) => pathname === item.href);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-surface/95 backdrop-blur-sm">
      {/* Top Bar */}
      <div className="bg-brand-navy text-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 overflow-hidden px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-x-5 gap-y-1">
            <a
              href={SITE.mapDirectHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-6 min-w-0 max-w-full items-center gap-1.5 py-0.5 text-slate-200 transition-colors hover:text-white"
            >
              <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-red" aria-hidden="true" />
              <span className="truncate">{SITE.addressShort}</span>
            </a>
            <span className="hidden min-h-6 shrink-0 items-center gap-1.5 py-0.5 text-slate-300 md:inline-flex">
              <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden="true" />
              {SITE.workingHours}
            </span>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <a
              href={SITE.facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-6 items-center py-0.5 font-medium text-slate-200 transition-colors hover:text-white"
            >
              Facebook
            </a>
            <span className="h-3 w-px bg-slate-600" aria-hidden="true" />
            <a
              href={SITE.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-6 items-center py-0.5 font-medium text-slate-200 transition-colors hover:text-white"
            >
              Zalo hỗ trợ
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center focus-visible:rounded"
          aria-label="Trang chủ Conic Computer"
        >
          <img
            src={SITE.logoPng}
            alt="Logo Conic Computer"
            width={330}
            height={123}
            className="h-9 w-auto object-contain sm:h-11"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Điều hướng chính">
          {/* Services Dropdown */}
          <div className="group relative">
            <button
              type="button"
              className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isServiceActive
                  ? "text-brand-red"
                  : "text-ink hover:bg-surface-muted hover:text-brand-red"
              }`}
              aria-haspopup="true"
            >
              Dịch vụ
              <ChevronDown
                className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                aria-hidden="true"
              />
            </button>

            <div className="invisible absolute left-0 top-full w-[540px] pt-2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="grid grid-cols-2 gap-1 rounded-xl border border-border-subtle bg-surface p-2 shadow-xl shadow-slate-900/10">
                {NAV_SERVICES.map((service) => {
                  const active = pathname === service.href;
                  return (
                    <Link
                      key={service.href}
                      href={service.href}
                      className={`rounded-lg p-3 transition-colors ${
                        active
                          ? "bg-red-50 text-brand-red"
                          : "text-ink hover:bg-surface-muted"
                      }`}
                    >
                      <div className="text-sm font-semibold">{service.label}</div>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">
                        {service.shortDesc}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {NAV_LINKS.map((item) => {
            const active = !item.external && pathname === item.href;
            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-surface-muted hover:text-brand-red"
                >
                  {item.label}
                  {item.openInNewTab && (
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  )}
                </a>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "text-brand-red"
                    : "text-ink hover:bg-surface-muted hover:text-brand-red"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA & Mobile Trigger */}
        <div className="flex items-center gap-2.5">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-red-dark tabular-nums sm:px-4 sm:py-2.5"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{SITE.phoneDisplay}</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle text-ink transition-colors hover:bg-surface-muted lg:hidden"
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-border-subtle bg-surface lg:hidden">
          <nav
            className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6"
            aria-label="Điều hướng di động"
          >
            <div>
              <button
                type="button"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-semibold text-ink hover:bg-surface-muted"
                aria-expanded={mobileServicesOpen}
              >
                <span>Dịch vụ sửa chữa</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="mt-1 space-y-1 pl-3">
                  {NAV_SERVICES.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium ${
                        pathname === service.href
                          ? "bg-red-50 text-brand-red"
                          : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                      }`}
                    >
                      {service.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.map((item) =>
              item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium text-ink hover:bg-surface-muted"
                >
                  <span>{item.label}</span>
                  {item.openInNewTab && <ExternalLink className="h-4 w-4 text-slate-400" />}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                    pathname === item.href
                      ? "bg-red-50 text-brand-red"
                      : "text-ink hover:bg-surface-muted"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="grid grid-cols-2 gap-2.5 pt-3">
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-red px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Phone className="h-4 w-4" />
                Gọi ngay
              </a>
              <a
                href={SITE.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0068FF] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Chat Zalo
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
