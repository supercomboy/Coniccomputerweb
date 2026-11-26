import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ChevronRight, MessageCircle, Phone } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE } from "@/data/site";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Conic Computer`,
    description: post.description,
    alternates: { canonical: `/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
  };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-10 mb-3 text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-7 mb-2 text-lg font-bold text-ink" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 text-base leading-relaxed text-ink-muted" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-ink-muted" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-base leading-relaxed text-ink-muted" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="font-medium text-brand-red underline hover:text-brand-red-dark" {...props} />
  ),
};

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    image: `${SITE.domain}${post.image}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
          <Link href="/" className="hover:text-brand-red">
            Trang chủ
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <Link href="/tai-nguyen/" className="hover:text-brand-red">
            Tin tức công nghệ
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="line-clamp-1 font-medium text-ink">{post.title}</span>
        </nav>

        <header>
          <div className="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
            <span className="font-semibold text-brand-red">{post.category}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.date}>{post.date}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold tracking-[-0.025em] text-ink sm:text-4xl lg:leading-[1.15]">
            {post.title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">{post.description}</p>
        </header>

        <figure className="mt-8 overflow-hidden rounded-2xl border border-border-subtle">
          <img
            src={post.image}
            alt={post.imageAlt}
            width={1024}
            height={768}
            className="aspect-[16/9] w-full object-cover"
          />
        </figure>

        <div className="mt-8 max-w-[70ch]">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Bottom Direct Contact CTA */}
        <div className="mt-12 rounded-2xl border border-border-subtle bg-brand-navy p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold text-white">
            Cần kiểm tra máy hoặc tư vấn kỹ thuật miễn phí?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Liên hệ ngay đội ngũ kỹ thuật Conic Computer tại KDC Conic 13B, Bình Chánh để được hỗ
            trợ nhanh nhất.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark tabular-nums"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Gọi {SITE.phoneDisplay}
            </a>
            <a
              href={SITE.zaloHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0068FF] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0056d6]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat Zalo ngay
            </a>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/tai-nguyen/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-red"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Quay lại danh sách Tin tức công nghệ
          </Link>
        </div>
      </article>
    </>
  );
}
