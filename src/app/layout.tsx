import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salaj Kumbhare | Economics & Data Science | Wealth Management & Investment Banking",
  description: "Professional portfolio of Salaj Kumbhare, an Economics and Data Science B.S. candidate at Rutgers University. Experienced in corporate financial reporting, workflow optimization, and quantitative analytics.",
  keywords: [
    "Salaj Kumbhare",
    "Economics",
    "Data Science",
    "Rutgers",
    "Wealth Management",
    "Investment Banking",
    "Equity Research",
    "Financial Analysis",
    "Workflow Optimization",
    "Excel Modeling",
    "Python Data Analysis"
  ],
  authors: [{ name: "Salaj Kumbhare" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
