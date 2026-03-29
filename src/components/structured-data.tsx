import { getTranslations } from "next-intl/server";

type Props = { params: { locale: string } };

export async function StructuredData({ params }: Props) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "DataSync Pro",
    "description": t("description"),
    "url": `${baseUrl}/${locale}`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cross-platform",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free trial available"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DataSync Pro",
      "url": baseUrl
    },
    "featureList": [
      "Real-time SQLite synchronization",
      "Edge-to-cloud data streaming",
      "Industrial IoT integration",
      "Outbox pattern architecture",
      "Event-driven data processing"
    ],
    "screenshot": `${baseUrl}/og-image.jpg`,
    "sameAs": [
      // Add social media URLs if available
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}