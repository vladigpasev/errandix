import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import type { Viewport } from 'next'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Errandix",
  description: "Каквото поискаш, когато поискаш, където поискаш! Errandix предлага широка палитра от дейности на работещите хора със забързано ежедневие и ограничено свободно време.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="bg">
        <body className={inter.className}>
          {children}
        </body>
      </html>
  );
}
