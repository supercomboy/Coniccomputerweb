import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { estimateReadingTime, isReservedSlug, slugifyVietnamese } from "@/lib/slugify";

export async function GET() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Chưa cấu hình Supabase." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, slug, title, seo_title, description, category, author, image, image_alt, reading_time, status, published_at, updated_at"
    )
    .order("updated_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ posts: data ?? [] });
}

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Chưa cấu hình Supabase." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Chưa đăng nhập quản trị." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const title = String(body.title ?? "").trim();
    const rawSlug = String(body.slug ?? "").trim();
    const slug = slugifyVietnamese(rawSlug || title);

    if (!title) {
      return NextResponse.json({ error: "Vui lòng nhập tiêu đề bài viết." }, { status: 400 });
    }
    if (!slug) {
      return NextResponse.json({ error: "Đường dẫn (slug) không hợp lệ." }, { status: 400 });
    }
    if (isReservedSlug(slug)) {
      return NextResponse.json(
        { error: `Đường dẫn "/${slug}/" trùng với trang hệ thống, vui lòng đổi slug khác.` },
        { status: 400 }
      );
    }

    const content = String(body.content ?? "").trim();
    const status = body.status === "published" ? "published" : "draft";
    const readingTime = String(body.reading_time ?? "").trim() || estimateReadingTime(content);

    const payload = {
      title,
      slug,
      seo_title: String(body.seo_title ?? "").trim() || null,
      description: String(body.description ?? "").trim(),
      content,
      category: String(body.category ?? "Tin tức công nghệ").trim() || "Tin tức công nghệ",
      author: String(body.author ?? "Conic Computer").trim() || "Conic Computer",
      image:
        String(body.image ?? "").trim() || "/images/services/sua-laptop-ve-sinh-mx4.webp",
      image_alt: String(body.image_alt ?? "").trim() || title,
      reading_time: readingTime,
      status,
      published_at: body.published_at ? new Date(body.published_at).toISOString() : new Date().toISOString(),
    };

    const { data, error } = await supabase.from("posts").insert(payload).select().single();

    if (error) {
      const msg =
        error.code === "23505"
          ? `Đường dẫn "/${slug}/" đã tồn tại, vui lòng chọn slug khác.`
          : error.message;
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    // Cập nhật cache ngay lập tức
    revalidatePath("/");
    revalidatePath("/tai-nguyen/");
    revalidatePath(`/${slug}/`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ post: data }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }
}
