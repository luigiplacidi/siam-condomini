import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AnimatedBackground } from "@/components/animated-background";
import { CookieBanner } from "@/components/cookies/cookie-banner";
import { CookieControlledScripts } from "@/components/cookies/cookie-controlled-scripts";
import { FloatingContactWidget } from "@/components/floating-contact-widget";
import { ModalProvider } from "@/components/modal/modal-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "SIAM Condomini | Amministratori di condomini a L'Aquila",
  description:
    "Amministrazione condominiale a L'Aquila con gestione professionale, trasparente e supporto rapido.",
  keywords: [
    "amministratori di condominio L'Aquila",
    "amministrazione condominiale L'Aquila",
    "gestione condomini L'Aquila",
    "amministratore condominio L'Aquila"
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} font-sans antialiased`}>
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
