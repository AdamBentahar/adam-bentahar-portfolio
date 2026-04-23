import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Adam Bentahar — Data & Business Industrial Engineer",
  description:
    "Portfolio of Adam Bentahar — an Industrial Engineering student specializing in Business & Data Management. Expert in Python, Power BI, data automation, and AI-driven business intelligence.",
  keywords: [
    "Adam Bentahar",
    "Industrial Engineering",
    "Data Management",
    "Python",
    "Power BI",
    "Business Intelligence",
    "Data Analysis",
    "Morocco",
    "ESITH",
  ],
  authors: [{ name: "Adam Bentahar" }],
  openGraph: {
    title: "Adam Bentahar — Data & Business Industrial Engineer",
    description:
      "Data-driven Industrial Engineering student leveraging AI, automation, and business intelligence to optimize processes.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adam Bentahar — Data & Business Industrial Engineer",
    description:
      "Data-driven Industrial Engineering student leveraging AI, automation, and business intelligence.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
