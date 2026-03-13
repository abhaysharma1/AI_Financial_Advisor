import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Financial Advisor",
  description: "A premium, human-centered AI financial assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} antialiased bg-gray-950 text-gray-100 font-sans min-h-screen selection:bg-emerald-500/30 selection:text-emerald-100`}
      >
        {children}
      </body>
    </html>
  );
}
