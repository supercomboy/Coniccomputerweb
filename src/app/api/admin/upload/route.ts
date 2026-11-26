import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

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
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Không tìm thấy tệp ảnh tải lên." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Chỉ hỗ trợ định dạng ảnh JPG, PNG, WebP hoặc GIF." },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "Kích thước ảnh tối đa là 5MB." }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "webp";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const filePath = `posts/${safeName}`;

    const arrayBuffer = await file.arrayBuffer();
    const { error } = await supabase.storage
      .from("blog-images")
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: `Lỗi upload ảnh: ${error.message}` }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from("blog-images")
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch {
    return NextResponse.json({ error: "Không thể xử lý tệp ảnh tải lên." }, { status: 500 });
  }
}
