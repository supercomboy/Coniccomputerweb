export type PricingCategoryKey = "laptop" | "macbook" | "pc";

export interface PricingItem {
  service: string;
  price: string;
  warranty: string;
  note?: string;
}

export interface PricingCategory {
  key: PricingCategoryKey;
  label: string;
  href: string;
  items: PricingItem[];
}

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    key: "laptop",
    label: "Sửa Laptop",
    href: "/sua-laptop/",
    items: [
      { service: "Vệ sinh Laptop & tra keo tản nhiệt Arctic MX-4 / Honeywell", price: "150.000đ – 200.000đ", warranty: "Hạ nhiệt rõ rệt" },
      { service: "Cài đặt Windows 10/11 + Driver + Phần mềm cơ bản", price: "150.000đ – 200.000đ", warranty: "Hỗ trợ kỹ thuật" },
      { service: "Thay pin Laptop (Dell, HP, Asus, Lenovo, Acer...)", price: "450.000đ – 950.000đ", warranty: "6 – 12 tháng" },
      { service: "Thay bàn phím Laptop lấy liền", price: "350.000đ – 850.000đ", warranty: "6 – 12 tháng" },
      { service: "Thay màn hình Laptop (HD / Full HD / IPS)", price: "950.000đ – 2.200.000đ", warranty: "6 – 12 tháng" },
      { service: "Sửa bản lề, gia cố vỏ Laptop bị gãy", price: "250.000đ – 450.000đ", warranty: "3 – 6 tháng" },
      { service: "Sửa nguồn / Sửa mainboard Laptop chuyên sâu", price: "450.000đ – 1.200.000đ", warranty: "3 – 6 tháng" },
      { service: "Nâng cấp SSD 256GB / 512GB NVMe & SATA", price: "450.000đ – 950.000đ", warranty: "36 tháng (1 đổi 1)" },
    ],
  },
  {
    key: "macbook",
    label: "Sửa MacBook",
    href: "/sua-macbook/",
    items: [
      { service: "Vệ sinh MacBook & tra keo tản nhiệt MX-4 / Honeywell", price: "200.000đ – 350.000đ", warranty: "Bảo đảm mát máy" },
      { service: "Cài đặt macOS (Sonoma, Sequoia...) & phần mềm", price: "150.000đ – 250.000đ", warranty: "Hỗ trợ kỹ thuật" },
      { service: "Thay pin MacBook Air / Pro lấy liền (30–45 phút)", price: "850.000đ – 1.850.000đ", warranty: "6 – 12 tháng" },
      { service: "Thay bàn phím MacBook (Butterfly / Magic Keyboard)", price: "650.000đ – 1.450.000đ", warranty: "6 – 12 tháng" },
      { service: "Ép cáp màn hình MacBook (Fix lỗi Flexgate)", price: "700.000đ – 1.200.000đ", warranty: "3 – 6 tháng" },
      { service: "Sửa nguồn, chạm mainboard, cứu máy vô nước", price: "800.000đ – 2.200.000đ", warranty: "3 – 6 tháng" },
      { service: "Thay cụm màn hình Retina / Liquid Retina", price: "Báo giá theo đời máy", warranty: "6 – 12 tháng" },
    ],
  },
  {
    key: "pc",
    label: "Sửa PC & Nâng Cấp",
    href: "/sua-linh-kien-pc/",
    items: [
      { service: "Vệ sinh PC văn phòng & tra keo tản nhiệt MX-4 / Honeywell", price: "150.000đ – 200.000đ", warranty: "Giảm 10–20°C" },
      { service: "Vệ sinh PC Gaming / Workstation / Đi lại dây gọn", price: "250.000đ – 400.000đ", warranty: "Tối ưu luồng gió" },
      { service: "Sửa bộ nguồn máy tính (PSU) / Kiểm tra sụt áp", price: "250.000đ – 450.000đ", warranty: "3 – 6 tháng" },
      { service: "Sửa bo mạch chủ Mainboard PC (mất nguồn, BIOS)", price: "350.000đ – 750.000đ", warranty: "3 – 6 tháng" },
      { service: "Sửa mạch / Thay quạt / Tra keo & pad Card VGA", price: "300.000đ – 800.000đ", warranty: "3 – 6 tháng" },
      { service: "Nâng cấp RAM DDR4 / DDR5 (8GB / 16GB)", price: "350.000đ – 950.000đ", warranty: "36 tháng (1 đổi 1)" },
      { service: "Cứu dữ liệu ổ cứng HDD / SSD bị xóa nhầm, lỗi nhận", price: "300.000đ – 1.500.000đ", warranty: "Bảo mật 100%" },
    ],
  },
];
