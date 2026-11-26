import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

const SLUG = "cai-win-phan-mem";
const service = getServiceBySlug(SLUG);

export const metadata: Metadata = {
  title: service?.seoTitle,
  description: service?.seoDescription,
  alternates: { canonical: `/${SLUG}/` },
};

export default function CaiWinPage() {
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
