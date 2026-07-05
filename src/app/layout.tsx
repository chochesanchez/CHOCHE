import type { Metadata, Viewport } from "next";
import { Tinos } from "next/font/google";
import "./globals.css";

// Self-hosted at build time; the serif fallback when Times New Roman is absent.
const tinos = Tinos({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-tinos",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://choche.dev"),
  title: {
    default: "CHOCHE — designer & developer",
    template: "%s · CHOCHE",
  },
  description:
    "José Manuel Sánchez Pérez — CHOCHE. Developer and designer from Monterrey, Mexico, building apps and web platforms obsessed with simplicity. created by CHOCHE.",
  keywords: [
    "CHOCHE",
    "José Manuel Sánchez Pérez",
    "developer",
    "designer",
    "portfolio",
    "iOS",
    "SwiftUI",
    "Next.js",
    "Monterrey",
  ],
  authors: [{ name: "José Manuel Sánchez Pérez" }],
  creator: "CHOCHE",
  openGraph: {
    title: "CHOCHE — designer & developer",
    description: "The site is the proof of work. created by CHOCHE.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={tinos.variable}>
      <body>{children}</body>
    </html>
  );
}
