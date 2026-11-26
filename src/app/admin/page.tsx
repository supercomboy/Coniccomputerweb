import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminPostsTable, AdminPostRow } from "@/components/admin/AdminPostsTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login/");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login/");

  const { data } = await supabase
    .from("posts")
    .select("id, slug, title, category, status, published_at, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <>
      <AdminHeader userEmail={user.email} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdminPostsTable initialPosts={(data as AdminPostRow[]) ?? []} />
      </div>
    </>
  );
}
