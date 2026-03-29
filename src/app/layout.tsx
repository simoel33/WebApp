import type { Metadata } from "next";
import { Inter, Noto_Sans_Arabic, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/cn";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoAr = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-ar",
  display: "swap",
});

const notoZh = Noto_Sans_SC({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-zh",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "DataSync Pro",
    template: "%s | DataSync Pro",
  },
  description:
    "Real-time SQLite synchronization from industrial edge to cloud.",
  keywords: [
    "SQLite synchronization",
    "edge computing",
    "industrial IoT",
    "data sync",
    "real-time sync",
    "cloud database",
    "PLC data",
    "edge gateway",
    "outbox pattern",
    "data streaming"
  ],
  authors: [{ name: "DataSync Pro Team" }],
  creator: "DataSync Pro",
  publisher: "DataSync Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "DataSync Pro — Real-time edge-to-cloud SQLite sync",
    description: "Synchronize local SQLite databases from industrial machines and edge systems to the cloud with an event-driven outbox architecture.",
    siteName: "DataSync Pro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DataSync Pro - Edge SQLite Synchronization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DataSync Pro — Real-time edge-to-cloud SQLite sync",
    description: "Synchronize local SQLite databases from industrial machines and edge systems to the cloud.",
    images: ["/og-image.jpg"],
    creator: "@datasyncpro",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
    yandex: process.env.YANDEX_VERIFICATION || "",
    other: {
      "msvalidate.01": process.env.BING_VERIFICATION || "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          notoAr.variable,
          notoZh.variable,
          "min-h-screen scroll-smooth bg-background font-sans text-foreground antialiased",
        )}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
