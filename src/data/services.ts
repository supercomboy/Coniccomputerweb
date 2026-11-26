import { PricingItem } from "./pricing";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  bullets?: string[];
}

export interface ServiceData {
  slug: string;
  name: string;
  shortTitle: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  lead: string;
  heroImage?: string;
  heroImageAlt?: string;
  icon: "laptop" | "apple" | "cpu" | "disc" | "hard-drive" | "zap";
  symptomsTitle: string;
  symptoms: string[];
  supportedScope: string;
  features: ServiceFeature[];
  pricing: PricingItem[];
  faqs: ServiceFaq[];
}

export const SERVICES: ServiceData[] = [
  {
    slug: "sua-laptop",
    name: "Sửa Laptop",
    shortTitle: "Sửa Laptop Lấy Liền",
    seoTitle: "Sửa Laptop Uy Tín Lấy Ngay Bình Chánh & TP.HCM | Conic Computer",
    seoDescription:
      "Dịch vụ sửa laptop uy tín lấy liền tại Bình Chánh & TP.HCM. Sửa nguồn, mainboard, thay màn hình, pin, bàn phím, bản lề Dell, HP, Asus, Lenovo. Kiểm tra miễn phí. Hotline: 0973.535.854.",
    h1: "Dịch Vụ Sửa Laptop Uy Tín, Lấy Liền Tại Bình Chánh & TP.HCM",
    lead: "Conic Computer tiếp nhận kiểm tra và sửa chữa chuyên sâu tất cả các dòng laptop phổ thông, laptop văn phòng, laptop đồ họa Workstation và Gaming từ Dell, HP, Lenovo, Asus, Acer, MSI đến Microsoft Surface.",
    heroImage: "/images/services/sua-laptop-ve-sinh-mx4.webp",
    heroImageAlt: "Kỹ thuật viên Conic Computer vệ sinh laptop và tra keo tản nhiệt Arctic MX-4 / Honeywell",
    icon: "laptop",
    symptomsTitle: "Khi nào bạn nên mang laptop đi kiểm tra ngay?",
    symptoms: [
      "Laptop bấm nút nguồn không lên, đèn nguồn chớp tắt hoặc quạt quay nhưng không lên hình.",
      "Máy đang chạy tự sập nguồn, treo đơ hoặc phát ra mùi khét, nhiệt độ quá nóng.",
      "Màn hình laptop bị sọc ngang/dọc, bể mực, đốm sáng, nhấp nháy hoặc tối đen.",
      "Bàn phím bị liệt phím, chập phím nhảy chữ liên tục hoặc bị đổ nước.",
      "Pin laptop chai tụt nhanh, báo gạch chéo đỏ, phồng pin hoặc cắm sạc không vào.",
      "Gãy bản lề laptop, bung vỏ nhựa, khó đóng mở màn hình.",
      "Laptop không nhận Wi-Fi, không nhận cổng USB, loa rè hoặc mất tiếng.",
    ],
    supportedScope:
      "Hỗ trợ đầy đủ các thương hiệu: Dell (Inspiron, Vostro, Latitude, XPS, Precision), HP (Pavilion, ProBook, EliteBook, Envy), Lenovo (ThinkPad, IdeaPad, Legion), Asus (Vivobook, ZenBook, ROG, TUF), Acer, MSI, LG Gram, Microsoft Surface.",
    features: [
      {
        title: "1. Sửa nguồn & Mainboard Laptop chuyên sâu",
        description:
          "Đo đạc trực tiếp trên bo mạch chủ bằng thiết bị chuyên dụng và sơ đồ mạch (schematic) để xử lý tận gốc lỗi phần cứng:",
        bullets: [
          "Khắc phục lỗi mất nguồn, chập nguồn 3V/5V, hư IC nguồn, MOSFET, lỗi pin CMOS.",
          "Sửa lỗi không nhận sạc, không nhận pin, bật nguồn không xuất hình.",
          "Cứu laptop bị vô nước, oxy hóa mạch bằng quy trình sấy khô và làm sạch siêu âm.",
        ],
      },
      {
        title: "2. Thay màn hình Laptop sắc nét lấy ngay",
        description:
          "Thay thế màn hình chuẩn kích thước (13.3”, 14”, 15.6”, 17.3”), chuẩn độ phân giải HD, Full HD IPS, 2K/4K, tần số quét 60Hz – 144Hz lấy liền trong 30 phút.",
      },
      {
        title: "3. Thay pin & Bàn phím Laptop chính hãng",
        description:
          "Thay pin dung lượng chuẩn an toàn chống phồng, thay bàn phím có đèn LED/không LED cho mọi dòng máy; kiểm tra kỹ từng phím trước khi bàn giao.",
      },
      {
        title: "4. Sửa bản lề, gia cố vỏ & Vệ sinh tra keo MX-4 / Honeywell",
        description:
          "Hàn gia cố chân ốc bản lề chắc chắn như mới, vệ sinh sạch bụi quạt tản nhiệt và tra keo cao cấp Arctic MX-4 hoặc Honeywell giúp máy chạy êm, mát mẻ và tăng tuổi thọ CPU/GPU.",
      },
    ],
    pricing: [
      { service: "Vệ sinh Laptop & tra keo tản nhiệt Arctic MX-4 / Honeywell", price: "150.000đ – 200.000đ", warranty: "Hạ nhiệt rõ rệt" },
      { service: "Thay pin Laptop các dòng phổ thông & văn phòng", price: "450.000đ – 950.000đ", warranty: "6 – 12 tháng" },
      { service: "Thay bàn phím Laptop lấy liền", price: "350.000đ – 850.000đ", warranty: "6 – 12 tháng" },
      { service: "Thay màn hình Laptop (HD / FHD IPS)", price: "950.000đ – 2.200.000đ", warranty: "6 – 12 tháng" },
      { service: "Sửa gãy bản lề / Gia cố vỏ Laptop", price: "250.000đ – 450.000đ", warranty: "3 – 6 tháng" },
      { service: "Sửa nguồn / Sửa mainboard Laptop", price: "450.000đ – 1.200.000đ", warranty: "3 – 6 tháng" },
    ],
    faqs: [
      {
        question: "Kiểm tra lỗi laptop tại Conic Computer có mất phí không?",
        answer:
          "Hoàn toàn miễn phí 100%. Kỹ thuật viên sẽ kiểm tra, thông báo rõ nguyên nhân và báo giá trọn gói. Nếu bạn chưa muốn sửa ngay, bạn nhận lại máy mà không mất bất kỳ chi phí nào.",
      },
      {
        question: "Thay pin, bàn phím, màn hình laptop có lấy liền được không?",
        answer:
          "Có. Các hạng mục thay thế linh kiện như pin, bàn phím, màn hình, SSD, RAM và vệ sinh máy đều có thể chờ lấy liền sau 20 – 45 phút và quan sát trực tiếp quá trình thực hiện.",
      },
      {
        question: "Nếu máy lỗi mainboard cần giữ lại thì có đảm bảo không bị tráo linh kiện không?",
        answer:
          "Tại Conic Computer, khách hàng luôn được ký tên trực tiếp lên từng linh kiện quan trọng (màn hình, pin, RAM, SSD, mainboard) trước khi gửi máy. Chúng tôi cam kết minh bạch tuyệt đối.",
      },
    ],
  },
  {
    slug: "sua-macbook",
    name: "Sửa MacBook",
    shortTitle: "Sửa MacBook Chuyên Sâu",
    seoTitle: "Dịch Vụ Sửa MacBook Uy Tín Lấy Liền Tại TP.HCM | Conic Computer",
    seoDescription:
      "Conic Computer chuyên sửa MacBook Air, Pro Intel & Apple Silicon M1, M2, M3 lấy liền tại TP.HCM. Sửa nguồn, ép cáp màn hình Flexgate, thay pin, bàn phím chuẩn, bảo hành 6–12 tháng.",
    h1: "Dịch Vụ Sửa MacBook Chuyên Sâu, Lấy Liền Tại TP.HCM",
    lead: "Chuyên sửa chữa tất cả các dòng Apple MacBook Air và MacBook Pro (13”, 14”, 15”, 16”) từ các đời Intel đến thế hệ chip Apple Silicon mới nhất M1, M2, M3, M4 với quy trình đo mạch chuẩn xác.",
    heroImage: "/images/services/sua-laptop-ve-sinh-mx4.webp",
    heroImageAlt: "Dịch vụ sửa chữa MacBook chuyên sâu tại Conic Computer TP.HCM",
    icon: "apple",
    symptomsTitle: "Các lỗi MacBook thường gặp cần xử lý sớm",
    symptoms: [
      "MacBook không lên nguồn, mất nguồn đột ngột, bật không có tín hiệu sạc Type-C/MagSafe.",
      "Máy bị vô nước, đổ cà phê/nước ngọt lên bàn phím gây chập mạch.",
      "Màn hình bị sọc, đốm sáng, ám màu, mất đèn nền hoặc gập góc nhỏ bị tối (lỗi Flexgate).",
      "Pin MacBook báo Service Recommended, tụt pin nhanh hoặc phồng pin làm kênh Trackpad.",
      "Bàn phím cánh bướm (Butterfly) hoặc Magic Keyboard bị liệt, kẹt phím, gõ nhảy chữ.",
      "Trackpad Force Touch bị đơ, không nhấn được hoặc loa bị rè.",
      "MacBook chạy nóng, quạt hú to, giật lag khi dựng video hoặc mở nhiều tab.",
    ],
    supportedScope:
      "Tiếp nhận toàn bộ dòng máy: MacBook Air (2015 – 2025, M1/M2/M3/M4), MacBook Pro 13/14/15/16 inch (Intel & Apple Silicon M1/M2/M3/M4 Pro/Max).",
    features: [
      {
        title: "1. Sửa Mainboard MacBook chuyên sâu (Mất nguồn, Chạm mạch, Vô nước)",
        description:
          "Sử dụng sơ đồ schematic & boardview chuẩn xác để đo đạc và xử lý các pan bệnh phức tạp trên bo mạch Apple:",
        bullets: [
          "Xử lý chạm đường nguồn chính (PPBUS_G3H, 3V3_G3H, 5V_S5), lỗi IC sạc CD3215/CD3217.",
          "Hồi sinh MacBook vô nước, làm sạch oxy hóa bằng sóng siêu âm và thay thế linh kiện lỗi.",
          "Sửa lỗi không nhận cổng Thunderbolt/USB-C, không xuất được màn hình rời.",
        ],
      },
      {
        title: "2. Thay màn hình Retina & Ép cáp Flexgate tiết kiệm 60–70%",
        description:
          "Đối với các dòng MacBook Pro bị đứt cáp đèn nền khi đóng mở (lỗi ánh đèn sân khấu / mất đèn nền), Conic Computer nhận ép cáp màn hình mới giúp tiết kiệm lớn chi phí thay nguyên cụm.",
      },
      {
        title: "3. Thay pin MacBook lấy liền (30 – 45 phút)",
        description:
          "Pin mới chuẩn dung lượng, chu kỳ sạc 0 lần, an toàn chống phù vỏ, thay trực tiếp trước mặt khách và bảo hành 6 – 12 tháng 1 đổi 1.",
      },
      {
        title: "4. Thay bàn phím, Trackpad & Vệ sinh tra keo, cài macOS",
        description:
          "Khắc phục triệt để bàn phím liệt/kẹt phím, vệ sinh quạt hút tra keo tản nhiệt cao cấp và cài đặt macOS sạch mượt theo yêu cầu.",
      },
    ],
    pricing: [
      { service: "Vệ sinh MacBook & tra keo tản nhiệt MX-4 / Honeywell", price: "200.000đ – 350.000đ", warranty: "Bảo đảm mát máy" },
      { service: "Cài đặt macOS & phần mềm cơ bản", price: "150.000đ – 250.000đ", warranty: "Hỗ trợ kỹ thuật" },
      { service: "Thay pin MacBook Air / Pro lấy liền", price: "850.000đ – 1.850.000đ", warranty: "6 – 12 tháng" },
      { service: "Thay bàn phím MacBook", price: "650.000đ – 1.450.000đ", warranty: "6 – 12 tháng" },
      { service: "Ép cáp màn hình (Fix lỗi Flexgate)", price: "700.000đ – 1.200.000đ", warranty: "3 – 6 tháng" },
      { service: "Sửa nguồn / Chạm mainboard MacBook", price: "800.000đ – 2.200.000đ", warranty: "3 – 6 tháng" },
      { service: "Thay cụm màn hình Retina / Liquid Retina", price: "Báo giá theo model", warranty: "6 – 12 tháng" },
    ],
    faqs: [
      {
        question: "MacBook bị đổ nước vào cần xử lý khẩn cấp như thế nào?",
        answer:
          "Hãy tắt nguồn ngay, rút sạc, mở màn hình góc 90 độ rồi úp ngược máy hình chữ V lên khăn khô để nước không chảy xuống mainboard. Không sấy nóng, không cố mở lại nguồn và mang đến trung tâm càng sớm càng tốt.",
      },
      {
        question: "Sửa MacBook tại Conic Computer có bị mất dữ liệu không?",
        answer:
          "Các dịch vụ thay pin, màn hình, ép cáp, bàn phím, loa, trackpad hay sửa mạch nguồn không ảnh hưởng đến dữ liệu trên ổ SSD. Nếu lỗi liên quan trực tiếp đến chip lưu trữ trên main, kỹ thuật viên sẽ báo rõ trước khi làm.",
      },
    ],
  },
  {
    slug: "sua-linh-kien-pc",
    name: "Sửa PC & Linh Kiện",
    shortTitle: "Sửa PC & Linh Kiện Máy Tính",
    seoTitle: "Dịch Vụ Sửa PC, Máy Tính Để Bàn & Linh Kiện TP.HCM | Conic Computer",
    seoDescription:
      "Trung tâm sửa máy tính PC, sửa linh kiện máy tính để bàn tại Bình Chánh & TP.HCM. Khắc phục lỗi nguồn PSU, mainboard, card VGA, vệ sinh PC Gaming, nâng cấp SSD/RAM. Hotline: 0973.535.854.",
    h1: "Dịch Vụ Sửa Máy Tính PC & Linh Kiện Để Bàn Uy Tín TP.HCM",
    lead: "Giải pháp sửa chữa, bảo dưỡng và nâng cấp toàn diện cho mọi dàn máy tính để bàn: từ PC văn phòng, học tập đến PC Gaming hiệu năng cao và máy trạm Workstation đồ họa – kiến trúc.",
    heroImage: "/images/services/sua-laptop-ve-sinh-mx4.webp",
    heroImageAlt: "Dịch vụ sửa chữa máy tính PC và linh kiện để bàn tại Conic Computer",
    icon: "cpu",
    symptomsTitle: "Dấu hiệu dàn PC của bạn cần kiểm tra kỹ thuật",
    symptoms: [
      "Bấm nút nguồn thùng máy không phản hồi, quạt không quay hoặc quay giật rồi tắt.",
      "Quạt CPU/Case quay bình thường nhưng màn hình không lên hình (No Signal / No Display).",
      "PC kêu tiếng bíp liên hồi khi bật nguồn, tự restart hoặc sập nguồn khi chạy tác vụ nặng.",
      "Xuất hiện lỗi màn hình xanh chết chóc (BSOD), đứng máy khi chơi game hoặc render.",
      "Bộ nguồn máy tính (PSU) nổ tụ, bốc khói, có mùi khét hoặc rò điện ra vỏ case.",
      "Card màn hình (VGA) bị sọc hình, rác hình (artefacts), quạt VGA hú lớn hoặc không quay.",
    ],
    supportedScope:
      "Hỗ trợ toàn bộ linh kiện từ các hãng: Asus, Gigabyte, MSI, ASRock, Intel, AMD, NVIDIA, Corsair, Cooler Master, Kingston, Samsung, WD, Seagate...",
    features: [
      {
        title: "1. Sửa Bo mạch chủ (Mainboard PC) & Bộ nguồn (PSU)",
        description:
          "Đo đạc chính xác từng pha nguồn, khắc phục chạm chập đường 12V/5V/3.3V, nạp ROM BIOS, xử lý cong chân socket CPU, lỗi khe RAM và thay tụ nguồn/nguồn chuẩn 80 Plus.",
      },
      {
        title: "2. Sửa Card đồ họa (VGA / GPU) & Thay hệ thống tản nhiệt",
        description:
          "Khắc phục lỗi rác hình, sọc hình, không nhận driver VGA; thay quạt tản nhiệt, tra keo GPU và thay pad tản nhiệt cho VRAM giúp card chạy mát bền bỉ.",
      },
      {
        title: "3. Vệ sinh PC Gaming / Văn phòng & Đi dây gọn gàng",
        description:
          "Thổi sạch bụi bám trên bo mạch, quạt và lưới lọc; tra keo tản nhiệt cao cấp Arctic MX-4 / Honeywell giúp giảm ngay 10–20°C và tối ưu luồng khí đối lưu trong thùng case.",
      },
      {
        title: "4. Kiểm thử tải nặng (Stress Test) trước khi bàn giao",
        description:
          "Mọi dàn PC sau khi sửa chữa đều được kiểm tra độ ổn định nhiệt độ và điện áp qua FurMark / Cinebench để đảm bảo không tái phát lỗi.",
      },
    ],
    pricing: [
      { service: "Vệ sinh PC văn phòng & tra keo MX-4 / Honeywell", price: "150.000đ – 200.000đ", warranty: "Giảm nhiệt rõ rệt" },
      { service: "Vệ sinh PC Gaming / Workstation / Đi lại dây", price: "250.000đ – 400.000đ", warranty: "Tối ưu luồng gió" },
      { service: "Sửa nguồn máy tính (PSU)", price: "250.000đ – 450.000đ", warranty: "3 – 6 tháng" },
      { service: "Sửa bo mạch chủ Mainboard PC", price: "350.000đ – 750.000đ", warranty: "3 – 6 tháng" },
      { service: "Sửa mạch / Thay quạt / Tra keo Card VGA", price: "300.000đ – 800.000đ", warranty: "3 – 6 tháng" },
      { service: "Nâng cấp SSD / RAM PC đồng bộ", price: "350.000đ – 950.000đ", warranty: "36 tháng (1 đổi 1)" },
    ],
    faqs: [
      {
        question: "Mang PC đi sửa tôi có cần mang theo màn hình, phím, chuột không?",
        answer:
          "Bạn chỉ cần mang thùng máy tính (case CPU) đến cửa hàng. Tại Conic Computer đã có sẵn màn hình, dây nguồn và thiết bị test đầy đủ, trừ khi bạn nghi ngờ màn hình hoặc cáp bị lỗi.",
      },
      {
        question: "Máy tính bật quạt quay nhưng màn hình không lên là lỗi gì?",
        answer:
          "Thường do chân RAM bị oxy hóa tiếp xúc kém, lỏng cáp màn hình, lỗi card VGA rời hoặc bo mạch chủ mất nguồn nuôi CPU. Kỹ thuật viên sẽ dùng card test main để xác định chính xác trong vài phút.",
      },
    ],
  },
  {
    slug: "cai-win-phan-mem",
    name: "Cài Win & Phần Mềm",
    shortTitle: "Cài Win & Phần Mềm Lấy Ngay",
    seoTitle: "Dịch Vụ Cài Win Tại Nhà & Lấy Ngay Bình Chánh TP.HCM | Conic Computer",
    seoDescription:
      "Cài đặt Windows 10, Windows 11, macOS sạch nguyên bản, đầy đủ Driver, Office và phần mềm đồ họa tại Bình Chánh & TP.HCM. Nhanh gọn, không mất dữ liệu. Hotline: 0973.535.854.",
    h1: "Dịch Vụ Cài Đặt Windows, macOS & Phần Mềm Chuyên Nghiệp TP.HCM",
    lead: "Cài mới hệ điều hành Windows 10, Windows 11 hoặc macOS bản chuẩn sạch sẽ, tối ưu hiệu năng mượt mà, cài đầy đủ driver phần cứng và bộ ứng dụng văn phòng – đồ họa theo nhu cầu công việc.",
    heroImage: "/images/services/sua-laptop-ve-sinh-mx4.webp",
    heroImageAlt: "Dịch vụ cài đặt Windows và phần mềm máy tính tại Conic Computer",
    icon: "disc",
    symptomsTitle: "Khi nào máy tính của bạn cần cài lại Windows / macOS?",
    symptoms: [
      "Máy tính khởi động rất chậm, mở ứng dụng hay trình duyệt bị treo đơ liên tục.",
      "Hệ điều hành dính virus, quảng cáo rác, trình duyệt tự mở trang lạ.",
      "Laptop/PC thường xuyên báo lỗi màn hình xanh (BSOD) hoặc không cập nhật được Windows.",
      "Máy mới mua chưa cài hệ điều hành, thiếu driver âm thanh, Wi-Fi, touchpad hoặc card đồ họa.",
      "Cần cài trọn bộ phần mềm văn phòng, kế toán, thiết kế đồ họa, kiến trúc ổn định.",
    ],
    supportedScope:
      "Hỗ trợ cài đặt Windows 10, Windows 11 (Home/Pro), macOS (Monterey, Ventura, Sonoma, Sequoia), cài song song Windows cho MacBook (Bootcamp) và mọi phần mềm chuyên ngành.",
    features: [
      {
        title: "1. Cài đặt Windows 10 / Windows 11 nguyên bản sạch sẽ",
        description:
          "Sử dụng bộ cài gốc từ Microsoft (không dùng bản Ghost chứa phần mềm rác), tinh chỉnh tắt dịch vụ chạy ngầm giúp máy khởi động nhanh và hoạt động ổn định lâu dài.",
      },
      {
        title: "2. Cài đầy đủ Driver chính hãng theo từng model máy",
        description:
          "Đảm bảo 100% tính năng phần cứng hoạt động trơn tru: card đồ họa rời, Wi-Fi, Bluetooth, âm thanh, đèn bàn phím, phím chức năng Fn và cảm biến vân tay.",
      },
      {
        title: "3. Cài đặt trọn bộ ứng dụng văn phòng & đồ họa",
        description:
          "Hỗ trợ cài đặt Microsoft Office, Unikey, bộ font chữ tiếng Việt đầy đủ, phần mềm đọc PDF, giải nén, họp trực tuyến và các bộ công cụ thiết kế Adobe (Photoshop, Illustrator, Premiere), AutoCAD, SketchUp, 3Ds Max...",
      },
      {
        title: "4. An toàn dữ liệu tuyệt đối",
        description:
          "Kỹ thuật viên luôn kiểm tra và sao lưu dữ liệu quan trọng ở Desktop, Documents, Downloads trước khi tiến hành cài mới ổ đĩa hệ thống.",
      },
    ],
    pricing: [
      { service: "Cài Windows 10/11 + Full Driver + Phần mềm cơ bản", price: "150.000đ", warranty: "Hỗ trợ kỹ thuật" },
      { service: "Cài đặt macOS + Phần mềm cơ bản cho MacBook", price: "150.000đ – 250.000đ", warranty: "Hỗ trợ kỹ thuật" },
      { service: "Cài trọn bộ phần mềm đồ họa / kiến trúc (Adobe, CAD...)", price: "100.000đ – 200.000đ", warranty: "Ổn định, mượt mà" },
      { service: "Diệt virus, gỡ quảng cáo rác & tối ưu tốc độ Windows", price: "100.000đ – 150.000đ", warranty: "Không mất dữ liệu" },
    ],
    faqs: [
      {
        question: "Cài lại Windows có làm mất dữ liệu trong máy không?",
        answer:
          "Không. Dữ liệu nằm ở ổ D, E được giữ nguyên vẹn 100%. Riêng các tệp nằm ở màn hình Desktop hoặc thư mục Documents trên ổ C sẽ được kỹ thuật viên kiểm tra và chép lưu sang phân vùng an toàn trước khi cài.",
      },
      {
        question: "Thời gian cài Windows và phần mềm mất bao lâu?",
        answer:
          "Thông thường chỉ mất khoảng 30 – 45 phút với máy dùng ổ SSD. Khách hàng có thể ngồi chờ lấy máy ngay tại cửa hàng.",
      },
    ],
  },
  {
    slug: "cuu-du-lieu",
    name: "Cứu Dữ Liệu",
    shortTitle: "Cứu Dữ Liệu Ổ Cứng Bảo Mật",
    seoTitle: "Dịch Vụ Cứu Dữ Liệu Ổ Cứng HDD, SSD Uy Tín Bảo Mật | Conic Computer",
    seoDescription:
      "Cứu dữ liệu ổ cứng HDD, SSD, USB, thẻ nhớ bị xóa nhầm, format, bad sector, không nhận ổ tại TP.HCM. Kiểm tra miễn phí, cam kết bảo mật dữ liệu 100%. Hotline: 0973.535.854.",
    h1: "Dịch Vụ Cứu Dữ Liệu Ổ Cứng HDD, SSD Chuyên Nghiệp & Bảo Mật 100%",
    lead: "Hỗ trợ phục hồi dữ liệu quan trọng (tài liệu công ty, sổ sách kế toán, ảnh kỷ niệm, dự án thiết kế) trên ổ cứng HDD, SSD, ổ cứng di động và USB với quy trình nghiêm ngặt, bảo mật tuyệt đối.",
    heroImage: "/images/services/sua-laptop-ve-sinh-mx4.webp",
    heroImageAlt: "Dịch vụ cứu dữ liệu ổ cứng HDD SSD an toàn tại Conic Computer",
    icon: "hard-drive",
    symptomsTitle: "Các trường hợp mất dữ liệu cần ngừng ghi đè ngay lập tức",
    symptoms: [
      "Xóa nhầm tệp tin quan trọng (Shift + Delete) hoặc lỡ tay Format nhầm phân vùng ổ cứng.",
      "Cài lại Windows bị gộp ổ đĩa, mất phân vùng D/E chứa toàn bộ dữ liệu.",
      "Ổ cứng gắn vào máy báo RAW, đòi Format khi mở hoặc không hiển thị dung lượng.",
      "Ổ cứng HDD bị bad sector nặng, truy xuất rất chậm, treo Explorer hoặc phát tiếng kêu lạch cạch.",
      "Laptop/PC bị chết nguồn, hư mainboard cần trích xuất khẩn cấp dữ liệu ra ổ cứng ngoài.",
    ],
    supportedScope:
      "Tiếp nhận phục hồi trên mọi thiết bị lưu trữ: Ổ cứng HDD 2.5” / 3.5”, SSD SATA / M.2 NVMe, ổ cứng di động (WD, Seagate, Toshiba, Transcend, LaCie), USB và thẻ nhớ.",
    features: [
      {
        title: "1. Phục hồi dữ liệu xóa nhầm, Format, mất phân vùng",
        description:
          "Sử dụng phần mềm và thiết bị chuyên dụng quét sâu cấu trúc tệp tin (NTFS, FAT32, exFAT, APFS) để khôi phục nguyên vẹn thư mục và tên tệp gốc.",
      },
      {
        title: "2. Trích xuất dữ liệu ổ cứng Bad Sector & Máy chết main",
        description:
          "Tạo bản sao ảnh đĩa (sector-by-sector imaging) an toàn mà không ghi đè lên ổ gốc, giúp bảo toàn tối đa dữ liệu trên ổ cứng đang xuống cấp.",
      },
      {
        title: "3. Cam kết bảo mật dữ liệu tuyệt đối 100%",
        description:
          "Toàn bộ dữ liệu khách hàng được xử lý offline, không tải lên đám mây, khách hàng kiểm tra đúng tệp cần cứu mới thanh toán và xóa sạch bản tạm sau khi bàn giao.",
      },
    ],
    pricing: [
      { service: "Trích xuất dữ liệu từ máy hỏng nguồn / hỏng màn hình", price: "150.000đ – 250.000đ", warranty: "Lấy liền" },
      { service: "Cứu dữ liệu xóa nhầm, Format, mất phân vùng (lỗi logic)", price: "300.000đ – 700.000đ", warranty: "Có dữ liệu mới thu phí" },
      { service: "Cứu dữ liệu ổ cứng Bad Sector / lỗi Firmware", price: "700.000đ – 1.500.000đ", warranty: "Kiểm tra & báo giá trước" },
    ],
    faqs: [
      {
        question: "Khi vừa lỡ xóa nhầm hoặc format ổ cứng tôi nên làm gì?",
        answer:
          "Hãy ngừng ngay việc chép thêm dữ liệu mới, không cài phần mềm mới lên phân vùng vừa mất dữ liệu và không cố chạy các công cụ quét không rõ nguồn gốc để tránh ghi đè dữ liệu gốc.",
      },
      {
        question: "Nếu không cứu được dữ liệu tôi có phải trả tiền không?",
        answer:
          "Không. Bạn sẽ được xem trước danh sách tệp tin phục hồi được. Chỉ khi dữ liệu đúng yêu cầu và đọc được bình thường thì Conic Computer mới thu phí.",
      },
    ],
  },
  {
    slug: "nang-cap-may-tinh",
    name: "Nâng Cấp RAM & SSD",
    shortTitle: "Nâng Cấp RAM & SSD Lấy Liền",
    seoTitle: "Nâng Cấp RAM & SSD Laptop, PC Lấy Liền TP.HCM | Conic Computer",
    seoDescription:
      "Nâng cấp ổ cứng SSD NVMe/SATA và RAM DDR4/DDR5 cho Laptop, PC lấy liền tại Bình Chánh & TP.HCM. Tăng tốc máy gấp 5 lần, linh kiện chính hãng bảo hành 36 tháng. Hotline: 0973.535.854.",
    h1: "Dịch Vụ Nâng Cấp RAM & SSD Laptop, PC Lấy Liền – Tăng Tốc Gấp 5 Lần",
    lead: "Biến chiếc laptop hoặc máy tính bàn chạy chậm rì trở nên mượt mà chỉ sau 20 phút nâng cấp ổ cứng SSD tốc độ cao và RAM chuẩn bus chính hãng, bảo hành 1 đổi 1 lên đến 36 tháng.",
    heroImage: "/images/services/sua-laptop-ve-sinh-mx4.webp",
    heroImageAlt: "Dịch vụ nâng cấp RAM và ổ cứng SSD cho laptop PC tại Conic Computer",
    icon: "zap",
    symptomsTitle: "Dấu hiệu máy tính của bạn đang cần nâng cấp RAM & SSD",
    symptoms: [
      "Máy tính mất từ 1 – 3 phút mới vào được màn hình Windows, ổ đĩa thường xuyên báo 100% Disk.",
      "Mở khoảng 5 – 10 tab Chrome cùng Word/Excel là máy đứng khựng, giật lag.",
      "Ổ cứng C liên tục báo đỏ hết dung lượng, không thể lưu thêm tài liệu hoặc cập nhật phần mềm.",
      "Làm đồ họa Photoshop, Premiere, AutoCAD hoặc chơi game bị tràn RAM, giật khung hình.",
    ],
    supportedScope:
      "Tương thích mọi dòng Laptop & PC sử dụng ổ cứng 2.5” SATA III, M.2 SATA, M.2 NVMe PCIe Gen 3/Gen 4 và RAM DDR3L, DDR4, DDR5 bus 2400/2666/3200/4800/5600MHz.",
    features: [
      {
        title: "1. Nâng cấp ổ cứng SSD (SATA III & M.2 NVMe tốc độ cao)",
        description:
          "Thay thế ổ cứng cơ HDD cũ hoặc nâng cấp dung lượng từ 128GB lên 256GB / 512GB / 1TB giúp khởi động Windows chỉ trong 5 – 10 giây, mở ứng dụng tức thì.",
      },
      {
        title: "2. Nâng cấp RAM chuẩn Bus – Chạy Dual Channel mượt mà",
        description:
          "Tư vấn chọn đúng thế hệ RAM (DDR4/DDR5) và tốc độ bus tương thích hoàn hảo với mainboard để kích hoạt chế độ kênh đôi (Dual Channel), tối đa hóa hiệu năng đa nhiệm.",
      },
      {
        title: "3. Miễn phí công lắp đặt & Hỗ trợ chuyển dữ liệu / Cài Windows",
        description:
          "Hỗ trợ lắp Caddy Bay tận dụng ổ HDD cũ làm ổ chứa dữ liệu, chuyển hệ điều hành hoặc cài mới sạch sẽ và tặng kiểm tra vệ sinh bụi cơ bản khi nâng cấp.",
      },
    ],
    pricing: [
      { service: "Nâng cấp SSD 256GB (SATA III / M.2 NVMe chính hãng)", price: "450.000đ – 590.000đ", warranty: "36 tháng (1 đổi 1)" },
      { service: "Nâng cấp SSD 512GB (SATA III / M.2 NVMe chính hãng)", price: "790.000đ – 980.000đ", warranty: "36 tháng (1 đổi 1)" },
      { service: "Nâng cấp SSD 1TB M.2 NVMe tốc độ cao", price: "1.350.000đ – 1.750.000đ", warranty: "36 tháng (1 đổi 1)" },
      { service: "Nâng cấp RAM 8GB DDR4 (Laptop / PC)", price: "350.000đ – 490.000đ", warranty: "36 tháng (1 đổi 1)" },
      { service: "Nâng cấp RAM 16GB DDR4 / DDR5 (Laptop / PC)", price: "690.000đ – 1.150.000đ", warranty: "36 tháng (1 đổi 1)" },
    ],
    faqs: [
      {
        question: "Làm sao biết laptop của tôi còn khe trống để gắn thêm RAM hay SSD NVMe không?",
        answer:
          "Bạn chỉ cần nhắn tên model máy (ghi ở mặt đáy laptop) qua Zalo 0973.535.854, kỹ thuật viên Conic Computer sẽ tra thông số kỹ thuật và báo chính xác khả năng nâng cấp tối đa miễn phí.",
      },
      {
        question: "Nâng cấp SSD và RAM mất bao lâu?",
        answer:
          "Lắp đặt linh kiện chỉ mất khoảng 10 – 15 phút; nếu kèm cài lại Windows hoặc chép chuyển dữ liệu từ ổ cũ sang ổ mới thì tổng thời gian khoảng 30 – 45 phút, lấy máy ngay.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
