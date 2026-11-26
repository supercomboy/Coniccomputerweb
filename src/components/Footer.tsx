import Link from "next/link";
import { Clock, ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { NAV_SERVICES, SITE } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-brand-navy pb-24 text-slate-300 lg:pb-0">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Contact */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block rounded-xl bg-white px-3.5 py-2.5 shadow-xs">
              <img
                src={SITE.logoPng}
                alt="Conic Computer Logo"
                width={330}
                height={123}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-300">
              Trung tâm sửa chữa Laptop, MacBook và máy tính để bàn (PC) uy tín tại KDC Conic 13B,
              Bình Chánh &amp; TP.HCM. Kiểm tra miễn phí, ký tên linh kiện minh bạch, bảo hành dài
              hạn.
            </p>

            <ul className="mt-5 space-y-1.5 text-sm">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="inline-flex min-h-7 items-center gap-2 py-0.5 font-semibold text-white transition-colors hover:text-red-400 tabular-nums"
                >
                  <Phone className="h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                  Hotline / Zalo: {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={SITE.emailHref}
                  className="inline-flex min-h-7 items-center gap-2 py-0.5 text-slate-300 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-2 py-0.5 text-slate-300">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-center gap-2 py-0.5 text-slate-300">
                <Clock className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                <span>{SITE.workingHours}</span>
              </li>
            </ul>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <a
                href={SITE.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0068FF] px-3.5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Chat Zalo
              </a>
              <a
                href={SITE.facebookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-navy-light px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
              >
                Facebook Fanpage
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand-navy-light px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-700"
              >
                WhatsApp
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Dịch vụ chính
            </h2>
            <ul className="mt-4 space-y-1.5 text-sm">
              {NAV_SERVICES.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="inline-flex min-h-7 items-center py-0.5 text-slate-300 transition-colors hover:text-white"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Information & Tools */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">Thông tin</h2>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li>
                <Link
                  href="/ve-chung-toi/"
                  className="inline-flex min-h-7 items-center py-0.5 text-slate-300 transition-colors hover:text-white"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  href="/tai-nguyen/"
                  className="inline-flex min-h-7 items-center py-0.5 text-slate-300 transition-colors hover:text-white"
                >
                  Tin tức công nghệ
                </Link>
              </li>
              <li>
                <Link
                  href="/tuyen-dung/"
                  className="inline-flex min-h-7 items-center py-0.5 text-slate-300 transition-colors hover:text-white"
                >
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he/"
                  className="inline-flex min-h-7 items-center py-0.5 text-slate-300 transition-colors hover:text-white"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <a
                  href={SITE.deviceTestHref}
                  className="inline-flex min-h-7 items-center py-0.5 text-slate-300 transition-colors hover:text-white"
                >
                  Device Test
                </a>
              </li>
              <li>
                <a
                  href={SITE.crmHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-7 items-center gap-1 py-0.5 text-slate-300 transition-colors hover:text-white"
                >
                  Thông Tin Khách Hàng
                  <ExternalLink className="h-3 w-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Policies */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Chính sách &amp; Cam kết
            </h2>
            <ul className="mt-4 space-y-1.5 text-sm">
              <li>
                <Link
                  href="/chinh-sach-bao-mat/"
                  className="inline-flex min-h-7 items-center py-0.5 text-slate-300 transition-colors hover:text-white"
                >
                  Chính sách bảo mật dữ liệu
                </Link>
              </li>
              <li>
                <Link
                  href="/ve-chung-toi/#quy-trinh"
                  className="inline-flex min-h-7 items-center py-0.5 text-slate-300 transition-colors hover:text-white"
                >
                  Quy trình ký tên linh kiện
                </Link>
              </li>
              <li>
                <Link
                  href="/lien-he/"
                  className="inline-flex min-h-7 items-center py-0.5 text-slate-300 transition-colors hover:text-white"
                >
                  Hướng dẫn bảo hành &amp; đổi trả
                </Link>
              </li>
              <li>
                <a
                  href={SITE.mapDirectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-7 items-center gap-1 py-0.5 text-slate-300 transition-colors hover:text-white"
                >
                  Chỉ đường trên Google Maps
                  <ExternalLink className="h-3 w-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-700/80 pt-6 text-xs text-slate-400 sm:flex-row lg:pr-52">
          <p>© {year} Conic Computer. Đã đăng ký bản quyền.</p>
          <p>Sửa chữa Laptop – MacBook – PC tại Bình Chánh &amp; TP.HCM.</p>
        </div>
      </div>
    </footer>
  );
}
