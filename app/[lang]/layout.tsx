import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans } from "next/font/google";
import "@/app/globals.css";
import { LangType } from "@/app/languages/_lang.types";
import { getLanguage } from "@/app/languages/_getLanguage";
import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/app/_providers/LangProvider";
import { SidebarProvider } from "@/app/_components/ui/sidebar";
import Navbar from "@/app/_components/layout/Navbar";

import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Goodman Book Crossing",
  description: "Share a book",
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "tc" }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: LangType }>;
}>) {
  const { lang } = await params;
  const langPack = await getLanguage(lang);

  return (
    <html lang={(await params).lang}>
      <body
        className={`${josefin.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <LanguageProvider lang={lang} langPack={langPack}>
            <SidebarProvider defaultOpen={false}>
              <Navbar />
              <main className="w-full mx-auto mt-12 md:mt-16">
                {children}
                <SpeedInsights />
              </main>
            </SidebarProvider>
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
