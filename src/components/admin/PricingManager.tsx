"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  ExternalLink,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { ALL_PRICING_GROUPS, AllPricingCategoryKey } from "@/data/pricing";

export interface EditablePricingRow {
  localId: string;
  service_name: string;
  price: string;
  warranty: string;
}

interface PricingManagerProps {
  initialData: Record<AllPricingCategoryKey, EditablePricingRow[]>;
  tableReady: boolean;
}

export function PricingManager({ initialData, tableReady }: PricingManagerProps) {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState<AllPricingCategoryKey>("laptop");
  const [dataByGroup, setDataByGroup] =
    useState<Record<AllPricingCategoryKey, EditablePricingRow[]>>(initialData);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const activeGroup =
    ALL_PRICING_GROUPS.find((g) => g.key === activeKey) ?? ALL_PRICING_GROUPS[0];
  const rows = dataByGroup[activeKey] ?? [];

  const updateRow = (index: number, field: keyof EditablePricingRow, value: string) => {
    setSuccess(null);
    setDataByGroup((prev) => {
      const nextRows = [...(prev[activeKey] ?? [])];
      nextRows[index] = { ...nextRows[index], [field]: value };
      return { ...prev, [activeKey]: nextRows };
    });
  };

  const addRow = () => {
    setSuccess(null);
    setDataByGroup((prev) => ({
      ...prev,
      [activeKey]: [
        ...(prev[activeKey] ?? []),
        {
          localId: `new-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          service_name: "",
          price: "",
          warranty: "6 – 12 tháng",
        },
      ],
    }));
  };

  const removeRow = (index: number) => {
    setSuccess(null);
    setDataByGroup((prev) => ({
      ...prev,
      [activeKey]: (prev[activeKey] ?? []).filter((_, i) => i !== index),
    }));
  };

  const moveRow = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= rows.length) return;
    setSuccess(null);
    setDataByGroup((prev) => {
      const nextRows = [...(prev[activeKey] ?? [])];
      const temp = nextRows[index];
      nextRows[index] = nextRows[targetIndex];
      nextRows[targetIndex] = temp;
      return { ...prev, [activeKey]: nextRows };
    });
  };

  const handleSaveGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const res = await fetch("/api/admin/pricing/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category_key: activeKey,
          items: rows.map((r) => ({
            service_name: r.service_name,
            price: r.price,
            warranty: r.warranty,
          })),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Không thể lưu bảng giá.");
        return;
      }

      setSuccess(
        `Đã lưu bảng giá "${activeGroup.label}" và cập nhật ngay lên website.`
      );
      router.refresh();
    } catch {
      setError("Lỗi kết nối máy chủ khi lưu bảng giá.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-ink">Quản lý bảng giá dịch vụ</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Chỉnh sửa trực tiếp tên dịch vụ, mức giá và bảo hành. Sau khi bấm Lưu, giá mới sẽ cập
            nhật ngay trên Trang chủ và trang dịch vụ tương ứng.
          </p>
        </div>
        <a
          href={activeGroup.pageHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-xs font-semibold text-ink hover:bg-surface-muted"
        >
          Xem trang {activeGroup.label}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>

      {!tableReady && (
        <div
          role="alert"
          className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-sm text-amber-900"
        >
          <p className="font-semibold">Chưa khởi tạo bảng `pricing_items` trong Supabase</p>
          <p className="mt-1 text-xs leading-relaxed">
            Hiện đang hiển thị dữ liệu bảng giá mặc định. Để lưu được thay đổi, bạn vui lòng mở{" "}
            <strong>Supabase → SQL Editor</strong> và chạy file{" "}
            <code>supabase/pricing.sql</code> trước nhé.
          </p>
        </div>
      )}

      {/* Category Tabs */}
      <div
        className="flex flex-wrap gap-2 rounded-xl border border-border-subtle bg-surface p-1.5"
        role="tablist"
        aria-label="Chọn nhóm bảng giá"
      >
        {ALL_PRICING_GROUPS.map((group) => {
          const active = group.key === activeKey;
          return (
            <button
              key={group.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setActiveKey(group.key);
                setError(null);
                setSuccess(null);
              }}
              className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-brand-navy text-white shadow-xs"
                  : "text-ink-muted hover:bg-surface-muted hover:text-ink"
              }`}
            >
              {group.label}
              {group.showOnHome && (
                <span
                  className={`ml-1.5 rounded px-1.5 py-0.5 text-[10px] font-medium ${
                    active ? "bg-white/20 text-white" : "bg-surface-muted text-ink-muted"
                  }`}
                >
                  Trang chủ
                </span>
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-brand-red"
        >
          {error}
        </div>
      )}
      {success && (
        <div
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
        >
          {success}
        </div>
      )}

      <form
        onSubmit={handleSaveGroup}
        className="overflow-hidden rounded-2xl border border-border-subtle bg-surface"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[740px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-muted text-xs font-semibold uppercase tracking-wider text-ink-muted">
                <th className="w-12 px-4 py-3.5 text-center">#</th>
                <th className="px-4 py-3.5">Tên hạng mục dịch vụ</th>
                <th className="w-56 px-4 py-3.5">Chi phí tham khảo</th>
                <th className="w-48 px-4 py-3.5">Bảo hành / Ghi chú</th>
                <th className="w-32 px-4 py-3.5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {rows.map((row, index) => (
                <tr key={row.localId} className="hover:bg-surface-muted/40">
                  <td className="px-4 py-2.5 text-center text-xs font-semibold text-ink-muted tabular-nums">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      type="text"
                      required
                      value={row.service_name}
                      onChange={(e) => updateRow(index, "service_name", e.target.value)}
                      placeholder="Nhập tên dịch vụ..."
                      aria-label={`Tên dịch vụ dòng ${index + 1}`}
                      className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm text-ink focus:border-brand-red focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      type="text"
                      required
                      value={row.price}
                      onChange={(e) => updateRow(index, "price", e.target.value)}
                      placeholder="Ví dụ: 150.000đ – 200.000đ"
                      aria-label={`Giá dịch vụ dòng ${index + 1}`}
                      className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm font-semibold text-brand-red tabular-nums focus:border-brand-red focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2.5">
                    <input
                      type="text"
                      value={row.warranty}
                      onChange={(e) => updateRow(index, "warranty", e.target.value)}
                      placeholder="Ví dụ: 6 – 12 tháng"
                      aria-label={`Bảo hành dòng ${index + 1}`}
                      className="w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm text-ink-muted focus:border-brand-red focus:outline-none"
                    />
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveRow(index, -1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle text-ink-muted hover:text-ink disabled:opacity-30"
                        title="Di chuyển lên"
                        aria-label={`Di chuyển dòng ${index + 1} lên`}
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={index === rows.length - 1}
                        onClick={() => moveRow(index, 1)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle text-ink-muted hover:text-ink disabled:opacity-30"
                        title="Di chuyển xuống"
                        aria-label={`Di chuyển dòng ${index + 1} xuống`}
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeRow(index)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-brand-red hover:bg-red-50"
                        title="Xóa dòng này"
                        aria-label={`Xóa dòng ${index + 1}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-border-subtle bg-surface-muted/60 px-5 py-4 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-sm font-semibold text-ink hover:border-brand-navy"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Thêm hạng mục mới
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-red-dark disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Đang lưu..." : `Lưu bảng giá ${activeGroup.label}`}
          </button>
        </div>
      </form>
    </div>
  );
}
