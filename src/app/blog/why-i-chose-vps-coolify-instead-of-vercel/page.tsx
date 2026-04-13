import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Why I Chose VPS + Coolify Instead of Vercel",
  description:
    "A comparison of deployment platforms and why I chose self-hosted VPS with Coolify for better control, learning, and cost predictability.",
  keywords: [
    "VPS Hosting",
    "Coolify",
    "Vercel",
    "Self-Hosted",
    "Deployment",
    "DevOps",
    "Hetzner",
    "Next.js Deployment",
    "Cost Comparison",
    "Infrastructure",
  ],
  authors: [{ name: "Oswaldo Rosales", url: "https://oswaldorosalesdev.com" }],
  openGraph: {
    type: "article",
    url: "https://oswaldorosalesdev.com/blog/why-i-chose-vps-coolify-instead-of-vercel",
    title: "Why I Chose VPS + Coolify Instead of Vercel",
    description:
      "A comparison of deployment platforms and why I chose self-hosted VPS with Coolify for better control, learning, and cost predictability.",
    publishedTime: "2026-04-13T00:00:00.000Z",
    authors: ["Oswaldo Rosales"],
    images: [
      {
        url: "/og-image.png",
        width: 1536,
        height: 1024,
        alt: "Why I Chose VPS + Coolify Instead of Vercel - Oswaldo Rosales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Why I Chose VPS + Coolify Instead of Vercel",
    description:
      "A comparison of deployment platforms and why I chose self-hosted VPS with Coolify for better control, learning, and cost predictability.",
    creator: "@OswaldoRosalesA",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical:
      "https://oswaldorosalesdev.com/blog/why-i-chose-vps-coolify-instead-of-vercel",
  },
};

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "Why I Chose VPS + Coolify Instead of Vercel",
  description:
    "A comparison of deployment platforms and why I chose self-hosted VPS with Coolify for better control, learning, and cost predictability.",
  image: "https://oswaldorosalesdev.com/og-image.png",
  datePublished: "2026-04-13T00:00:00.000Z",
  dateModified: "2026-04-13T00:00:00.000Z",
  author: {
    "@type": "Person",
    name: "Oswaldo Rosales",
    url: "https://oswaldorosalesdev.com",
    jobTitle: "Backend Software Engineer",
  },
  publisher: {
    "@type": "Person",
    name: "Oswaldo Rosales",
    url: "https://oswaldorosalesdev.com",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id":
      "https://oswaldorosalesdev.com/blog/why-i-chose-vps-coolify-instead-of-vercel",
  },
  keywords: [
    "VPS Hosting",
    "Coolify",
    "Vercel",
    "Self-Hosted",
    "Deployment",
    "DevOps",
    "Infrastructure",
  ],
};

