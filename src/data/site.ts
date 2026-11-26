export const SITE = {
  name: "Conic Computer",
  shortName: "Conic",
  domain: "https://coniccomputer.com",
  tagline: "Trung Tâm Sửa Chữa Laptop, MacBook & PC Uy Tín Tại Bình Chánh – TP.HCM",
  description:
    "Conic Computer chuyên sửa chữa Laptop, MacBook, PC lấy liền tại KDC Conic 13B, Bình Chánh & tận nơi TP.HCM. Kiểm tra miễn phí 100%, ký tên linh kiện minh bạch, bảo hành 6–36 tháng. Hotline/Zalo: 0973.535.854.",
  phoneDisplay: "0973.535.854",
  phoneHref: "tel:+84973535854",
  phoneRaw: "+84973535854",
  zaloHref: "https://zalo.me/0973535854",
  whatsappHref: "https://wa.link/ecoqdj",
  facebookHref: "https://www.facebook.com/profile.php?id=61588484714179",
  email: "icepham89@gmail.com",
  emailHref: "mailto:icepham89@gmail.com",
  address: "Block G15, Chung cư Conic, KDC Conic 13B, Nguyễn Văn Linh, Xã Phong Phú, Huyện Bình Chánh, TP.HCM",
  addressShort: "Block G15, KDC Conic 13B, Nguyễn Văn Linh, Bình Chánh, TP.HCM",
  workingHours: "08:00 – 20:00 (Thứ 2 – Chủ Nhật)",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=Conic%20Computer%20Chung%20cu%20Conic%2013B%20Nguyen%20Van%20Linh%20Binh%20Chanh%20TP%20HCM&t=&z=16&ie=UTF8&iwloc=&output=embed",
  mapDirectHref:
    "https://www.google.com/maps/search/?api=1&query=Conic+Computer+Chung+cu+Conic+13B+Nguyen+Van+Linh+Binh+Chanh+TP+HCM",
  crmHref: "https://coniccomputer-crm.onrender.com/",
  deviceTestHref: "https://supercomboy.github.io/mqhwtest/",
  logoSvg: "/images/logo/logo.png",
  logoPng: "/images/logo/logo.png",
  iconPng: "/images/logo/icon.png",
  experienceYears: "15+",
} as const;

export const NAV_SERVICES = [
  {
    label: "Sửa Laptop",
    href: "/sua-laptop/",
    shortDesc: "Sửa nguồn, main, thay màn hình, pin, phím lấy liền",
  },
  {
    label: "Sửa MacBook",
    href: "/sua-macbook/",
    shortDesc: "MacBook Air/Pro Intel & M1/M2/M3, ép cáp Flexgate",
  },
  {
    label: "Sửa PC & Linh Kiện",
    href: "/sua-linh-kien-pc/",
    shortDesc: "Sửa mainboard, VGA, nguồn PSU, vệ sinh case PC",
  },
  {
    label: "Cài Win & Phần Mềm",
    href: "/cai-win-phan-mem/",
    shortDesc: "Cài Windows 10/11, macOS, phần mềm văn phòng & đồ họa",
  },
  {
    label: "Cứu Dữ Liệu",
    href: "/cuu-du-lieu/",
    shortDesc: "Phục hồi dữ liệu ổ cứng HDD, SSD, USB an toàn bảo mật",
  },
  {
    label: "Nâng Cấp RAM & SSD",
    href: "/nang-cap-may-tinh/",
    shortDesc: "Nâng cấp SSD NVMe, RAM DDR4/DDR5 tăng tốc máy tức thì",
  },
] as const;

export const NAV_LINKS = [
  { label: "Device Test", href: SITE.deviceTestHref, external: true, openInNewTab: false },
  { label: "Thông Tin Khách Hàng", href: SITE.crmHref, external: true, openInNewTab: true },
  { label: "Tin tức", href: "/tai-nguyen/", external: false, openInNewTab: false },
  { label: "Về chúng tôi", href: "/ve-chung-toi/", external: false, openInNewTab: false },
  { label: "Liên hệ", href: "/lien-he/", external: false, openInNewTab: false },
] as const;
