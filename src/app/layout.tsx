import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";
import { Toaster } from "sonner";

import { Montserrat } from "next/font/google";
import NetworkWarning from "@/app/networkingWarning/NetworkWarning";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-montserrat",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R School | Онлайн школа ОГЭ/ЕГЭ",
  description: "Онлайн-школа",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
      >
        <NetworkWarning />
        <Header />
        {children}
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "var(--chart-4)",
              color: "white",
              border: "none",
            },
          }}
        />
      </body>
    </html>
  );
}
