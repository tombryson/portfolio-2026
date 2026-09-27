import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tombryson.com"),
  title: "Tom Bryson — Software Engineer",
  description:
    "Software engineer in Melbourne. Full-stack applications, investment analysis, and language-learning projects by Tom Bryson.",
  openGraph: {
    title: "Tom Bryson — Software Engineer",
    description:
      "Software engineer in Melbourne. Full-stack applications, investment analysis, and language-learning projects by Tom Bryson.",
    url: "https://www.tombryson.com",
    siteName: "Tom Bryson",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@tombryson",
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
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
