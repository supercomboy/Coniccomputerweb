import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  image: string;
  imageAlt: string;
  readingTime: string;
}

export interface PostItem extends PostMeta {
  content: string;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((file) => {
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
    };
  });

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): PostItem | null {
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
    content,
  };
}
