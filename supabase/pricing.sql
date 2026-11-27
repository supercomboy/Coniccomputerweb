-- =====================================================================
-- CONIC COMPUTER - BẢNG GIÁ DỊCH VỤ (PRICING_ITEMS + RLS + SEED)
-- Chạy file này trong Supabase Dashboard -> SQL Editor -> New query -> Run
-- (An toàn khi chạy trên project đã có sẵn bảng posts)
-- =====================================================================

create table if not exists public.pricing_items (
  id uuid primary key default gen_random_uuid(),
  category_key text not null check (
    category_key in ('laptop', 'macbook', 'pc', 'cai-win', 'cuu-du-lieu', 'nang-cap')
  ),
  service_name text not null,
  price text not null,
  warranty text not null default '',
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists idx_pricing_category_order
  on public.pricing_items (category_key, sort_order asc);

-- Trigger cập nhật updated_at (tái sử dụng hàm handle_updated_at nếu đã có)
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_pricing_updated_at on public.pricing_items;
create trigger trg_pricing_updated_at
  before update on public.pricing_items
  for each row execute function public.handle_updated_at();

-- Bật Row Level Security (RLS)
alter table public.pricing_items enable row level security;

drop policy if exists "Public can read pricing items" on public.pricing_items;
create policy "Public can read pricing items"
  on public.pricing_items
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated admin full access pricing" on public.pricing_items;
create policy "Authenticated admin full access pricing"
  on public.pricing_items
  for all
  to authenticated
  using (true)
  with check (true);

-- Seed dữ liệu bảng giá mặc định (chỉ chèn nếu bảng đang trống)
do $$
begin
  if not exists (select 1 from public.pricing_items limit 1) then
    insert into public.pricing_items (category_key, service_name, price, warranty, sort_order) values
      -- 1. Sửa Laptop
      ('laptop', 'Vệ sinh Laptop & tra keo tản nhiệt Arctic MX-4 / Honeywell', '150.000đ – 200.000đ', 'Hạ nhiệt rõ rệt', 1),
      ('laptop', 'Cài đặt Windows 10/11 + Driver + Phần mềm cơ bản', '150.000đ – 200.000đ', 'Hỗ trợ kỹ thuật', 2),
      ('laptop', 'Thay pin Laptop (Dell, HP, Asus, Lenovo, Acer...)', '450.000đ – 950.000đ', '6 – 12 tháng', 3),
      ('laptop', 'Thay bàn phím Laptop lấy liền', '350.000đ – 850.000đ', '6 – 12 tháng', 4),
      ('laptop', 'Thay màn hình Laptop (HD / Full HD / IPS)', '950.000đ – 2.200.000đ', '6 – 12 tháng', 5),
      ('laptop', 'Sửa bản lề, gia cố vỏ Laptop bị gãy', '250.000đ – 450.000đ', '3 – 6 tháng', 6),
      ('laptop', 'Sửa nguồn / Sửa mainboard Laptop chuyên sâu', '450.000đ – 1.200.000đ', '3 – 6 tháng', 7),
      ('laptop', 'Nâng cấp SSD 256GB / 512GB NVMe & SATA', '450.000đ – 950.000đ', '36 tháng (1 đổi 1)', 8),

      -- 2. Sửa MacBook
      ('macbook', 'Vệ sinh MacBook & tra keo tản nhiệt MX-4 / Honeywell', '200.000đ – 350.000đ', 'Bảo đảm mát máy', 1),
      ('macbook', 'Cài đặt macOS (Sonoma, Sequoia...) & phần mềm', '150.000đ – 250.000đ', 'Hỗ trợ kỹ thuật', 2),
      ('macbook', 'Thay pin MacBook Air / Pro lấy liền (30–45 phút)', '850.000đ – 1.850.000đ', '6 – 12 tháng', 3),
      ('macbook', 'Thay bàn phím MacBook (Butterfly / Magic Keyboard)', '650.000đ – 1.450.000đ', '6 – 12 tháng', 4),
      ('macbook', 'Ép cáp màn hình MacBook (Fix lỗi Flexgate)', '700.000đ – 1.200.000đ', '3 – 6 tháng', 5),
      ('macbook', 'Sửa nguồn, chạm mainboard, cứu máy vô nước', '800.000đ – 2.200.000đ', '3 – 6 tháng', 6),
      ('macbook', 'Thay cụm màn hình Retina / Liquid Retina', 'Báo giá theo đời máy', '6 – 12 tháng', 7),

      -- 3. Sửa PC & Linh Kiện
      ('pc', 'Vệ sinh PC văn phòng & tra keo tản nhiệt MX-4 / Honeywell', '150.000đ – 200.000đ', 'Giảm 10–20°C', 1),
      ('pc', 'Vệ sinh PC Gaming / Workstation / Đi lại dây gọn', '250.000đ – 400.000đ', 'Tối ưu luồng gió', 2),
      ('pc', 'Sửa bộ nguồn máy tính (PSU) / Kiểm tra sụt áp', '250.000đ – 450.000đ', '3 – 6 tháng', 3),
      ('pc', 'Sửa bo mạch chủ Mainboard PC (mất nguồn, BIOS)', '350.000đ – 750.000đ', '3 – 6 tháng', 4),
      ('pc', 'Sửa mạch / Thay quạt / Tra keo & pad Card VGA', '300.000đ – 800.000đ', '3 – 6 tháng', 5),
      ('pc', 'Nâng cấp RAM DDR4 / DDR5 (8GB / 16GB)', '350.000đ – 950.000đ', '36 tháng (1 đổi 1)', 6),
      ('pc', 'Cứu dữ liệu ổ cứng HDD / SSD bị xóa nhầm, lỗi nhận', '300.000đ – 1.500.000đ', 'Bảo mật 100%', 7),

      -- 4. Cài Win & Phần Mềm
      ('cai-win', 'Cài Windows 10/11 + Full Driver + Phần mềm cơ bản', '150.000đ', 'Hỗ trợ kỹ thuật', 1),
      ('cai-win', 'Cài đặt macOS + Phần mềm cơ bản cho MacBook', '150.000đ – 250.000đ', 'Hỗ trợ kỹ thuật', 2),
      ('cai-win', 'Cài trọn bộ phần mềm đồ họa / kiến trúc (Adobe, CAD...)', '100.000đ – 200.000đ', 'Ổn định, mượt mà', 3),
      ('cai-win', 'Diệt virus, gỡ quảng cáo rác & tối ưu tốc độ Windows', '100.000đ – 150.000đ', 'Không mất dữ liệu', 4),

      -- 5. Cứu Dữ Liệu
      ('cuu-du-lieu', 'Trích xuất dữ liệu từ máy hỏng nguồn / hỏng màn hình', '150.000đ – 250.000đ', 'Lấy liền', 1),
      ('cuu-du-lieu', 'Cứu dữ liệu xóa nhầm, Format, mất phân vùng (lỗi logic)', '300.000đ – 700.000đ', 'Có dữ liệu mới thu phí', 2),
      ('cuu-du-lieu', 'Cứu dữ liệu ổ cứng Bad Sector / lỗi Firmware', '700.000đ – 1.500.000đ', 'Kiểm tra & báo giá trước', 3),

      -- 6. Nâng Cấp RAM & SSD
      ('nang-cap', 'Nâng cấp SSD 256GB (SATA III / M.2 NVMe chính hãng)', '450.000đ – 590.000đ', '36 tháng (1 đổi 1)', 1),
      ('nang-cap', 'Nâng cấp SSD 512GB (SATA III / M.2 NVMe chính hãng)', '790.000đ – 980.000đ', '36 tháng (1 đổi 1)', 2),
      ('nang-cap', 'Nâng cấp SSD 1TB M.2 NVMe tốc độ cao', '1.350.000đ – 1.750.000đ', '36 tháng (1 đổi 1)', 3),
      ('nang-cap', 'Nâng cấp RAM 8GB DDR4 (Laptop / PC)', '350.000đ – 490.000đ', '36 tháng (1 đổi 1)', 4),
      ('nang-cap', 'Nâng cấp RAM 16GB DDR4 / DDR5 (Laptop / PC)', '690.000đ – 1.150.000đ', '36 tháng (1 đổi 1)', 5);
  end if;
end $$;
