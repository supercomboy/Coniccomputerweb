import { createSupabasePublicClient } from "@/lib/supabase/server";
import {
  ALL_PRICING_GROUPS,
  AllPricingCategoryKey,
  PRICING_CATEGORIES,
  PricingCategory,
  PricingGroupMeta,
  PricingItem,
} from "@/data/pricing";
import { getServiceBySlug } from "@/data/services";

export { ALL_PRICING_GROUPS };
export type { AllPricingCategoryKey, PricingGroupMeta };

const SLUG_TO_KEY: Record<string, AllPricingCategoryKey> = {
  "sua-laptop": "laptop",
  "sua-macbook": "macbook",
  "sua-linh-kien-pc": "pc",
  "cai-win-phan-mem": "cai-win",
  "cuu-du-lieu": "cuu-du-lieu",
  "nang-cap-may-tinh": "nang-cap",
};

interface SupabasePricingRow {
  category_key: AllPricingCategoryKey;
  service_name: string;
  price: string;
  warranty: string;
  sort_order: number;
}

export function getFallbackPricingByKey(key: AllPricingCategoryKey): PricingItem[] {
  const homeCat = PRICING_CATEGORIES.find((c) => c.key === key);
  if (homeCat) return homeCat.items;

  const slug = Object.entries(SLUG_TO_KEY).find(([, k]) => k === key)?.[0];
  if (slug) {
    const svc = getServiceBySlug(slug);
    if (svc) return svc.pricing;
  }
  return [];
}

export async function getHomePricingCategories(): Promise<PricingCategory[]> {
  const supabase = createSupabasePublicClient();
  if (!supabase) return PRICING_CATEGORIES;

  try {
    const { data, error } = await supabase
      .from("pricing_items")
      .select("category_key, service_name, price, warranty, sort_order")
      .in("category_key", ["laptop", "macbook", "pc"])
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return PRICING_CATEGORIES;
    }

    const rows = data as SupabasePricingRow[];
    return PRICING_CATEGORIES.map((fallbackCat) => {
      const catRows = rows.filter((r) => r.category_key === fallbackCat.key);
      if (catRows.length === 0) return fallbackCat;
      return {
        ...fallbackCat,
        items: catRows.map((r) => ({
          service: r.service_name,
          price: r.price,
          warranty: r.warranty,
        })),
      };
    });
  } catch {
    return PRICING_CATEGORIES;
  }
}

export async function getServicePricingBySlug(slug: string): Promise<PricingItem[]> {
  const key = SLUG_TO_KEY[slug];
  if (!key) return [];

  const fallback = getFallbackPricingByKey(key);
  const supabase = createSupabasePublicClient();
  if (!supabase) return fallback;

  try {
    const { data, error } = await supabase
      .from("pricing_items")
      .select("category_key, service_name, price, warranty, sort_order")
      .eq("category_key", key)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallback;
    }

    return (data as SupabasePricingRow[]).map((r) => ({
      service: r.service_name,
      price: r.price,
      warranty: r.warranty,
    }));
  } catch {
    return fallback;
  }
}
