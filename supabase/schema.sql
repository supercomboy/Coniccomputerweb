-- =====================================================================
-- CONIC COMPUTER - SUPABASE SCHEMA & SEED (POSTS + STORAGE + RLS)
-- Chạy toàn bộ file này trong Supabase Dashboard -> SQL Editor -> Run
-- =====================================================================

-- 1. Tạo bảng posts
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  seo_title text,
  description text not null default '',
  content text not null default '',
  category text not null default 'Tin tức công nghệ',
  author text not null default 'Conic Computer',
  image text not null default '/images/services/sua-laptop-ve-sinh-mx4.webp',
  image_alt text not null default '',
  reading_time text not null default '4 phút đọc',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_posts_status_published_at
  on public.posts (status, published_at desc);

create index if not exists idx_posts_slug
  on public.posts (slug);

-- Tự động cập nhật updated_at khi sửa bài
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
  before update on public.posts
  for each row execute function public.handle_updated_at();

-- 2. Bật Row Level Security (RLS) cho bảng posts
alter table public.posts enable row level security;

-- Khách truy cập công khai chỉ xem được bài viết đã xuất bản
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
  on public.posts
  for select
  to anon
  using (status = 'published');

-- Tài khoản Admin đã đăng nhập có toàn quyền xem/thêm/sửa/xóa
drop policy if exists "Authenticated admin full access" on public.posts;
create policy "Authenticated admin full access"
  on public.posts
  for all
  to authenticated
  using (true)
  with check (true);

-- 3. Tạo Storage Bucket lưu ảnh bài viết (blog-images)
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Cho phép mọi người xem ảnh công khai trong bucket blog-images
drop policy if exists "Public can view blog images" on storage.objects;
create policy "Public can view blog images"
  on storage.objects
  for select
  to public
  using (bucket_id = 'blog-images');

-- Chỉ Admin đã đăng nhập mới được upload/sửa/xóa ảnh trong bucket blog-images
drop policy if exists "Authenticated admin can upload blog images" on storage.objects;
create policy "Authenticated admin can upload blog images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'blog-images');

drop policy if exists "Authenticated admin can update blog images" on storage.objects;
create policy "Authenticated admin can update blog images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'blog-images');

drop policy if exists "Authenticated admin can delete blog images" on storage.objects;
create policy "Authenticated admin can delete blog images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'blog-images');

