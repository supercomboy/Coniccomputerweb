import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { getServicePricingBySlug } from "@/lib/pricing";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export const revalidate = 60;

const SLUG = "sua-laptop";
const service = getServiceBySlug(SLUG);

export const metadata: Metadata = {
  title: service?.seoTitle,
  description: service?.seoDescription,
  alternates: { canonical: `/${SLUG}/` },
};

export default async function SuaLaptopPage() {
  if (!service) notFound();
  const pricing = await getServicePricingBySlug(SLUG);
  return <ServicePageTemplate service={service} pricing={pricing} />;
}
