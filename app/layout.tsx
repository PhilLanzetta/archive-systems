import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const garamond = localFont({
  src: "./fonts/AGaramondPro-Regular.otf",
  variable: "--font-wordmark",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Archive Systems — Digital Infrastructure for Cultural Institutions",
  description:
    "We design and build digital infrastructure for museums, galleries, and cultural institutions. An initiative by Pacific.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={garamond.variable}>
      <body>{children}</body>
    </html>
  );
}
