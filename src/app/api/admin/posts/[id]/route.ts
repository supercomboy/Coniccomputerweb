import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { estimateReadingTime, isReservedSlug, slugifyVietnamese } from "@/lib/slugify";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Chưa cấu hình Supabase." }, { status: 503 });
  }

  const { data, error } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Không tìm thấy bài viết." }, { status: 404 });

  return NextResponse.json({ post: data });
}

export async function PUT(request: Request, context: RouteContext) {
  const { id } = await context.params;
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
    const { data: existing } = await supabase
      .from("posts")
      .select("slug")
      .eq("id", id)
      .maybeSingle();

    const body = await request.json();
    const title = String(body.title ?? "").trim();
    const slug = slugifyVietnamese(String(body.slug ?? "").trim() || title);

    if (!title) {
      return NextResponse.json({ error: "Vui lòng nhập tiêu đề bài viết." }, { status: 400 });
    }
    if (!slug || isReservedSlug(slug)) {
      return NextResponse.json(
        { error: `Đường dẫn "/${slug}/" không hợp lệ hoặc trùng trang hệ thống.` },
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

    const { data, error } = await supabase
      .from("posts")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      const msg =
        error.code === "23505"
          ? `Đường dẫn "/${slug}/" đã được bài viết khác sử dụng.`
          : error.message;
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    revalidatePath("/");
    revalidatePath("/tai-nguyen/");
    if (existing?.slug) revalidatePath(`/${existing.slug}/`);
    revalidatePath(`/${slug}/`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ post: data });
  } catch {
    return NextResponse.json({ error: "Dữ liệu cập nhật không hợp lệ." }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
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

  const { data: existing } = await supabase
    .from("posts")
    .select("slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/tai-nguyen/");
  if (existing?.slug) revalidatePath(`/${existing.slug}/`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}
