import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // Redirect các đường dẫn /en/* cũ về bản Tiếng Việt tương ứng
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/", destination: "/", permanent: true },
      { source: "/en/laptop-repair", destination: "/sua-laptop/", permanent: true },
      { source: "/en/laptop-repair/", destination: "/sua-laptop/", permanent: true },
      { source: "/en/about", destination: "/ve-chung-toi/", permanent: true },
      { source: "/en/about/", destination: "/ve-chung-toi/", permanent: true },
      { source: "/en/contact", destination: "/lien-he/", permanent: true },
      { source: "/en/contact/", destination: "/lien-he/", permanent: true },
      { source: "/en/careers", destination: "/tuyen-dung/", permanent: true },
      { source: "/en/careers/", destination: "/tuyen-dung/", permanent: true },
      { source: "/en/privacy-policy", destination: "/chinh-sach-bao-mat/", permanent: true },
      { source: "/en/privacy-policy/", destination: "/chinh-sach-bao-mat/", permanent: true },
      {
        source: "/en/ultimate-guide-to-on-page-seo-optimization",
        destination: "/why-did-microsoft-stop-deeply-integrating-copilot-into-windows-11/",
        permanent: true,
      },
      {
        source: "/en/ultimate-guide-to-on-page-seo-optimization/",
        destination: "/why-did-microsoft-stop-deeply-integrating-copilot-into-windows-11/",
        permanent: true,
      },
      // Redirect các đường dẫn 404 cũ của mục Tin tức công nghệ
      { source: "/vi", destination: "/", permanent: true },
      { source: "/vi/", destination: "/", permanent: true },
      { source: "/vi/tai-nguyen", destination: "/tai-nguyen/", permanent: true },
      { source: "/vi/tai-nguyen/", destination: "/tai-nguyen/", permanent: true },
      { source: "/tin-tuc-cong-nghe", destination: "/tai-nguyen/", permanent: true },
      { source: "/tin-tuc-cong-nghe/", destination: "/tai-nguyen/", permanent: true },
      { source: "/category/tin-tuc-cong-nghe", destination: "/tai-nguyen/", permanent: true },
      { source: "/category/tin-tuc-cong-nghe/", destination: "/tai-nguyen/", permanent: true },
      { source: "/vi/ve-chung-toi", destination: "/ve-chung-toi/", permanent: true },
      { source: "/vi/ve-chung-toi/", destination: "/ve-chung-toi/", permanent: true },
    ];
  },
};

export default nextConfig;
