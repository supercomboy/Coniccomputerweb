"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  ImagePlus,
  Loader2,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import { TiptapEditor } from "./TiptapEditor";
import { slugifyVietnamese } from "@/lib/slugify";

export interface PostFormInitialData {
  id?: string;
  title: string;
  slug: string;
  seo_title: string;
  description: string;
  content: string;
  category: string;
  image: string;
  image_alt: string;
  reading_time: string;
  status: "draft" | "published";
  published_at: string;
}

interface PostFormProps {
  mode: "create" | "edit";
  initialData?: PostFormInitialData;
}

const CATEGORIES = [
  "Tin tức công nghệ",
  "Sửa Chữa Thực Tế",
  "Thủ Thuật Máy Tính",
  "Tư Vấn Nâng Cấp",
];

export function PostForm({ mode, initialData }: PostFormProps) {
  const router = useRouter();
  const thumbInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [seoTitle, setSeoTitle] = useState(initialData?.seo_title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [category, setCategory] = useState(initialData?.category ?? CATEGORIES[0]);
  const [image, setImage] = useState(
    initialData?.image ?? "/images/services/sua-laptop-ve-sinh-mx4.webp"
  );
  const [imageAlt, setImageAlt] = useState(initialData?.image_alt ?? "");
  const [readingTime, setReadingTime] = useState(initialData?.reading_time ?? "");
  const [status, setStatus] = useState<"draft" | "published">(
    initialData?.status ?? "published"
  );
  const [publishedAt, setPublishedAt] = useState(
    initialData?.published_at
      ? initialData.published_at.slice(0, 10)
      : new Date().toISOString().slice(0, 10)
  );

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [uploadingThumb, setUploadingThumb] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugTouched) {
      setSlug(slugifyVietnamese(val));
    }
  };

  const handleThumbUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingThumb(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload/", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Upload ảnh đại diện thất bại.");
      } else if (json.url) {
        setImage(json.url);
        if (!imageAlt && title) setImageAlt(title);
      }
    } catch {
      setError("Không thể kết nối máy chủ để upload ảnh đại diện.");
    } finally {
      setUploadingThumb(false);
      if (thumbInputRef.current) thumbInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const endpoint =
        mode === "edit" && initialData?.id
          ? `/api/admin/posts/${initialData.id}/`
          : "/api/admin/posts/";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          seo_title: seoTitle,
          description,
          content,
          category,
          image,
          image_alt: imageAlt || title,
          reading_time: readingTime,
          status,
          published_at: publishedAt ? `${publishedAt}T07:00:00Z` : undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Không thể lưu bài viết.");
        return;
      }

      if (mode === "create" && json.post?.id) {
        router.push(`/admin/posts/${json.post.id}/edit/`);
        router.refresh();
      } else {
        setSuccess(
          status === "published"
            ? "Đã lưu & cập nhật bài viết lên website ngay lập tức."
            : "Đã lưu bản nháp thành công."
        );
        router.refresh();
      }
    } catch {
      setError("Lỗi kết nối máy chủ khi lưu bài viết.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    const confirmed = window.confirm(
      `Bạn chắc chắn muốn xóa vĩnh viễn bài viết "${title}"?`
    );
    if (!confirmed) return;

    setDeleting(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/posts/${initialData.id}/`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error ?? "Không thể xóa bài viết.");
        return;
      }
      router.push("/admin/");
      router.refresh();
    } catch {
      setError("Lỗi kết nối khi xóa bài viết.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col justify-between gap-4 border-b border-border-subtle pb-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-surface text-ink-muted hover:text-ink"
            aria-label="Quay lại danh sách bài viết"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-bold text-ink sm:text-2xl">
            {mode === "create" ? "Viết bài mới" : "Chỉnh sửa bài viết"}
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {mode === "edit" && slug && status === "published" && (
            <a
              href={`/${slug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-3.5 py-2 text-sm font-medium text-ink hover:bg-surface-muted"
            >
              Xem bài trên web
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          {mode === "edit" && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-sm font-semibold text-brand-red hover:bg-red-100 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? "Đang xóa..." : "Xóa bài"}
            </button>
          )}

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-5 py-2 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-brand-red-dark disabled:opacity-50"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving
              ? "Đang lưu..."
              : status === "published"
                ? "Lưu & Xuất bản"
                : "Lưu bản nháp"}
          </button>
        </div>
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

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Main Column */}
        <div className="min-w-0 space-y-5 lg:col-span-8">
          <div className="rounded-2xl border border-border-subtle bg-surface p-5 space-y-4">
            <div>
              <label htmlFor="post-title" className="block text-sm font-semibold text-ink">
                Tiêu đề bài viết <span className="text-brand-red">*</span>
              </label>
              <input
                id="post-title"
                type="text"
                required
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Ví dụ: Hướng dẫn kiểm tra pin MacBook chính xác nhất"
                className="mt-1.5 w-full rounded-lg border border-border-subtle px-3.5 py-2.5 text-base font-medium text-ink focus:border-brand-red focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="post-slug" className="block text-sm font-semibold text-ink">
                  Đường dẫn (URL Slug) <span className="text-brand-red">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setSlug(slugifyVietnamese(title));
                    setSlugTouched(false);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-brand-red hover:underline"
                >
                  <RefreshCw className="h-3 w-3" />
                  Tạo tự động từ tiêu đề
                </button>
              </div>
              <div className="mt-1.5 flex items-center rounded-lg border border-border-subtle bg-surface-muted px-3">
                <span className="text-xs text-ink-muted">coniccomputer.com/</span>
                <input
                  id="post-slug"
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    setSlugTouched(true);
                    setSlug(e.target.value);
                  }}
                  placeholder="huong-dan-kiem-tra-pin-macbook"
                  className="w-full bg-transparent py-2 text-sm text-ink focus:outline-none"
                />
                <span className="text-xs text-ink-muted">/</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="post-desc" className="block text-sm font-semibold text-ink">
                  Mô tả ngắn (Meta Description SEO)
                </label>
                <span
                  className={`text-xs tabular-nums ${
                    description.length > 165 ? "text-brand-red" : "text-ink-muted"
                  }`}
                >
                  {description.length}/160 ký tự
                </span>
              </div>
              <textarea
                id="post-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tóm tắt nội dung bài viết trong 140–160 ký tự để hiển thị đẹp trên Google..."
                className="mt-1.5 w-full rounded-lg border border-border-subtle px-3.5 py-2.5 text-sm text-ink focus:border-brand-red focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Nội dung bài viết</label>
            <TiptapEditor value={content} onChange={setContent} />
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-5 lg:col-span-4">
          {/* Publish Settings */}
          <div className="rounded-2xl border border-border-subtle bg-surface p-5 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-muted">
              Cấu hình xuất bản
            </h2>

            <div>
              <label htmlFor="post-status" className="block text-sm font-semibold text-ink">
                Trạng thái
              </label>
              <select
                id="post-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as "draft" | "published")}
                className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm text-ink"
              >
                <option value="published">Xuất bản ngay (Hiển thị công khai)</option>
                <option value="draft">Bản nháp (Chỉ Admin thấy)</option>
              </select>
            </div>

            <div>
              <label htmlFor="post-category" className="block text-sm font-semibold text-ink">
                Chuyên mục
              </label>
              <select
                id="post-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm text-ink"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="post-date" className="block text-sm font-semibold text-ink">
                Ngày đăng
              </label>
              <input
                id="post-date"
                type="date"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border-subtle px-3 py-2 text-sm text-ink tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="post-reading" className="block text-sm font-semibold text-ink">
                Thời gian đọc (tùy chọn)
              </label>
              <input
                id="post-reading"
                type="text"
                value={readingTime}
                onChange={(e) => setReadingTime(e.target.value)}
                placeholder="Tự động tính nếu để trống (vd: 4 phút đọc)"
                className="mt-1.5 w-full rounded-lg border border-border-subtle px-3 py-2 text-sm text-ink"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="rounded-2xl border border-border-subtle bg-surface p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-ink-muted">
                Ảnh đại diện
              </h2>
              <button
                type="button"
                disabled={uploadingThumb}
                onClick={() => thumbInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-surface-muted px-3 py-1.5 text-xs font-semibold text-ink hover:bg-slate-200/70 disabled:opacity-50"
              >
                {uploadingThumb ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <ImagePlus className="h-3.5 w-3.5 text-brand-red" />
                )}
                {uploadingThumb ? "Đang tải..." : "Tải ảnh lên"}
              </button>
              <input
                ref={thumbInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleThumbUpload}
                className="hidden"
              />
            </div>

            {image && (
              <div className="overflow-hidden rounded-xl border border-border-subtle bg-surface-muted">
                <img
                  src={image}
                  alt={imageAlt || "Xem trước ảnh đại diện"}
                  className="aspect-[16/9] w-full object-cover"
                />
              </div>
            )}

            <div>
              <label htmlFor="post-image" className="block text-xs font-semibold text-ink">
                URL ảnh đại diện
              </label>
              <input
                id="post-image"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border-subtle px-3 py-2 text-xs text-ink"
              />
            </div>

            <div>
              <label htmlFor="post-image-alt" className="block text-xs font-semibold text-ink">
                Mô tả ảnh (Alt SEO)
              </label>
              <input
                id="post-image-alt"
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Mặc định lấy theo tiêu đề bài viết"
                className="mt-1 w-full rounded-lg border border-border-subtle px-3 py-2 text-xs text-ink"
              />
            </div>
          </div>

          {/* Advanced SEO */}
          <div className="rounded-2xl border border-border-subtle bg-surface p-5 space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-muted">
              Tối ưu SEO (Tùy chọn)
            </h2>
            <div>
              <label htmlFor="post-seo-title" className="block text-xs font-semibold text-ink">
                SEO Title riêng
              </label>
              <input
                id="post-seo-title"
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Để trống sẽ dùng Tiêu đề bài viết"
                className="mt-1 w-full rounded-lg border border-border-subtle px-3 py-2 text-xs text-ink"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
