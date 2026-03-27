import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oswaldorosalesdev.com"),
  title: {
    default: "Oswaldo Rosales | Backend Software Engineer",
    template: "%s | Oswaldo Rosales",
  },
  description:
    "Backend Software Engineer with 9+ years building scalable APIs and microservices. Experienced with Java, Spring Boot, and event-driven architecture. Focused on modernizing legacy systems and building reliable distributed systems.",
  keywords: [
    "Backend Software Engineer",
    "Backend Developer",
    "Java Developer",
    "Spring Boot",
    "Microservices",
    "REST APIs",
    "Event-Driven Architecture",
    "Guadalajara",
    "Mexico",
    "TypeScript",
    "React",
  ],
  authors: [{ name: "Oswaldo Rosales", url: "https://oswaldorosalesdev.com" }],
  creator: "Oswaldo Rosales",
  publisher: "Oswaldo Rosales",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oswaldorosalesdev.com",
    siteName: "Oswaldo Rosales - Backend Software Engineer",
    title: "Oswaldo Rosales | Backend Software Engineer",
    description:
      "Backend Software Engineer with 9+ years building scalable APIs and microservices. Experienced with Java, Spring Boot, and event-driven architecture. Focused on modernizing legacy systems and building reliable distributed systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oswaldo Rosales - Backend Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oswaldo Rosales | Backend Software Engineer",
    description:
      "Backend Software Engineer with 9+ years building scalable APIs and microservices. Experienced with Java, Spring Boot, and event-driven architecture. Focused on modernizing legacy systems and building reliable distributed systems.",
    creator: "@OswaldoRosalesA",
    images: ["/og-image.png"],
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
  alternates: {
    canonical: "https://oswaldorosalesdev.com",
  },
  verification: {
    // Add when you set up Google Search Console
    // google: "your-google-verification-code",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Oswaldo Rosales",
              url: "https://oswaldorosalesdev.com",
              image: "https://oswaldorosalesdev.com/images/profile.avif",
              jobTitle: "Backend Software Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Avenue Code",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Guadalajara",
                addressRegion: "Jalisco",
                addressCountry: "Mexico",
              },
              sameAs: [
                "https://github.com/oswaldorosales",
                "https://www.linkedin.com/in/oswaldo-rosales/",
                "https://twitter.com/OswaldoRosalesA",
              ],
              knowsAbout: [
                "Software Engineering",
                "Java",
                "Spring Boot",
                "Microservices",
                "Event-Driven Architecture",
                "TypeScript",
                "React",
                "Next.js",
                "Cloud Infrastructure",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
