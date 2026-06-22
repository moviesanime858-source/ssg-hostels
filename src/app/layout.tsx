import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "SSG HOSTELS | Sri Siva Ganesh Boys Hostel",
    template: "%s | SSG HOSTELS",
  },
  description:
    "SSG HOSTELS - Premium student accommodation and PG near VIT-AP. Discover safe, comfortable, and affordable hostel buildings with daily transport.",
  keywords: ["SSG Hostels", "Sri Siva Ganesh Boys Hostel", "PG near VIT-AP", "student accommodation"],
  openGraph: {
    title: "SSG HOSTELS | Sri Siva Ganesh Boys Hostel",
    description: "Premium student accommodation and PG near VIT-AP.",
    siteName: "SSG HOSTELS",
  },
  twitter: {
    card: "summary_large_image",
    title: "SSG HOSTELS | Sri Siva Ganesh Boys Hostel",
    description: "Premium student accommodation and PG near VIT-AP.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
