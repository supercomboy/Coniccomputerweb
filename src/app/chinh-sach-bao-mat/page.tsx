import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Chính Sách Bảo Mật Dữ Liệu & Bảo Hành | Conic Computer",
  description:
    "Chính sách bảo mật dữ liệu cá nhân khách hàng 100%, quy định ký tên linh kiện và chế độ bảo hành minh bạch tại Conic Computer Bình Chánh, TP.HCM.",
  alternates: { canonical: "/chinh-sach-bao-mat/" },
};

export default function ChinhSachBaoMatPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-surface-muted">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-muted">
            <Link href="/" className="hover:text-brand-red">
              Trang chủ
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="font-medium text-ink">Chính sách bảo mật</span>
          </nav>

          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 shrink-0 text-brand-red" aria-hidden="true" />
            <h1 className="text-3xl font-bold tracking-[-0.025em] text-ink sm:text-4xl">
              Chính Sách Bảo Mật Dữ Liệu &amp; Cam Kết Dịch Vụ
            </h1>
          </div>
          <p className="mt-4 text-base leading-relaxed text-ink-muted">
            Tại Conic Computer, bảo vệ dữ liệu cá nhân, thông tin khách hàng và tính minh bạch về
            linh kiện là ưu tiên hàng đầu trong mọi dịch vụ sửa chữa.
          </p>
        </div>
      </section>

      <article className="mx-auto max-w-4xl space-y-8 px-4 py-12 text-sm leading-relaxed text-ink sm:px-6 lg:px-8 lg:py-16">
        <section>
          <h2 className="text-xl font-bold text-ink">1. Bảo mật dữ liệu trên thiết bị sửa chữa</h2>
          <p className="mt-3 text-ink-muted">
            Chúng tôi cam kết tuyệt đối không truy cập, không sao chép, không chia sẻ hay làm lộ bất
            kỳ tệp tin, hình ảnh, mật khẩu hoặc tài liệu cá nhân/doanh nghiệp nào lưu trữ trên
            Laptop, MacBook, PC hoặc ổ cứng của khách hàng. Với dịch vụ cứu dữ liệu, toàn bộ bản sao
            tạm phục vụ quá trình khôi phục sẽ được xóa vĩnh viễn ngay sau khi khách hàng xác nhận
            đã nhận đủ dữ liệu.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink">2. Thông tin liên hệ khách hàng</h2>
          <p className="mt-3 text-ink-muted">
            Thông tin cơ bản (tên, số điện thoại, dòng máy, lịch sử bảo hành) chỉ được lưu trữ trên
            hệ thống chăm sóc khách hàng của Conic Computer để phục vụ tra cứu bảo hành và hỗ trợ kỹ
            thuật sau sửa chữa. Chúng tôi không bán hoặc trao đổi thông tin khách hàng cho bất kỳ
            bên thứ ba nào.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-ink">3. Minh bạch linh kiện &amp; Bảo hành</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-muted">
            <li>
              Khách hàng có quyền quan sát trực tiếp quá trình kiểm tra và thay thế linh kiện lấy
              liền.
            </li>
            <li>
              Đối với các ca sửa mainboard cần giữ máy, khách hàng được ký tên trực tiếp lên từng
              linh kiện quan trọng trước khi bàn giao.
            </li>
            <li>
              Thời gian bảo hành được ghi rõ trên tem và phiếu bảo hành (từ 3 đến 36 tháng tùy hạng
              mục), hỗ trợ đổi mới nhanh chóng nếu phát sinh lỗi kỹ thuật trong hạn bảo hành.
            </li>
          </ul>
        </section>

        <section className="rounded-2xl border border-border-subtle bg-surface-muted p-6">
          <h2 className="text-lg font-bold text-ink">4. Thông tin liên hệ giải quyết khiếu nại</h2>
          <p className="mt-2 text-ink-muted">
            Mọi thắc mắc liên quan đến chính sách bảo mật hoặc bảo hành, quý khách vui lòng liên hệ
            trực tiếp:
          </p>
          <ul className="mt-3 space-y-1.5 text-ink">
            <li>
              <strong>Đơn vị:</strong> {SITE.name}
            </li>
            <li>
              <strong>Hotline / Zalo:</strong>{" "}
              <a href={SITE.phoneHref} className="font-semibold text-brand-red hover:underline">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a href={SITE.emailHref} className="hover:text-brand-red hover:underline">
                {SITE.email}
              </a>
            </li>
            <li>
              <strong>Địa chỉ:</strong> {SITE.address}
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
