import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Together For Change`,
  description:
    "A nonprofit working with children, women, volunteers, and communities across Delhi, Jaipur, Gurgaon, and pan India.",
  openGraph: {
    title: `${siteConfig.name} | Together For Change`,
    description:
      "Donate, enquire, or volunteer with Companions in Action.",
    images: ["/photos/22-display.jpg"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="noise" />
      </body>
    </html>
  );
}
