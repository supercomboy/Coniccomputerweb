import { notFound, redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostForm } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login/");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login/");

  const { data: post } = await supabase.from("posts").select("*").eq("id", id).maybeSingle();
  if (!post) notFound();

  return (
    <>
      <AdminHeader userEmail={user.email} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PostForm
          mode="edit"
          initialData={{
            id: post.id,
            title: post.title ?? "",
            slug: post.slug ?? "",
            seo_title: post.seo_title ?? "",
            description: post.description ?? "",
            content: post.content ?? "",
            category: post.category ?? "Tin tức công nghệ",
            image: post.image ?? "/images/services/sua-laptop-ve-sinh-mx4.webp",
            image_alt: post.image_alt ?? "",
            reading_time: post.reading_time ?? "",
            status: post.status === "published" ? "published" : "draft",
            published_at: post.published_at ?? new Date().toISOString(),
          }}
        />
      </div>
    </>
  );
}
