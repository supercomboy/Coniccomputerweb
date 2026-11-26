import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { SITE } from "@/data/site";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";

export const metadata: Metadata = {
  title: "Liên Hệ Conic Computer - Trung Tâm Sửa Chữa Laptop, MacBook & PC TP.HCM",
  description:
    "Liên hệ Conic Computer tại KDC Conic 13B, Bình Chánh, TP.HCM để được kiểm tra và tư vấn sửa chữa laptop, MacBook, PC miễn phí. Hotline/Zalo: 0973.535.854.",
  alternates: { canonical: "/lien-he/" },
};

export default function LienHePage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-muted">
            <Link href="/" className="hover:text-brand-red">
              Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-ink">Liên hệ</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl">
              Liên Hệ Conic Computer – Hỗ Trợ Kiểm Tra &amp; Tư Vấn Miễn Phí
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Không cần điền biểu mẫu chờ đợi. Bạn chỉ cần gọi trực tiếp hoặc nhắn tin qua Zalo kèm
              tên máy và tình trạng lỗi, kỹ thuật viên Conic Computer sẽ phản hồi tư vấn và báo giá
              ngay.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Primary Direct Action Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <a
            href={SITE.phoneHref}
            className="group flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface p-7 transition-all hover:border-brand-red hover:shadow-lg hover:shadow-red-900/5"
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white">
                <Phone className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink group-hover:text-brand-red">
                  Gọi Hotline trực tiếp
                </h2>
                <p className="mt-1 text-2xl font-bold text-brand-red tabular-nums">
                  {SITE.phoneDisplay}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Hỗ trợ tư vấn kỹ thuật nhanh, báo giá sửa chữa lấy liền và hướng dẫn xử lý sự cố
                  khẩn cấp (máy vô nước, sập nguồn).
                </p>
              </div>
            </div>
            <div className="mt-6 text-sm font-semibold text-brand-red">
              Bấm để gọi ngay →
            </div>
          </a>

          <a
            href={SITE.zaloHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface p-7 transition-all hover:border-[#0068FF] hover:shadow-lg hover:shadow-blue-900/5"
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0068FF] text-white">
                <MessageCircle className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-bold text-ink group-hover:text-[#0068FF]">
                  Nhắn tin Zalo tư vấn &amp; gửi ảnh lỗi
                </h2>
                <p className="mt-1 text-2xl font-bold text-[#0068FF] tabular-nums">
                  Zalo: {SITE.phoneDisplay}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Gửi ảnh chụp tem model máy hoặc tình trạng màn hình qua Zalo để kỹ thuật viên kiểm
                  tra linh kiện có sẵn và báo giá chính xác.
                </p>
              </div>
            </div>
            <div className="mt-6 text-sm font-semibold text-[#0068FF]">
              Mở khung chat Zalo ngay →
            </div>
          </a>
        </div>

        {/* Store Information + Working Google Maps */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          <div className="space-y-6 rounded-2xl border border-border-subtle bg-surface-muted p-7 lg:col-span-5">
            <h2 className="text-xl font-bold text-ink">Thông tin cửa hàng</h2>

            <dl className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-ink">Địa chỉ</dt>
                  <dd className="mt-0.5 leading-relaxed text-ink-muted">{SITE.address}</dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-ink">Giờ làm việc</dt>
                  <dd className="mt-0.5 text-ink-muted">{SITE.workingHours}</dd>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                <div>
                  <dt className="font-semibold text-ink">Email hỗ trợ</dt>
                  <dd className="mt-0.5">
                    <a href={SITE.emailHref} className="text-ink-muted hover:text-brand-red">
                      {SITE.email}
                    </a>
                  </dd>
                </div>
              </div>
            </dl>

            <div className="border-t border-border-subtle pt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Kênh kết nối khác
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <a
                  href={SITE.facebookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-xs font-semibold text-ink hover:border-brand-navy"
                >
                  Facebook Fanpage
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-xs font-semibold text-ink hover:border-brand-navy"
                >
                  WhatsApp
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
                <a
                  href={SITE.mapDirectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-xs font-semibold text-ink hover:border-brand-navy"
                >
                  Mở Google Maps
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <GoogleMapEmbed heightClass="h-[380px] sm:h-[440px]" />
          </div>
        </div>
      </section>
    </>
  );
}
