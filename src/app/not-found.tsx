import Link from "next/link";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/data/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:py-28">
      <p className="text-6xl font-bold tracking-tight text-brand-red tabular-nums">404</p>
      <h1 className="mt-4 text-2xl font-bold text-ink sm:text-3xl">
        Không tìm thấy trang bạn yêu cầu
      </h1>
      <p className="mt-3 text-base leading-relaxed text-ink-muted">
        Đường dẫn có thể đã được thay đổi hoặc không còn tồn tại. Bạn có thể quay về trang chủ hoặc
        liên hệ trực tiếp Conic Computer để được hỗ trợ ngay.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-3 text-sm font-semibold text-white hover:bg-brand-navy-light"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Về trang chủ
        </Link>
        <a
          href={SITE.phoneHref}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark tabular-nums"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          Gọi {SITE.phoneDisplay}
        </a>
        <a
          href={SITE.zaloHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0068FF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0056d6]"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Chat Zalo
        </a>
      </div>
    </section>
  );
}
