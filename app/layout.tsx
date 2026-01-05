import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tema Mumtaza | Tech Entrepreneur",
  description: "Strategic builder and technical director.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth overflow-x-hidden">
      <body
        className={`${inter.variable} antialiased bg-background text-foreground selection:bg-white/20 selection:text-white overflow-x-hidden w-full`}
      >
        {children}
      </body>
    </html>
  );
}
