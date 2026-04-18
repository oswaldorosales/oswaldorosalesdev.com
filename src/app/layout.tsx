import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
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
    "Backend Software Engineer with 9+ years of experience building scalable APIs and microservices with Java and Spring Boot. Available for US contracts through Speed of Bytes, Inc — US-registered entity, able to invoice US companies directly in USD.",
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
    "US Contractor",
    "Backend Contractor",
    "Java Contractor",
    "Speed of Bytes Inc",
    "US Invoice",
    "US Entity",
    "Available for US Contracts",
    "Independent Contractor US",
    "W-9 Ready",
    "Backend Engineer US Contract",
    "Freelance Backend Engineer US",
    "Freelance Java Developer US",
    "Freelance Software Engineer US",
    "Freelancer Mexico",
    "Profesional Independiente Mexico",
    "Ingeniero Backend Mexico",
    "Desarrollador Java Mexico",
    "Factura CFDI",
    "Factura electronica desarrollador",
    "Servicios de software Mexico",
    "Consultor backend Mexico",
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
      "Backend Software Engineer with 9+ years of experience building scalable APIs and microservices with Java and Spring Boot. Available for US contracts through Speed of Bytes, Inc — US-registered entity, able to invoice US companies directly in USD.",
    images: [
      {
        url: "/og-image.png",
        width: 1536,
        height: 1024,
        alt: "Oswaldo Rosales - Backend Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oswaldo Rosales | Backend Software Engineer",
    description:
      "Backend Software Engineer with 9+ years of experience building scalable APIs and microservices with Java and Spring Boot. Available for US contracts through Speed of Bytes, Inc — US-registered entity, able to invoice US companies directly in USD.",
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
  manifest: "/manifest.json",
};

const personJsonLd = {
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
  affiliation: {
    "@type": "Organization",
    name: "Speed of Bytes, Inc",
    url: "https://speedofbytes.io",
    description:
      "US-registered software engineering company providing backend development services to US clients.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}