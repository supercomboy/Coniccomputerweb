// Kiến trúc i18n sẵn sàng mở rộng đa ngôn ngữ (VI mặc định ở gốc domain /)
export type Locale = "vi";

export const DEFAULT_LOCALE: Locale = "vi";

export const VI_COPY = {
  cta: {
    callNow: "Gọi ngay 0973.535.854",
    chatZalo: "Nhắn Zalo tư vấn",
    freeCheck: "Kiểm tra & báo giá miễn phí 100%",
    viewAllNews: "Xem tất cả bài viết",
    viewDetail: "Xem chi tiết dịch vụ",
  },
  badges: [
    {
      title: "Kiểm tra miễn phí 100%",
      desc: "Chẩn đoán đúng bệnh, không sửa không mất phí",
    },
    {
      title: "Ký tên linh kiện minh bạch",
      desc: "Quan sát trực tiếp, tuyệt đối không tráo đồ",
    },
    {
      title: "Bảo hành 6 – 36 tháng",
      desc: "Đổi mới 1-1 nhanh chóng, xuất hóa đơn VAT",
    },
  ],
  process: [
    {
      step: "01",
      title: "Tiếp nhận & Lắng nghe",
      desc: "Ghi nhận chi tiết dấu hiệu lỗi từ khách hàng qua Zalo, Hotline hoặc trực tiếp tại cửa hàng KDC Conic 13B.",
    },
    {
      step: "02",
      title: "Kiểm tra tổng thể miễn phí",
      desc: "Kỹ thuật viên đo đạc, kiểm tra phần cứng & phần mềm trực tiếp trước mặt khách để xác định chính xác nguyên nhân.",
    },
    {
      step: "03",
      title: "Báo giá trọn gói minh bạch",
      desc: "Đề xuất phương án tiết kiệm nhất và báo giá rõ ràng trước khi làm. Cam kết không phát sinh chi phí ẩn.",
    },
    {
      step: "04",
      title: "Ký tên linh kiện & Sửa chữa",
      desc: "Với ca cần giữ máy đo mạch, khách ký tên trực tiếp lên màn hình, mainboard, pin, SSD, RAM trước khi xử lý.",
    },
    {
      step: "05",
      title: "Kiểm thử & Bàn giao bảo hành",
      desc: "Chạy kiểm tra ổn định nhiệt độ/tải, khách test đầy đủ chức năng và nhận phiếu bảo hành chính thức.",
    },
  ],
  whyChoose: [
    {
      title: "Hơn 15 năm kinh nghiệm",
      desc: "Đội ngũ kỹ thuật chuyên sâu sơ đồ mạch (schematic), xử lý triệt để từ lỗi cơ bản đến pan bệnh khó trên mainboard.",
    },
    {
      title: "Linh kiện chuẩn chất lượng",
      desc: "Chỉ sử dụng linh kiện loại tốt, nguồn gốc rõ ràng, tương thích tuyệt đối theo đúng model máy của khách hàng.",
    },
    {
      title: "Kiểm tra & tư vấn miễn phí",
      desc: "Bắt đúng bệnh, báo đúng giá. Khách hàng có quyền từ chối sửa mà không phải trả bất kỳ khoản phí kiểm tra nào.",
    },
    {
      title: "Bảo hành dài hạn & Xuất VAT",
      desc: "Chế độ bảo hành từ 6 đến 36 tháng theo từng hạng mục, hỗ trợ xuất hóa đơn VAT đầy đủ cho khách doanh nghiệp.",
    },
  ],
} as const;
