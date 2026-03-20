import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oswaldo Rosales | Software Engineer",
  description: "Full-stack software engineer specializing in scalable web applications and cloud infrastructure.",
  keywords: ["Software Engineer", "Full Stack Developer", "Next.js", "TypeScript", "Cloud Infrastructure"],
  authors: [{ name: "Oswaldo Rosales" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oswaldorosalesdev.com",
    siteName: "Oswaldo Rosales",
    title: "Oswaldo Rosales | Software Engineer",
    description: "Full-stack software engineer specializing in scalable web applications and cloud infrastructure.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oswaldo Rosales | Software Engineer",
    description: "Full-stack software engineer specializing in scalable web applications and cloud infrastructure.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
