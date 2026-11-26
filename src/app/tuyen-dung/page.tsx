import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Mail, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Tuyển Dụng Kỹ Thuật Viên Sửa Chữa Laptop & PC | Conic Computer",
  description:
    "Conic Computer tuyển dụng kỹ thuật viên sửa chữa phần cứng Laptop, MacBook, PC tại Bình Chánh, TP.HCM. Môi trường làm việc chuyên nghiệp, thu nhập hấp dẫn theo năng lực.",
  alternates: { canonical: "/tuyen-dung/" },
};

const OPEN_ROLES = [
  {
    title: "Kỹ thuật viên sửa chữa phần cứng Laptop & MacBook",
    type: "Toàn thời gian · Bình Chánh, TP.HCM",
    requirements: [
      "Có kinh nghiệm tháo lắp, chẩn đoán lỗi và thay thế linh kiện Laptop/MacBook.",
      "Ưu tiên ứng viên biết đọc sơ đồ mạch (schematic/boardview), đo đạc nguồn và sửa mainboard.",
      "Trung thực, cẩn thận, có trách nhiệm với thiết bị và dữ liệu của khách hàng.",
    ],
  },
  {
    title: "Kỹ thuật viên phần mềm, lắp ráp PC & hỗ trợ khách hàng",
    type: "Toàn thời gian / Bán thời gian · Bình Chánh, TP.HCM",
    requirements: [
      "Thành thạo cài đặt Windows 10/11, macOS, driver và các bộ phần mềm văn phòng – đồ họa.",
      "Biết vệ sinh bảo dưỡng Laptop/PC, nâng cấp RAM, SSD và tư vấn cấu hình cơ bản.",
      "Giao tiếp thân thiện, giải thích rõ ràng và trung thực cho khách hàng.",
    ],
  },
];

const BENEFITS = [
  "Mức lương cứng cạnh tranh + thưởng doanh số/tay nghề tương xứng năng lực.",
  "Được đào tạo nâng cao tay nghề chuyên sâu về mạch Laptop & MacBook từ kỹ thuật trưởng hơn 15 năm kinh nghiệm.",
  "Môi trường làm việc thân thiện, minh bạch, trang bị đầy đủ dụng cụ đo đạc và thiết bị hiện đại.",
  "Thời gian làm việc ổn định, tôn trọng sự cân bằng công việc và cuộc sống.",
];

export default function TuyenDungPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-muted">
            <Link href="/" className="hover:text-brand-red">
              Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-ink">Tuyển dụng</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl">
              Tuyển Dụng Đồng Hành Cùng Đội Ngũ Conic Computer
            </h1>
            <p className="mt-4 text-base leading-relaxed text-ink-muted">
              Chúng tôi luôn chào đón những bạn đam mê kỹ thuật máy tính, làm nghề tử tế và mong
              muốn phát triển tay nghề bền vững tại khu vực Bình Chánh – TP.HCM.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-8">
            <h2 className="text-2xl font-bold text-ink">Vị trí đang mở tuyển</h2>

            {OPEN_ROLES.map((role) => (
              <div key={role.title} className="rounded-2xl border border-border-subtle bg-surface p-6">
                <h3 className="text-lg font-bold text-ink">{role.title}</h3>
                <p className="mt-1 text-xs font-medium text-brand-red">{role.type}</p>
                <ul className="mt-4 space-y-2.5 text-sm text-ink-muted">
                  {role.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                        aria-hidden="true"
                      />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="rounded-2xl border border-border-subtle bg-surface-muted/70 p-6">
              <h2 className="text-xl font-bold text-ink">Quyền lợi khi gia nhập Conic Computer</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-ink">
                {BENEFITS.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl border border-border-subtle bg-brand-navy p-6 text-white">
              <h2 className="text-lg font-bold text-white">Cách thức ứng tuyển nhanh</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Gửi thông tin giới thiệu bản thân hoặc kinh nghiệm làm việc trực tiếp qua Zalo,
                Hotline hoặc Email:
              </p>

              <div className="mt-5 space-y-2.5">
                <a
                  href={SITE.zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0068FF] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0056d6]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Nhắn Zalo: {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.phoneHref}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark tabular-nums"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Gọi trực tiếp: {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.emailHref}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-navy-light"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {SITE.email}
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
