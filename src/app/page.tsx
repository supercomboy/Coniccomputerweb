import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Cpu,
  Disc,
  FileCheck2,
  HardDrive,
  Laptop,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react";
import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { VI_COPY } from "@/i18n/vi";
import { getAllPosts } from "@/lib/posts";
import { getHomePricingCategories } from "@/lib/pricing";
import { HomePricingTabs } from "@/components/HomePricingTabs";
import { GoogleMapEmbed } from "@/components/GoogleMapEmbed";

const PRIMARY_SLUGS = ["sua-laptop", "sua-macbook", "sua-linh-kien-pc"];
const SUPPORT_SLUGS = ["cai-win-phan-mem", "cuu-du-lieu", "nang-cap-may-tinh"];

function ServiceIcon({ icon }: { icon: string }) {
  const cls = "h-5 w-5 text-brand-red";
  switch (icon) {
    case "laptop":
      return <Laptop className={cls} aria-hidden="true" />;
    case "apple":
      return <Wrench className={cls} aria-hidden="true" />;
    case "cpu":
      return <Cpu className={cls} aria-hidden="true" />;
    case "disc":
      return <Disc className={cls} aria-hidden="true" />;
    case "hard-drive":
      return <HardDrive className={cls} aria-hidden="true" />;
    default:
      return <Zap className={cls} aria-hidden="true" />;
  }
}

export const revalidate = 60;

