import "../../scss/reset.scss";
import "../../scss/variables.scss";
import "../../scss/globals.scss";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import APIProvider from "@/context/api/APIProvider";
import Sprites from '@/components/Sprites/Sprites';
import Sidebar from "@/components/Sidebar/Sidebar";
import CPU from '@/components/CPU/CPU';

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

const satoshi = localFont({
  src: "../../fonts/satoshi/Satoshi-Variable.woff2",
  variable: "--font-family-main"
});
const clashdisplay = localFont({
  src: "../../fonts/clashdisplay/ClashDisplay-Variable.woff2",
  variable: "--font-family-heading"
});

const metadata: Metadata = {
  title: "Keepix",
  description: "Staking cryptocurrency at home has never been easier.",
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return ["en", "de"].map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages(locale);

  return (
    <html lang={locale}>
      <body className={satoshi.className + ' ' + clashdisplay.variable}>
        <APIProvider>
          <Sidebar />
          <main className="main">
            <CPU />
            <NextIntlClientProvider locale={locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </main>
        </APIProvider>
        <Sprites />
      </body>
    </html>
  );
}
