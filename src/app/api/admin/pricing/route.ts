import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ALL_PRICING_GROUPS, AllPricingCategoryKey } from "@/lib/pricing";

const VALID_KEYS = new Set<string>(ALL_PRICING_GROUPS.map((g) => g.key));

export async function GET() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Chưa cấu hình Supabase." }, { status: 503 });
  }

  const { data, error } = await supabase
    .from("pricing_items")
    .select("id, category_key, service_name, price, warranty, sort_order, updated_at")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ items: data ?? [] });
}

export async function PUT(request: Request) {
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
    const categoryKey = String(body.category_key ?? "").trim() as AllPricingCategoryKey;
    if (!VALID_KEYS.has(categoryKey)) {
      return NextResponse.json({ error: "Nhóm bảng giá không hợp lệ." }, { status: 400 });
    }

    const rawItems = Array.isArray(body.items) ? body.items : [];
    const cleaned = rawItems
      .map((item: Record<string, unknown>, idx: number) => ({
        category_key: categoryKey,
        service_name: String(item.service_name ?? "").trim(),
        price: String(item.price ?? "").trim(),
        warranty: String(item.warranty ?? "").trim(),
        sort_order: idx + 1,
      }))
      .filter((item: { service_name: string; price: string }) => item.service_name && item.price);

    if (cleaned.length === 0) {
      return NextResponse.json(
        { error: "Bảng giá cần có ít nhất 1 hạng mục hợp lệ (đủ tên dịch vụ và giá)." },
        { status: 400 }
      );
    }

    // Xóa các dòng cũ của nhóm và ghi lại theo đúng thứ tự mới
    const { error: delError } = await supabase
      .from("pricing_items")
      .delete()
      .eq("category_key", categoryKey);

    if (delError) {
      return NextResponse.json({ error: delError.message }, { status: 500 });
    }

    const { data, error: insError } = await supabase
      .from("pricing_items")
      .insert(cleaned)
      .select("id, category_key, service_name, price, warranty, sort_order")
      .order("sort_order", { ascending: true });

    if (insError) {
      return NextResponse.json({ error: insError.message }, { status: 500 });
    }

    // Revalidate ngay Trang chủ và tất cả 6 trang dịch vụ
    revalidatePath("/");
    revalidatePath("/sua-laptop/");
    revalidatePath("/sua-macbook/");
    revalidatePath("/sua-linh-kien-pc/");
    revalidatePath("/cai-win-phan-mem/");
    revalidatePath("/cuu-du-lieu/");
    revalidatePath("/nang-cap-may-tinh/");

    return NextResponse.json({ items: data ?? [] });
  } catch {
    return NextResponse.json({ error: "Dữ liệu bảng giá không hợp lệ." }, { status: 400 });
  }
}
