import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản trị bài viết | Conic Computer",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-surface-muted">{children}</div>;
}