export default function BlogPost() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
            <Calendar className="h-4 w-4" />
            <time dateTime="2026-04-13">April 13, 2026</time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Why I Chose VPS + Coolify Instead of Vercel
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed">
            When deploying my personal projects, I chose a self-hosted VPS with
            Coolify over Vercel. Here&apos;s why control, learning, and cost
            predictability won over convenience.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Why I Needed an Alternative to Vercel
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Vercel is exceptional for Next.js deployments. The GitHub
            integration is seamless, the zero-config setup gets you to
            production in minutes, and the developer experience is polished.
            For solo projects, it&apos;s completely free, which makes it an
            obvious choice for many developers.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            However, as soon as you add collaborators to a project, the pricing
            model changes significantly. Each team member costs an additional
            fee, and while that might make sense for production applications
            with revenue, it felt excessive for personal projects where I wanted
            the flexibility to collaborate or experiment without worrying about
            mounting costs.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Beyond cost, I wanted hands-on experience with infrastructure and
            deployment pipelines—the kind of skills that stand out on a resume.
            Vercel&apos;s abstraction is convenient, but it doesn&apos;t teach
            you Docker, server management, or CI/CD configuration. Those are
            valuable skills for backend engineers, and I wanted to build them
            while deploying something real.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            What is Coolify?
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Coolify is an open-source, self-hosted Platform-as-a-Service (PaaS)
            alternative to Heroku, Vercel, or Netlify. It runs on your own VPS
            and provides an interface for deploying applications using Docker
            containers. You get GitHub integration, automatic SSL certificates,
            webhook-based deployments, and a clean dashboard—all running on
            infrastructure you control.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Unlike managed platforms, Coolify gives you full access to the
            server, deployment pipeline, and application environment. You
            can host multiple projects on the same VPS, customize your Docker
            setup, and avoid vendor lock-in. It&apos;s the middle ground between
            raw server management and fully managed platforms.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            The Decision: Why VPS + Coolify?
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            The decision came down to three main factors: cost predictability,
            full control, and learning value.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>Cost predictability</strong> was a big driver. I went with
            a Hetzner CX23 VPS (2 vCPU, 4GB RAM, 40GB SSD, 20TB traffic) for
            $4.99 per month plus IPv4 costs (around $6 total). That&apos;s a
            fixed cost regardless of traffic, collaborators, or bandwidth. With
            Vercel, while solo use is free, adding collaborators would quickly
            exceed the VPS cost. More importantly, the VPS can host multiple
            projects at the same flat rate, which provides excellent value.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>Full control</strong> over the infrastructure meant I could
            configure deployments exactly how I wanted. I use pnpm instead of
            npm to optimize GitHub Actions usage on the free tier. I crafted a
            multi-stage Docker build that minimizes image size and memory
            consumption for the small VPS environment. I manage secrets through
            Coolify and GitHub Actions without relying on third-party
            abstractions.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>Learning value</strong> was perhaps the most important
            factor. Setting up a VPS, installing Coolify, configuring Docker
            builds, and wiring up a GitHub Actions pipeline taught me practical
            DevOps skills. These experiences are resume-worthy and gave me a
            deeper understanding of how modern deployment pipelines work. You
            don&apos;t get that from clicking &quot;Deploy&quot; on a managed
            platform.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Additionally, hosting on a VPS means I can deploy other
            projects—APIs, databases, or experimental apps—on the same server
            without paying per-project. That flexibility is valuable for
            developers who like to experiment and build side projects.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Setup Overview: How It Works
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            The deployment pipeline for my projects is straightforward but
            powerful. Here&apos;s how it works in practice. If you&apos;re
            interested in the full setup process, I wrote a{" "}
            <Link
              href="/blog/how-to-setup-coolify-on-hetzner-vps"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              detailed guide on how to setup Coolify on a Hetzner VPS
            </Link>
            .
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            I start with a <strong>multi-stage Dockerfile</strong> optimized
            for VPS constraints. The first stage installs dependencies using
            pnpm (enabled via corepack), the second stage builds the Next.js
            application, and the final stage creates a minimal production image
            with only the runtime files. The production image includes a
            non-root user for security, a healthcheck endpoint, and Node memory
            limits tuned for the 4GB VPS environment.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            The <strong>GitHub Actions workflow</strong> handles the build and
            deployment. On every push to the main branch, GitHub Actions builds
            the Docker image using BuildKit caching to speed up subsequent
            builds. The image is tagged with both <code>latest</code> and the
            commit SHA, then pushed to GitHub Container Registry (GHCR). After
            the image is published, the workflow triggers a Coolify webhook that
            pulls the new image and deploys it.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Secrets like <code>COOLIFY_TOKEN</code> and{" "}
            <code>COOLIFY_WEBHOOK</code> are managed in GitHub repository
            secrets, keeping them out of the codebase. Coolify handles SSL
            certificates automatically via Let&apos;s Encrypt, domain routing,
            and container health checks.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            The entire pipeline runs on GitHub Actions&apos; free tier because
            pnpm is more efficient than npm, and Docker layer caching minimizes
            build time. From code push to live deployment typically takes 3-5
            minutes.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            The Challenges
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            This setup is not without trade-offs. The initial configuration took
            significantly longer than Vercel&apos;s zero-config deployment.
            I had to learn Docker multi-stage builds, configure Coolify,
            set up GitHub Actions, and debug various issues along the way.
            For someone with no DevOps experience, this would be a steep
            learning curve.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Unlike Vercel, there&apos;s no global edge network or serverless
            functions out of the box. You&apos;re running a single server in
            one region (in my case, Germany with Hetzner). For personal projects
            with modest traffic, this is fine. For a high-traffic application
            that needs global low latency, you would need additional
            infrastructure like a CDN (which can be added via Cloudflare).
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Maintenance is another consideration. With Vercel, infrastructure
            updates are automatic. With a VPS, you&apos;re responsible for
            keeping the server secure, applying updates, and monitoring uptime.
            Coolify simplifies much of this, but the responsibility still falls
            on you.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            That said, these challenges are also learning opportunities. If your
            goal is to build DevOps skills and understand infrastructure,
            these &quot;challenges&quot; are actually features, not bugs.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            When to Choose Which Platform
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>Choose Vercel</strong> if you need zero-config deployment,
            edge functions, or serverless scale. It&apos;s ideal for teams that
            want to focus purely on application code without touching
            infrastructure. If you&apos;re building a production SaaS with
            revenue and need global performance, Vercel&apos;s features and
            support justify the cost.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            <strong>Choose VPS + Coolify</strong> if you want control, cost
            predictability, or hands-on DevOps experience. It&apos;s perfect
            for developers who want to learn infrastructure skills, host
            multiple projects economically, or avoid vendor lock-in. If
            you&apos;re early in your career and want to build resume-worthy
            experience, going directly to VPS + Coolify (or AWS) provides
            practical skills at a low cost.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            For personal projects and side projects, I recommend starting with
            a VPS setup. The learning curve pays dividends in technical
            knowledge, and the cost savings are significant if you&apos;re
            hosting multiple applications. You can always migrate to a managed
            platform later if requirements change.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Conclusion
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Choosing VPS + Coolify over Vercel was the right decision for my
            personal projects. I gained practical DevOps experience, reduced
            costs to a predictable flat rate, and maintained full control over
            my infrastructure and deployment pipeline. The setup process was
            more involved, but the result is a production-grade deployment that
            I fully understand and can extend as needed.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            This isn&apos;t just about where code runs—it&apos;s about career
            growth. Understanding Docker, CI/CD pipelines, server management,
            and deployment strategies makes you a more well-rounded engineer.
            These skills are transferable to any infrastructure you encounter
            in your career, whether it&apos;s AWS, GCP, or on-premise systems.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            If you&apos;re considering a similar choice, I encourage you to try
            both. Vercel is excellent for understanding modern deployment
            workflows, and VPS + Coolify is excellent for learning what happens
            under the hood. Both have value, but for developers seeking
            infrastructure experience at a low cost, the VPS path offers unique
            benefits.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </footer>
      </article>
    </main>
  );
}
