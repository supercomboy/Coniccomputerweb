import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug } from "@/data/services";
import { ServicePageTemplate } from "@/components/ServicePageTemplate";

const SLUG = "nang-cap-may-tinh";
const service = getServiceBySlug(SLUG);

export const metadata: Metadata = {
  title: service?.seoTitle,
  description: service?.seoDescription,
  alternates: { canonical: `/${SLUG}/` },
};

export default function NangCapMayTinhPage() {
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
