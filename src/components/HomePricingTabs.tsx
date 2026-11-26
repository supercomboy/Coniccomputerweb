"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { PRICING_CATEGORIES, PricingCategoryKey } from "@/data/pricing";
import { SITE } from "@/data/site";

export function HomePricingTabs() {
  const [activeKey, setActiveKey] = useState<PricingCategoryKey>("laptop");
  const activeCategory =
    PRICING_CATEGORIES.find((c) => c.key === activeKey) ?? PRICING_CATEGORIES[0];

  return (
    <div className="mt-8">
      {/* Tab Controls */}
      <div
        className="inline-flex flex-wrap gap-2 rounded-xl border border-border-subtle bg-surface-muted p-1.5"
        role="tablist"
        aria-label="Chọn nhóm dịch vụ xem bảng giá"
      >
        {PRICING_CATEGORIES.map((category) => {
          const isActive = category.key === activeKey;
          return (
            <button
              key={category.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveKey(category.key)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "bg-brand-navy text-white shadow-sm"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>

      {/* Pricing Table */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-border-subtle bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-muted text-xs font-semibold uppercase tracking-wider text-ink-muted">
                <th className="px-5 py-3.5">Hạng mục dịch vụ</th>
                <th className="px-5 py-3.5 text-right">Giá tham khảo</th>
                <th className="px-5 py-3.5 text-right">Bảo hành</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-sm">
              {activeCategory.items.map((row) => (
                <tr key={row.service} className="transition-colors hover:bg-surface-muted/70">
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

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border-subtle bg-surface-muted/60 px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-xs leading-relaxed text-ink-muted">
            Giá trên mang tính chất tham khảo tùy đời máy và thời điểm linh kiện. Nhắn mã máy qua
            Zalo hoặc gọi Hotline để nhận báo giá chính xác miễn phí.
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-2.5">
            <Link
              href={activeCategory.href}
              className="inline-flex min-h-8 items-center gap-1.5 py-1 text-sm font-semibold text-brand-navy hover:text-brand-red"
            >
              Xem trang {activeCategory.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={SITE.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0068FF] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0056d6]"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Hỏi giá qua Zalo
            </a>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-brand-red-dark tabular-nums"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
