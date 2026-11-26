import { MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/data/site";

export function FloatingContact() {
  return (
    <>
      {/* Desktop Floating Buttons (Bottom Right) */}
      <div
        className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 lg:flex"
        aria-label="Liên hệ nhanh"
      >
        <a
          href={SITE.zaloHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full bg-[#0068FF] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/20 transition-transform hover:-translate-y-0.5 hover:bg-[#0056d6]"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Nhắn Zalo ngay</span>
        </a>

        <a
          href={SITE.phoneHref}
          className="animate-pulse-red inline-flex items-center gap-2.5 rounded-full bg-brand-red px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-950/25 transition-transform hover:-translate-y-0.5 hover:bg-brand-red-dark tabular-nums"
        >
          <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Gọi {SITE.phoneDisplay}</span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border-subtle bg-surface/95 px-3 py-2.5 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur-sm lg:hidden"
        aria-label="Thanh liên hệ nhanh di động"
      >
        <div className="mx-auto grid max-w-lg grid-cols-2 gap-2">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-brand-red px-2.5 py-3 text-[13px] font-semibold text-white shadow-sm active:scale-[0.99] tabular-nums"
          >
            <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Gọi {SITE.phoneDisplay}</span>
          </a>
          <a
            href={SITE.zaloHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#0068FF] px-2.5 py-3 text-[13px] font-semibold text-white shadow-sm active:scale-[0.99]"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Chat Zalo ngay</span>
          </a>
        </div>
      </div>
    </>
  );
}
