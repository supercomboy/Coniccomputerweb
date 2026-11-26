import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { SERVICES, ServiceData } from "@/data/services";
import { SITE } from "@/data/site";
import { VI_COPY } from "@/i18n/vi";

interface ServicePageTemplateProps {
  service: ServiceData;
}

export function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const relatedServices = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Trang chủ", item: `${SITE.domain}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: service.name,
        item: `${SITE.domain}/${service.slug}/`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Band */}
      <section className="border-b border-border-subtle bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-muted">
            <Link href="/" className="hover:text-brand-red">
              Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-ink">{service.name}</span>
          </nav>

          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h1 className="text-2xl font-bold tracking-[-0.025em] text-ink sm:text-3xl lg:text-4xl lg:leading-[1.15]">
                {service.h1}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
                {service.lead}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-red-dark tabular-nums"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Gọi ngay {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0068FF] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0056d6]"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Nhắn Zalo hỏi giá miễn phí
                </a>
              </div>
            </div>

            {service.heroImage && (
              <div className="lg:col-span-5">
                <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface">
                  <img
                    src={service.heroImage}
                    alt={service.heroImageAlt ?? service.h1}
                    width={1024}
                    height={768}
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content + Sticky Sidebar */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-16">
        <div className="min-w-0 space-y-12 lg:col-span-8">
          {/* Symptoms */}
          <section>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
              {service.symptomsTitle}
            </h2>
            <ul className="mt-5 space-y-3 rounded-2xl border border-border-subtle bg-surface-muted/70 p-6">
              {service.symptoms.map((symptom) => (
                <li key={symptom} className="flex items-start gap-3 text-sm leading-relaxed text-ink">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-red"
                    aria-hidden="true"
                  />
                  <span>{symptom}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{service.supportedScope}</p>
          </section>

          {/* Service Breakdown */}
          <section>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
              Các hạng mục {service.name.toLowerCase()} tại Conic Computer
            </h2>
            <div className="mt-6 space-y-6">
              {service.features.map((feat) => (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-border-subtle bg-surface p-6"
                >
                  <h3 className="text-lg font-bold text-ink">{feat.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{feat.description}</p>
                  {feat.bullets && feat.bullets.length > 0 && (
                    <ul className="mt-3 space-y-2 text-sm text-ink">
                      {feat.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2.5">
                          <span
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red"
                            aria-hidden="true"
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Pricing Table */}
          <section>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
              Bảng giá {service.name.toLowerCase()} tham khảo
            </h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-border-subtle bg-surface">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-border-subtle bg-surface-muted text-xs font-semibold uppercase tracking-wider text-ink-muted">
                      <th className="px-5 py-3.5">Dịch vụ</th>
                      <th className="px-5 py-3.5 text-right">Chi phí tham khảo</th>
                      <th className="px-5 py-3.5 text-right">Bảo hành</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle text-sm">
                    {service.pricing.map((row) => (
                      <tr key={row.service} className="hover:bg-surface-muted/60">
                        <td className="px-5 py-3.5 font-medium text-ink">{row.service}</td>
                        <td className="px-5 py-3.5 text-right font-semibold text-brand-red tabular-nums">
                          {row.price}
                        </td>
                        <td className="px-5 py-3.5 text-right text-ink-muted">{row.warranty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="border-t border-border-subtle bg-surface-muted/60 px-5 py-3.5 text-xs text-ink-muted">
                * Giá trên mang tính chất tham khảo theo từng model máy và thời điểm linh kiện. Gọi{" "}
                <a href={SITE.phoneHref} className="font-semibold text-brand-red hover:underline">
                  {SITE.phoneDisplay}
                </a>{" "}
                hoặc nhắn Zalo để nhận báo giá chính xác miễn phí.
              </p>
            </div>
          </section>

          {/* Process */}
          <section>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
              Quy trình 5 bước tiếp nhận minh bạch
            </h2>
            <ol className="mt-5 space-y-3">
              {VI_COPY.process.map((step) => (
                <li
                  key={step.step}
                  className="flex items-start gap-4 rounded-xl border border-border-subtle bg-surface p-4"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold text-white tabular-nums">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
              Câu hỏi thường gặp
            </h2>
            <div className="mt-5 divide-y divide-border-subtle rounded-2xl border border-border-subtle bg-surface">
              {service.faqs.map((faq) => (
                <details key={faq.question} className="group p-5" open>
                  <summary className="cursor-pointer list-none text-base font-bold text-ink">
                    {faq.question}
                  </summary>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky Right Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="rounded-2xl border border-border-subtle bg-brand-navy p-6 text-white">
              <h2 className="text-lg font-bold text-white">Cần kiểm tra &amp; báo giá ngay?</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Gọi điện hoặc nhắn model máy qua Zalo, kỹ thuật viên Conic Computer sẽ phản hồi và
                tư vấn miễn phí ngay lập tức.
              </p>

              <div className="mt-5 space-y-2.5">
                <a
                  href={SITE.phoneHref}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-red-dark tabular-nums"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Gọi Hotline: {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.zaloHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0068FF] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0056d6]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Nhắn Zalo tư vấn ngay
                </a>
              </div>

              <div className="mt-6 space-y-2.5 border-t border-slate-700 pt-5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                  <span>{SITE.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                  <span>{SITE.workingHours}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-brand-red" aria-hidden="true" />
                  <span>Kiểm tra miễn phí · Ký tên linh kiện 100%</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border-subtle bg-surface p-6">
              <h2 className="text-base font-bold text-ink">Dịch vụ liên quan</h2>
              <ul className="mt-4 space-y-3">
                {relatedServices.map((rel) => (
                  <li key={rel.slug}>
                    <Link
                      href={`/${rel.slug}/`}
                      className="group flex items-center justify-between rounded-lg border border-border-subtle px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-brand-red hover:text-brand-red"
                    >
                      <span>{rel.name}</span>
                      <ArrowRight
                        className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-red"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