export default async function HomePage() {
  const primaryServices = SERVICES.filter((s) => PRIMARY_SLUGS.includes(s.slug));
  const supportServices = SERVICES.filter((s) => SUPPORT_SLUGS.includes(s.slug));
  const latestPosts = (await getAllPosts()).slice(0, 2);
  const pricingCategories = await getHomePricingCategories();

  return (
    <>
      {/* 1. Hero Section */}
      <section className="border-b border-border-subtle bg-surface-muted">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-20">
          <div className="lg:col-span-7">
            <h1 className="text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl lg:text-[2.85rem] lg:leading-[1.12]">
              Sửa Chữa Laptop, MacBook &amp; PC Chuyên Nghiệp Tại Bình Chánh – TP.HCM
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              Kiểm tra đúng bệnh miễn phí 100%, sửa chữa lấy liền trong ngày, khách hàng trực tiếp
              quan sát và ký tên lên linh kiện. Phục vụ tận tâm tại KDC Conic 13B &amp; khu vực
              TP.HCM hơn 15 năm kinh nghiệm.
            </p>

            {/* Direct CTA: Call & Zalo */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-red px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-red-900/15 transition-colors hover:bg-brand-red-dark tabular-nums"
              >
                <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Gọi ngay {SITE.phoneDisplay}</span>
              </a>
              <a
                href={SITE.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#0068FF] px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-blue-900/15 transition-colors hover:bg-[#0056d6]"
              >
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <span>Nhắn Zalo báo giá nhanh</span>
              </a>
            </div>

            {/* 3 Trust Guarantees */}
            <dl className="mt-10 grid gap-4 border-t border-border-subtle pt-6 sm:grid-cols-3">
              {VI_COPY.badges.map((item) => (
                <div key={item.title} className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-red"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-sm font-semibold text-ink">{item.title}</dt>
                    <dd className="mt-0.5 text-xs leading-relaxed text-ink-muted">{item.desc}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: Real Workshop Image + Direct Info Strip */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-lg shadow-slate-900/5">
              <img
                src="/images/services/sua-laptop-ve-sinh-mx4.webp"
                alt="Kỹ thuật viên Conic Computer kiểm tra và vệ sinh tra keo tản nhiệt Arctic MX-4 / Honeywell cho laptop"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="flex flex-col gap-2.5 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm">
                  <p className="font-semibold text-ink">KDC Conic 13B, Nguyễn Văn Linh</p>
                  <p className="text-xs text-ink-muted">{SITE.workingHours}</p>
                </div>
                <a
                  href={SITE.mapDirectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-8 items-center gap-1.5 py-1 text-sm font-semibold text-brand-red hover:text-brand-red-dark"
                >
                  Chỉ đường
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Services (3 Primary + 3 Support) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
            Dịch vụ sửa chữa &amp; nâng cấp máy tính
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            Tiếp nhận từ lỗi phần mềm cơ bản đến sửa bo mạch chủ chuyên sâu cho cả Laptop Windows,
            Apple MacBook và máy tính để bàn PC.
          </p>
        </div>

        {/* 3 Primary Repair Pillars */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {primaryServices.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}/`}
              className="group flex flex-col justify-between rounded-2xl border border-border-subtle bg-surface p-6 transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-900/5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                    <ServiceIcon icon={service.icon} />
                  </span>
                  <ArrowRight
                    className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-red"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink group-hover:text-brand-red">
                  {service.shortTitle}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{service.lead}</p>
              </div>

              <div className="mt-6 border-t border-border-subtle pt-4 text-sm font-semibold text-brand-navy group-hover:text-brand-red">
                Xem chi tiết &amp; bảng giá
              </div>
            </Link>
          ))}
        </div>

        {/* 3 Supporting Technical Services (Horizontal List) */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {supportServices.map((service) => (
            <Link
              key={service.slug}
              href={`/${service.slug}/`}
              className="group flex items-start gap-4 rounded-xl border border-border-subtle bg-surface-muted/70 p-5 transition-colors hover:border-slate-300 hover:bg-surface"
            >
              <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-xs">
                <ServiceIcon icon={service.icon} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-ink group-hover:text-brand-red">
                  {service.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                  {service.lead}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Hardware Self-Check Banner (Device Test) */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border-subtle bg-surface-muted px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-ink">
              Muốn tự kiểm tra bàn phím, màn hình, mic hoặc webcam trước khi mang đi sửa?
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Sử dụng công cụ Device Test trực tuyến miễn phí ngay trên trình duyệt của bạn.
            </p>
          </div>
          <a
            href={SITE.deviceTestHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-brand-navy bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-light"
          >
            Mở Device Test
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* 3. Transparent Pricing Tabs */}
      <section className="border-y border-border-subtle bg-surface-muted/70 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
              Bảng giá dịch vụ tham khảo minh bạch
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Báo giá rõ ràng trước khi sửa, cam kết không vẽ bệnh và không phát sinh chi phí ngoài
              thỏa thuận.
            </p>
          </div>
          <HomePricingTabs categories={pricingCategories} />
        </div>
      </section>

      {/* 4. 5-Step Transparent Process */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
            Quy trình 5 bước tiếp nhận &amp; sửa chữa minh bạch
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            Mọi thao tác tháo lắp, kiểm tra và ký tên linh kiện đều công khai để bạn hoàn toàn yên
            tâm về thiết bị và dữ liệu cá nhân.
          </p>
        </div>

        <ol className="mt-10 grid gap-6 md:grid-cols-5">
          {VI_COPY.process.map((item) => (
            <li key={item.step} className="relative flex flex-col">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white tabular-nums">
                {item.step}
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. Why Choose Conic Computer (Brand Navy Contrast Band) */}
      <section className="bg-brand-navy py-16 text-white lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
                Tại sao khách hàng Bình Chánh &amp; TP.HCM tin chọn Conic Computer?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Chúng tôi đặt uy tín kỹ thuật lên hàng đầu: tư vấn phương án tối ưu chi phí nhất,
                bảo mật dữ liệu khách hàng tuyệt đối và đồng hành sau sửa chữa.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark tabular-nums"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Gọi {SITE.phoneDisplay}
                </a>
                <Link
                  href="/ve-chung-toi/"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-navy-light"
                >
                  Tìm hiểu về chúng tôi
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              {VI_COPY.whyChoose.map((item, idx) => {
                const icons = [Award, ShieldCheck, CheckCircle2, FileCheck2];
                const Icon = icons[idx] ?? ShieldCheck;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-700/80 bg-brand-navy-light/70 p-6"
                  >
                    <Icon className="h-6 w-6 text-brand-red" aria-hidden="true" />
                    <h3 className="mt-4 text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Latest Tech News (Links correctly to /tai-nguyen/) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
              Tin tức &amp; kinh nghiệm sử dụng máy tính
            </h2>
            <p className="mt-2 text-base text-ink-muted">
              Chia sẻ ca sửa chữa thực tế và mẹo tối ưu giúp laptop, PC hoạt động bền bỉ hơn.
            </p>
          </div>
          <Link
            href="/tai-nguyen/"
            className="inline-flex min-h-8 items-center gap-1.5 py-1 text-sm font-semibold text-brand-red hover:text-brand-red-dark"
          >
            Xem tất cả bài viết
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-2xl border border-border-subtle bg-surface transition-all hover:border-slate-300 hover:shadow-md"
            >
              <Link href={`/${post.slug}/`} className="block">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  width={1024}
                  height={768}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-ink-muted">
                    <span className="font-semibold text-brand-red">{post.category}</span>
                    <span aria-hidden="true">•</span>
                    <time dateTime={post.date}>{post.date}</time>
                    <span aria-hidden="true">•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="mt-2.5 text-lg font-bold text-ink group-hover:text-brand-red">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                    {post.description}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Map & Direct Contact Section */}
      <section className="border-t border-border-subtle bg-surface-muted py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold tracking-[-0.02em] text-ink sm:text-3xl">
              Ghé trực tiếp Conic Computer hoặc gọi tư vấn ngay
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Không cần đặt lịch phức tạp — bạn chỉ cần gọi điện hoặc nhắn tình trạng máy qua Zalo,
              kỹ thuật viên sẽ hỗ trợ kiểm tra và báo giá ngay.
            </p>

            <div className="mt-6 space-y-3 text-sm text-ink">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                <span>{SITE.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0 text-brand-red" aria-hidden="true" />
                <span>{SITE.workingHours}</span>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark tabular-nums"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Gọi {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0068FF] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0056d6]"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Chat Zalo ngay
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <GoogleMapEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
