import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CartProvider } from "@/lib/cart";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://muuro.co"),
  title: {
    default: "MUURO. Your Visual Capital",
    template: "%s. MUURO",
  },
  description:
    "Limited art editions in Nielsen aluminium frames, with or without integrated light. The final accent your interior is missing.",
  openGraph: {
    title: "MUURO. Your Visual Capital",
    description:
      "Limited art editions in Nielsen aluminium frames, with or without integrated light.",
    url: "https://muuro.co",
    siteName: "MUURO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f4",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
