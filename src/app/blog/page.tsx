import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles about software engineering, backend development, and building scalable systems.",
  keywords: [
    "Software Engineering Blog",
    "Backend Development",
    "Java",
    "Spring Boot",
    "Microservices",
    "System Design",
    "Technical Writing",
  ],
  openGraph: {
    type: "website",
    url: "https://oswaldorosalesdev.com/blog",
    title: "Blog | Oswaldo Rosales",
    description:
      "Technical articles about software engineering, backend development, and building scalable systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1536,
        height: 1024,
        alt: "Oswaldo Rosales - Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Oswaldo Rosales",
    description:
      "Technical articles about software engineering, backend development, and building scalable systems.",
    creator: "@OswaldoRosalesA",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://oswaldorosalesdev.com/blog",
  },
};

const posts = [
  {
    slug: "jwt-stateless-vs-userdetailsservice",
    title: "JWT Stateless Auth vs UserDetailsService in Spring Security",
    date: "2026-04-18",
    excerpt:
      "Most Spring Security JWT tutorials hit the database on every request. Here's when that's unnecessary overhead—and how a stateless AuthPrincipal fixes it.",
  },
  {
    slug: "how-to-setup-coolify-on-hetzner-vps",
    title: "How to Setup Coolify on a Hetzner VPS",
    date: "2026-04-13",
    excerpt:
      "A complete guide to installing and configuring Coolify on a Hetzner VPS, from server setup to production-ready deployments with GitHub Actions.",
  },
  {
    slug: "why-i-chose-vps-coolify-instead-of-vercel",
    title: "Why I Chose VPS + Coolify Instead of Vercel",
    date: "2026-04-13",
    excerpt:
      "A comparison of deployment platforms and why I chose self-hosted VPS with Coolify for better control, learning, and cost predictability.",
  },
  {
    slug: "the-importance-of-side-projects",
    title: "The Importance of Side Projects",
    date: "2026-03-27",
    excerpt:
      "Side projects help developers stay updated by allowing experimentation with newer and broader tech stacks than those used in day-to-day work.",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-slate-600">
            Technical articles about software engineering, backend development,
            and building scalable systems.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-200"
            >
              <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="text-slate-600 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
              >
                Read more
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
