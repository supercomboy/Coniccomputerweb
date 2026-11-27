import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { EditablePricingRow, PricingManager } from "@/components/admin/PricingManager";
import {
  ALL_PRICING_GROUPS,
  AllPricingCategoryKey,
  getFallbackPricingByKey,
} from "@/lib/pricing";

export const dynamic = "force-dynamic";

export default async function AdminPricingPage() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login/");

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login/");

  const { data, error } = await supabase
    .from("pricing_items")
    .select("id, category_key, service_name, price, warranty, sort_order")
    .order("sort_order", { ascending: true });

  const tableReady = !error;
  const initialData = {} as Record<AllPricingCategoryKey, EditablePricingRow[]>;

  for (const group of ALL_PRICING_GROUPS) {
    const dbRows = (data ?? []).filter((r) => r.category_key === group.key);
    if (dbRows.length > 0) {
      initialData[group.key] = dbRows.map((r) => ({
        localId: String(r.id),
        service_name: String(r.service_name),
        price: String(r.price),
        warranty: String(r.warranty ?? ""),
      }));
    } else {
      initialData[group.key] = getFallbackPricingByKey(group.key).map((item, idx) => ({
        localId: `fallback-${group.key}-${idx}`,
        service_name: item.service,
        price: item.price,
        warranty: item.warranty,
      }));
    }
  }

  return (
    <>
      <AdminHeader userEmail={user.email} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PricingManager initialData={initialData} tableReady={tableReady} />
      </div>
    </>
  );
}
