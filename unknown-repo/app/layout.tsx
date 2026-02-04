import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "مضيف | سوق خدمات الفنادق",
  description:
    "احجز خدمات الفنادق بسهولة: مطاعم، سبا، وأنشطة يومية مع عروض خاصة.",
  metadataBase: new URL("https://hotel-services.local"),
  openGraph: {
    title: "مضيف | سوق خدمات الفنادق",
    description:
      "منصة موحدة لحجز خدمات الفنادق في الخليج ومصر بواجهة عربية حديثة.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-sans antialiased`}>
        <AppProviders>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
