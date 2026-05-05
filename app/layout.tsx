import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AnimatedBackground } from "@/components/animated-background";
import { CookieBanner } from "@/components/cookies/cookie-banner";
import { CookieControlledScripts } from "@/components/cookies/cookie-controlled-scripts";
import { FloatingContactWidget } from "@/components/floating-contact-widget";
import { ModalProvider } from "@/components/modal/modal-provider";
import { StructuredData } from "@/components/seo/structured-data";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { brand, contactInfo } from "@/lib/site-content";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "SIAM Condomini | Amministratori di condomini a L'Aquila",
  description:
    "Amministrazione condominiale a L'Aquila con gestione professionale, trasparente e supporto rapido.",
  keywords: [
    "amministratori di condominio L'Aquila",
    "amministrazione condominiale L'Aquila",
    "gestione condomini L'Aquila",
    "amministratore condominio L'Aquila"
  ],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    title: "SIAM Condomini | Amministratori di condomini a L'Aquila",
    description:
      "Amministrazione condominiale a L'Aquila con gestione professionale, trasparente e supporto rapido.",
    siteName: "SIAM Condomini",
    images: [{ url: `${siteUrl}/images/brand/logo-siam.png`, width: 112, height: 42, alt: "SIAM Condomini" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "SIAM Condomini | Amministratori di condomini a L'Aquila",
    description:
      "Amministrazione condominiale a L'Aquila con gestione professionale, trasparente e supporto rapido.",
    images: [`${siteUrl}/images/brand/logo-siam.png`]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} font-sans antialiased`}>
        <StructuredData
          data={[
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}/#website`,
              name: brand.name,
              url: siteUrl,
              description: brand.subheadline,
              inLanguage: "it-IT"
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": `${siteUrl}/#localbusiness`,
              name: brand.name,
              url: siteUrl,
              image: `${siteUrl}/images/brand/logo-siam.png`,
              telephone: contactInfo.phone,
              email: contactInfo.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: contactInfo.address,
                addressLocality: "L'Aquila",
                addressCountry: "IT"
              },
              areaServed: {
                "@type": "City",
                name: "L'Aquila"
              }
            }
          ]}
        />
        <AnimatedBackground />
        <div className="relative z-10">
          <ModalProvider>
            <CookieControlledScripts />
            <SiteHeader />
            <main>{children}</main>
            <FloatingContactWidget />
            <SiteFooter />
            <CookieBanner />
          </ModalProvider>
        </div>
      </body>
    </html>
  );
}
