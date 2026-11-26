import { SITE } from "@/data/site";

export function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ComputerRepair",
    "@id": `${SITE.domain}/#localbusiness`,
    name: SITE.name,
    url: SITE.domain,
    logo: `${SITE.domain}${SITE.logoPng}`,
    image: `${SITE.domain}/images/services/sua-laptop-ve-sinh-mx4.webp`,
    description: SITE.description,
    telephone: SITE.phoneRaw,
    email: SITE.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Block G15, Chung cư Conic, KDC Conic 13B, Nguyễn Văn Linh, Xã Phong Phú",
      addressLocality: "Huyện Bình Chánh",
      addressRegion: "TP.HCM",
      addressCountry: "VN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
    ],
    sameAs: [SITE.facebookHref],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
