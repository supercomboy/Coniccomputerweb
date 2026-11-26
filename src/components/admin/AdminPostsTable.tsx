"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Pencil, Plus, Search, Trash2 } from "lucide-react";

export interface AdminPostRow {
  id: string;
  slug: string;
  title: string;
  category: string;
  status: "draft" | "published";
  published_at: string;
  updated_at: string;
}

export function AdminPostsTable({ initialPosts }: { initialPosts: AdminPostRow[] }) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = posts.filter((p) => {
    const matchStatus = filter === "all" || p.status === filter;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q || p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
    return matchStatus && matchQuery;
  });

  const handleDelete = async (post: AdminPostRow) => {
    if (!window.confirm(`Xóa vĩnh viễn bài viết "${post.title}"?`)) return;
    setDeletingId(post.id);
    try {
      const res = await fetch(`/api/admin/posts/${post.id}/`, { method: "DELETE" });
      if (res.ok) {
        setPosts((prev) => prev.filter((item) => item.id !== post.id));
        router.refresh();
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-ink">Danh sách bài viết</h1>
          <p className="mt-1 text-sm text-ink-muted">
            Tổng cộng <span className="font-semibold text-ink tabular-nums">{posts.length}</span>{" "}
            bài viết. Thay đổi sẽ hiển thị ngay trên website sau khi lưu.
          </p>
        </div>
        <Link
          href="/admin/posts/new/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-brand-red-dark"
        >
          <Plus className="h-4 w-4" />
          Viết bài mới
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tiêu đề hoặc đường dẫn..."
            className="w-full rounded-lg border border-border-subtle bg-surface py-2 pl-9 pr-3 text-sm text-ink focus:border-brand-red focus:outline-none"
          />
        </div>

        <div className="inline-flex rounded-lg border border-border-subtle bg-surface p-1 text-xs font-semibold">
          {(["all", "published", "draft"] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                filter === key ? "bg-brand-navy text-white" : "text-ink-muted hover:text-ink"
              }`}
            >
              {key === "all" ? "Tất cả" : key === "published" ? "Đã xuất bản" : "Bản nháp"}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface">
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-ink-muted">
            Chưa có bài viết nào phù hợp. Hãy bấm <strong>Viết bài mới</strong> để bắt đầu.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border-subtle bg-surface-muted text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  <th className="px-5 py-3.5">Tiêu đề &amp; Đường dẫn</th>
                  <th className="px-4 py-3.5">Chuyên mục</th>
                  <th className="px-4 py-3.5">Trạng thái</th>
                  <th className="px-4 py-3.5">Ngày đăng</th>
                  <th className="px-5 py-3.5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-muted/60">
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/posts/${post.id}/edit/`}
                        className="font-semibold text-ink hover:text-brand-red"
                      >
                        {post.title}
                      </Link>
                      <div className="mt-0.5 text-xs text-ink-muted">/{post.slug}/</div>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-ink-muted">{post.category}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          post.status === "published"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {post.status === "published" ? "Đã xuất bản" : "Bản nháp"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-ink-muted tabular-nums">
                      {post.published_at?.slice(0, 10)}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/admin/posts/${post.id}/edit/`}
                          className="inline-flex h-8 items-center gap-1 rounded-lg border border-border-subtle px-2.5 text-xs font-semibold text-ink hover:border-brand-navy"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Sửa
                        </Link>
                        {post.status === "published" && (
                          <a
                            href={`/${post.slug}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border-subtle text-ink-muted hover:text-ink"
                            title="Xem bài trên web"
                            aria-label={`Xem bài ${post.title}`}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        <button
                          type="button"
                          disabled={deletingId === post.id}
                          onClick={() => handleDelete(post)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-brand-red hover:bg-red-50 disabled:opacity-50"
                          title="Xóa bài viết"
                          aria-label={`Xóa bài ${post.title}`}
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
        )}
      </div>
    </div>
  );
}
