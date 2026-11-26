import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createSupabasePublicClient } from "@/lib/supabase/server";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  id?: string;
  slug: string;
  title: string;
  seoTitle?: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: string;
  imageAlt: string;
  readingTime: string;
  status?: "draft" | "published";
}

export interface PostItem extends PostMeta {
  content: string;
  format: "html" | "mdx";
}

interface SupabasePostRow {
  id: string;
  slug: string;
  title: string;
  seo_title: string | null;
  description: string;
  content: string;
  category: string;
  author: string;
  image: string;
  image_alt: string;
  reading_time: string;
  status: "draft" | "published";
  published_at: string;
}

function mapRowToMeta(row: SupabasePostRow): PostMeta {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    seoTitle: row.seo_title ?? undefined,
    description: row.description,
    date: row.published_at ? row.published_at.slice(0, 10) : "2026-01-01",
    author: row.author || "Conic Computer",
    category: row.category || "Tin tức công nghệ",
    image: row.image || "/images/services/sua-laptop-ve-sinh-mx4.webp",
    imageAlt: row.image_alt || row.title,
    readingTime: row.reading_time || "4 phút đọc",
    status: row.status,
  };
}

function getLocalMdxPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ""),
        date: String(data.date ?? "2026-01-01"),
        author: String(data.author ?? "Conic Computer"),
        category: String(data.category ?? "Tin tức công nghệ"),
        image: String(data.image ?? "/images/services/sua-laptop-ve-sinh-mx4.webp"),
        imageAlt: String(data.imageAlt ?? data.title ?? "Conic Computer"),
        readingTime: String(data.readingTime ?? "4 phút đọc"),
        status: "published" as const,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function getLocalMdxPostBySlug(slug: string): PostItem | null {
  const mdxPath = path.join(POSTS_DIR, `${slug}.mdx`);
  const mdPath = path.join(POSTS_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath) ? mdxPath : fs.existsSync(mdPath) ? mdPath : null;
  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? "2026-01-01"),
    author: String(data.author ?? "Conic Computer"),
    category: String(data.category ?? "Tin tức công nghệ"),
    image: String(data.image ?? "/images/services/sua-laptop-ve-sinh-mx4.webp"),
    imageAlt: String(data.imageAlt ?? data.title ?? "Conic Computer"),
    readingTime: String(data.readingTime ?? "4 phút đọc"),
    status: "published",
    content,
    format: "mdx",
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const supabase = createSupabasePublicClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(
          "id, slug, title, seo_title, description, category, author, image, image_alt, reading_time, status, published_at"
        )
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!error && data) {
        return (data as SupabasePostRow[]).map(mapRowToMeta);
      }
    } catch {
      // Fallback sang bài viết MDX cục bộ nếu chưa tạo bảng
    }
  }

  return getLocalMdxPosts();
}

export async function getPostBySlug(slug: string): Promise<PostItem | null> {
  const supabase = createSupabasePublicClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .maybeSingle();

      if (!error && data) {
        const row = data as SupabasePostRow;
        return {
          ...mapRowToMeta(row),
          content: row.content,
          format: "html",
        };
      }
    } catch {
      // Fallback sang MDX cục bộ
    }
  }

  return getLocalMdxPostBySlug(slug);
}
