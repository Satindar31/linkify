import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Linkify",
  description: "Shorten Links Quickly",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://linkify-shortner.vercel.app",
    title: "Linkify",
    description: "Shorten Links Quickly",
    images: [
      {
        url: "https://linkify-shortner.vercel.app/api/og",
        width: 1200,
        height: 630,
        alt: "Linkify",
      },
    ],
  },
  twitter: {
    creator: "@satindar31",
    card: "summary_large_image",
    site: "https://linkify-shortner.vercel.app",
    images: [
      {
        url: "https://linkify-shortner.vercel.app/api/og",
        width: 1200,
        height: 630,
        alt: "Linkify",
      },
    ],
    description: "Shorten Links Quickly - Linkify",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en_IN" className={`dark text-foreground bg-background ${inter.className}`}>
        <body className="pl-5">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
