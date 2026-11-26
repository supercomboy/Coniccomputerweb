import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { LocalBusinessJsonLd } from "@/components/JsonLd";
import { SITE } from "@/data/site";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "Sửa Laptop, MacBook, PC Uy Tín Lấy Liền TP.HCM | Conic Computer",
    template: "%s",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE.domain,
    siteName: SITE.name,
    title: "Sửa Laptop, MacBook, PC Uy Tín Lấy Liền TP.HCM | Conic Computer",
    description: SITE.description,
    images: [
      {
        url: "/images/services/sua-laptop-ve-sinh-mx4.webp",
        width: 1024,
        height: 768,
        alt: "Conic Computer - Trung tâm sửa chữa Laptop, MacBook và PC tại TP.HCM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sửa Laptop, MacBook, PC Uy Tín Lấy Liền TP.HCM | Conic Computer",
    description: SITE.description,
  },
  icons: {
    icon: SITE.iconPng,
    shortcut: SITE.iconPng,
    apple: SITE.iconPng,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-surface text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white"
        >
          Chuyển đến nội dung chính
        </a>
        <LocalBusinessJsonLd />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
