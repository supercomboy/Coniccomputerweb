import type { Metadata } from "next";
import Link from "next/link";
import { Award, CheckCircle2, ChevronRight, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { SITE } from "@/data/site";
import { VI_COPY } from "@/i18n/vi";

export const metadata: Metadata = {
  title: "Về Chúng Tôi | Conic Computer - Trung Tâm Sửa Chữa Laptop & MacBook TP.HCM",
  description:
    "Conic Computer - Hơn 15 năm kinh nghiệm sửa chữa laptop, MacBook và máy tính tại Bình Chánh & TP.HCM. Cam kết linh kiện chuẩn, kiểm tra miễn phí, ký tên linh kiện minh bạch, bảo hành lâu dài.",
  alternates: { canonical: "/ve-chung-toi/" },
};

export default function VeChungToiPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-muted">
            <Link href="/" className="hover:text-brand-red">
              Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-ink">Về chúng tôi</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl">
                Hơn 15 Năm Tận Tâm Với Nghề Sửa Chữa Máy Tính Tại TP.HCM
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                Chào bạn, tôi là người sáng lập Conic Computer. Suốt hơn 15 năm gắn bó với từng bo
                mạch chủ Laptop, MacBook và máy tính để bàn, điều chúng tôi trân trọng nhất không
                chỉ là sửa sống một thiết bị hỏng, mà là sự yên tâm trọn vẹn khi khách hàng giao
                máy và dữ liệu công việc quý giá của mình.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark tabular-nums"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Gọi {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0068FF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0056d6]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Chat Zalo với kỹ thuật viên
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface">
                <img
                  src="/images/services/sua-laptop-ve-sinh-mx4.webp"
                  alt="Không gian làm việc và kiểm tra phần cứng laptop tại Conic Computer Bình Chánh"
                  width={1024}
                  height={768}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
            Nguyên tắc làm nghề tại Conic Computer
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            Chúng tôi xây dựng thương hiệu bằng sự trung thực kỹ thuật — điều mà mọi khách hàng đi
            sửa máy tính luôn tìm kiếm.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {VI_COPY.whyChoose.map((item, idx) => {
            const Icon = idx % 2 === 0 ? Award : ShieldCheck;
            return (
              <div key={item.title} className="rounded-2xl border border-border-subtle bg-surface p-6">
                <Icon className="h-6 w-6 text-brand-red" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Transparent Process Anchor */}
      <section id="quy-trinh" className="border-t border-border-subtle bg-surface-muted py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
              Quy trình ký tên linh kiện &amp; kiểm tra công khai
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Mọi thiết bị tiếp nhận tại Conic Computer đều tuân thủ quy trình 5 bước rõ ràng để
              khách hàng hoàn toàn chủ động.
            </p>
          </div>

          <ol className="mt-8 grid gap-5 md:grid-cols-5">
            {VI_COPY.process.map((step) => (
              <li
                key={step.step}
                className="rounded-2xl border border-border-subtle bg-surface p-5"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white tabular-nums">
                  {step.step}
                </span>
                <h3 className="mt-4 text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.desc}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-border-subtle bg-surface p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-ink">
                    Địa chỉ cửa hàng: {SITE.address}
                  </p>
                  <p className="mt-0.5 text-sm text-ink-muted">
                    Giờ làm việc: {SITE.workingHours} · Hotline/Zalo: {SITE.phoneDisplay}
                  </p>
                </div>
              </div>
              <Link
                href="/lien-he/"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-light"
              >
                Xem bản đồ &amp; Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
