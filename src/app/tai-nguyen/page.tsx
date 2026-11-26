import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Tin Tức Công Nghệ & Kinh Nghiệm Sửa Chữa Máy Tính | Conic Computer",
  description:
    "Tổng hợp kiến thức công nghệ, chia sẻ ca sửa chữa Laptop, MacBook, PC thực tế và mẹo tối ưu Windows/macOS từ đội ngũ kỹ thuật Conic Computer.",
  alternates: { canonical: "/tai-nguyen/" },
};

export const revalidate = 60;

export default async function TaiNguyenPage() {
  const posts = await getAllPosts();

  return (
    <>
      <section className="border-b border-border-subtle bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-muted">
            <Link href="/" className="hover:text-brand-red">
              Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-ink">Tin tức công nghệ</span>
          </nav>

          <h1 className="text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl">
            Tin Tức Công Nghệ &amp; Kinh Nghiệm Sửa Chữa
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
            Cập nhật thông tin công nghệ mới nhất, hướng dẫn bảo quản máy tính bền bỉ và các ca sửa
            chữa thực tế tại Conic Computer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface transition-all hover:border-slate-300 hover:shadow-md"
            >
              <Link href={`/${post.slug}/`} className="flex flex-1 flex-col">
                <img
                  src={post.image}
                  alt={post.imageAlt}
                  width={1024}
                  height={768}
                  className="aspect-[16/9] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs text-ink-muted">
                    <span className="font-semibold text-brand-red">{post.category}</span>
                    <span aria-hidden="true">•</span>
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                  <h2 className="mt-2.5 text-lg font-bold text-ink group-hover:text-brand-red">
                    {post.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                    {post.description}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy group-hover:text-brand-red">
                    Đọc bài viết
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
