const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "sua-laptop",
  "sua-macbook",
  "sua-linh-kien-pc",
  "cai-win-phan-mem",
  "cuu-du-lieu",
  "nang-cap-may-tinh",
  "ve-chung-toi",
  "lien-he",
  "tuyen-dung",
  "chinh-sach-bao-mat",
  "tai-nguyen",
  "sitemap.xml",
  "robots.txt",
  "en",
  "vi",
]);

export function slugifyVietnamese(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug.toLowerCase());
}

export function estimateReadingTime(htmlOrText: string): string {
  const plain = htmlOrText.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const words = plain ? plain.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / 220));
  return `${minutes} phút đọc`;
}
