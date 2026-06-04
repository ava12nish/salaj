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
  title: "Salaj Kumbhare | Systems Engineer & FinTech Architecture",
  description: "Professional portfolio of Salaj Kumbhare, a Software Engineer specializing in low-latency systems, distributed database linearizability, and high-throughput financial data pipelines.",
  keywords: [
    "Salaj Kumbhare",
    "Software Engineer",
    "Financial Technology",
    "FinTech",
    "Software Developer",
    "Data Engineering",
    "Cloud Engineering",
    "Low Latency",
    "C++",
    "Go",
    "Java",
    "Raft",
    "LMAX Disruptor",
    "Distributed Systems"
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
