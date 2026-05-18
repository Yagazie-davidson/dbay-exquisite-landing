import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "D'BAY-Exquisite | US Shopping & Shipping to Nigeria",
  description:
    "Send a US store link. We vet sellers, quote in Naira, ship internationally, and deliver across Nigeria.",
  openGraph: {
    title: "D'BAY-Exquisite | US Shopping & Shipping to Nigeria",
    description:
      "Send a US store link. We vet, quote in Naira, ship, and deliver across Nigeria.",
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    title: "D'BAY-Exquisite",
    description:
      "US shopping & shipping to Nigeria. Message us on X with your product link.",
    site: "@dbayexquisite",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${ibmPlex.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-body antialiased grain">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
