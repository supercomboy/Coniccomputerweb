import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { PostForm } from "@/components/admin/PostForm";

export const dynamic = "force-dynamic";

export default async function AdminNewPostPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login/");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login/");

  return (
    <>
      <AdminHeader userEmail={user.email} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PostForm mode="create" />
      </div>
    </>
  );
}
