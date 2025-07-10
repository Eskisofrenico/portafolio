import type { Metadata } from "next";
import { Inter, Playfair_Display, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Creative Studio - Portfolio Premium",
  description: "Experiencias digitales de ultra lujo. Transformamos ideas en arte interactivo.",
  keywords: ["diseño web", "desarrollo", "experiencias digitales", "portfolio", "creative studio"],
  authors: [{ name: "Creative Studio" }],
  creator: "Creative Studio",
  openGraph: {
    title: "Creative Studio - Portfolio Premium",
    description: "Experiencias digitales de ultra lujo. Transformamos ideas en arte interactivo.",
    url: "https://creativestudio.com",
    siteName: "Creative Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Creative Studio Portfolio",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Studio - Portfolio Premium",
    description: "Experiencias digitales de ultra lujo. Transformamos ideas en arte interactivo.",
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${bebas.variable} antialiased noise-texture`}
      >
        {children}
      </body>
    </html>
  );
}