-- 4. Seed sẵn 2 bài viết hiện có của Conic Computer để quản lý luôn trong /admin
insert into public.posts (
  slug, title, seo_title, description, content, category, author, image, image_alt, reading_time, status, published_at
) values
(
  'thay-ban-phim-dell-precision-5570-lay-lien',
  'Thay Bàn Phím Dell Precision 5570 Lấy Liền Tại Conic Computer',
  'Thay Bàn Phím Dell Precision 5570 Lấy Liền Tại Conic Computer | Conic Computer',
  'Dịch vụ thay bàn phím Dell Precision 5570 chuẩn zin, có đèn nền LED, thao tác cẩn thận lấy liền tại KDC Conic 13B & Mizuki Park Bình Chánh. Bảo hành 6–12 tháng.',
  '<p><strong>Dell Precision 5570</strong> là dòng máy trạm di động (Mobile Workstation) cao cấp dành cho kỹ sư, kiến trúc sư và chuyên gia đồ họa. Tuy nhiên, sau thời gian dài sử dụng với cường độ cao hoặc vô tình bị đổ nước, bàn phím của máy rất dễ gặp tình trạng liệt phím, kẹt phím hoặc nhảy ký tự.</p><h2>1. Dấu hiệu bàn phím Dell Precision 5570 cần thay mới</h2><ul><li>Một số phím bấm không ăn, phải nhấn rất mạnh mới nhận ký tự.</li><li>Phím bị chạm (kẹt phím), máy tự động gõ liên tục một chữ cái khi mở Word hoặc trình duyệt.</li><li>Bàn phím bị đổ nước, cà phê khiến đèn nền LED chập chờn hoặc liệt cả cụm phím.</li><li>Phím bị gãy ngàm nhựa, bung nút không thể gắn lại chắc chắn.</li></ul><h2>2. Lưu ý kỹ thuật khi thay bàn phím Dell Precision 5570</h2><p>Khác với các dòng laptop phổ thông, <strong>Dell Precision 5570</strong> có thiết kế khung nhôm nguyên khối CNC siêu mỏng. Bàn phím được cố định dưới bo mạch chủ (mainboard) bằng hàng chục ốc siêu nhỏ và cáp kết nối mỏng manh.</p><p>Do đó, quá trình thay bàn phím đòi hỏi kỹ thuật viên phải tháo toàn bộ mainboard, pin, hệ thống tản nhiệt kép và lắp đặt lại đúng lực siết. Tại <strong>Conic Computer</strong>, quy trình luôn được thực hiện tỉ mỉ:</p><ol><li><strong>Ngắt hoàn toàn nguồn pin</strong> trước khi thao tác để bảo vệ bo mạch chủ.</li><li><strong>Vệ sinh bụi quạt và tra lại keo tản nhiệt Arctic MX-4 / Honeywell</strong> nhân tiện tháo cụm tản nhiệt.</li><li><strong>Thay bàn phím mới chuẩn layout US có đèn nền LED</strong>, kiểm tra độ nảy và ánh sáng đều trên từng phím.</li><li><strong>Test 100% các phím chức năng</strong> bằng công cụ <a href="https://supercomboy.github.io/mqhwtest/">Device Test</a> ngay trước mặt khách hàng trước khi bàn giao.</li></ol><h2>3. Liên hệ thay bàn phím laptop lấy liền tại Bình Chánh</h2><p>Nếu chiếc Dell Precision hoặc laptop của bạn đang gặp sự cố về bàn phím, hãy liên hệ ngay với <strong>Conic Computer</strong> (KDC Conic 13B, Nguyễn Văn Linh, Bình Chánh – gần Mizuki Park) qua Hotline/Zalo <strong>0973.535.854</strong> để được kiểm tra và báo giá miễn phí.</p>',
  'Sửa Chữa Thực Tế',
  'Conic Computer',
  '/images/services/sua-laptop-ve-sinh-mx4.webp',
  'Kỹ thuật viên Conic Computer kiểm tra và thay bàn phím laptop Dell Precision 5570',
  '4 phút đọc',
  'published',
  '2026-07-08T07:00:00Z'
),
(
  'why-did-microsoft-stop-deeply-integrating-copilot-into-windows-11',
  'Vì sao Microsoft dừng tích hợp Copilot sâu vào Windows 11?',
  'Vì sao Microsoft dừng tích hợp Copilot sâu vào Windows 11? | Conic Computer',
  'Phân tích lý do Microsoft điều chỉnh chiến lược tích hợp trợ lý AI Copilot trên Windows 11 theo phản hồi từ người dùng và doanh nghiệp, tập trung vào hiệu năng và trải nghiệm thực tế.',
  '<p>Trong suốt thời gian qua, Microsoft đã đẩy mạnh việc đưa trợ lý AI <strong>Copilot</strong> vào sâu trong hệ điều hành Windows 11 — từ thanh Taskbar, Notepad, Paint cho đến File Explorer. Tuy nhiên, hãng đã bắt đầu điều chỉnh lại hướng đi, giảm bớt mức độ tích hợp ép buộc để lắng nghe phản hồi thực tế từ cộng đồng người dùng.</p><h2>1. Ảnh hưởng đến hiệu năng và tài nguyên RAM</h2><p>Một trong những phàn nàn lớn nhất của người dùng laptop văn phòng cấu hình 8GB RAM là các tiến trình nền liên quan đến AI và WebView2 tiêu tốn đáng kể bộ nhớ và pin. Việc thu gọn Copilot thành ứng dụng độc lập giúp người dùng dễ dàng tắt hoặc gỡ bỏ khi không cần thiết, trả lại sự mượt mà cho Windows 11.</p><h2>2. Lo ngại về quyền riêng tư dữ liệu doanh nghiệp</h2><p>Nhiều tính năng AI sâu trong hệ điều hành (như ghi nhận ngữ cảnh màn hình) khiến khối khách hàng doanh nghiệp và người làm việc với dữ liệu nhạy cảm e ngại về bảo mật. Việc tách biệt AI thành tùy chọn cho phép quản trị viên IT kiểm soát tốt hơn môi trường làm việc.</p><h2>3. Người dùng cần một hệ điều hành gọn nhẹ, ổn định</h2><p>Trải nghiệm thực tế tại <strong>Conic Computer</strong> cho thấy phần lớn khách hàng mang máy đi <a href="/cai-win-phan-mem/">cài lại Windows</a> đều mong muốn một bản Windows 10/11 sạch sẽ, khởi động nhanh, ít tiến trình nền và không bị làm phiền bởi các thông báo hay quảng cáo tính năng không dùng tới.</p><p>Nếu chiếc laptop hoặc PC chạy Windows 11 của bạn đang bị chậm, nặng RAM hoặc nóng máy, hãy liên hệ <strong>Conic Computer</strong> qua Hotline/Zalo <strong>0973.535.854</strong> để được tư vấn tối ưu hệ điều hành hoặc <a href="/nang-cap-may-tinh/">nâng cấp RAM &amp; SSD</a> lấy liền.</p>',
  'Tin tức công nghệ',
  'Conic Computer',
  '/images/services/sua-laptop-ve-sinh-mx4.webp',
  'Tối ưu hiệu năng Windows 11 và loại bỏ tiến trình nền thừa tại Conic Computer',
  '3 phút đọc',
  'published',
  '2026-03-17T07:00:00Z'
)
on conflict (slug) do nothing;
