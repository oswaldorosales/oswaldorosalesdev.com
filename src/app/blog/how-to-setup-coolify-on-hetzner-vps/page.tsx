import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Setup Coolify on a Hetzner VPS",
  description:
    "A complete guide to installing and configuring Coolify on a Hetzner VPS, from server setup to production-ready deployments with GitHub Actions.",
  keywords: [
    "Coolify Setup",
    "Hetzner VPS",
    "Self-Hosted PaaS",
    "Coolify Installation",
    "Docker Deployment",
    "DevOps Tutorial",
    "VPS Configuration",
    "GitHub Actions",
    "CI/CD Pipeline",
  ],
  authors: [{ name: "Oswaldo Rosales", url: "https://oswaldorosalesdev.com" }],
  openGraph: {
    type: "article",
    url: "https://oswaldorosalesdev.com/blog/how-to-setup-coolify-on-hetzner-vps",
    title: "How to Setup Coolify on a Hetzner VPS",
    description:
      "A complete guide to installing and configuring Coolify on a Hetzner VPS, from server setup to production-ready deployments with GitHub Actions.",
    publishedTime: "2026-04-13T00:00:00.000Z",
    authors: ["Oswaldo Rosales"],
    images: [
      {
        url: "/og-image.png",
        width: 1536,
        height: 1024,
        alt: "How to Setup Coolify on a Hetzner VPS - Oswaldo Rosales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Setup Coolify on a Hetzner VPS",
    description:
      "A complete guide to installing and configuring Coolify on a Hetzner VPS, from server setup to production-ready deployments with GitHub Actions.",
    creator: "@OswaldoRosalesA",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical:
      "https://oswaldorosalesdev.com/blog/how-to-setup-coolify-on-hetzner-vps",
  },
};

const blogPostJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: "How to Setup Coolify on a Hetzner VPS",
  description:
    "A complete guide to installing and configuring Coolify on a Hetzner VPS, from server setup to production-ready deployments with GitHub Actions.",
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
      "https://oswaldorosalesdev.com/blog/how-to-setup-coolify-on-hetzner-vps",
  },
  keywords: [
    "Coolify Setup",
    "Hetzner VPS",
    "Self-Hosted PaaS",
    "Docker Deployment",
    "DevOps",
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
            How to Setup Coolify on a Hetzner VPS
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed">
            A step-by-step guide to installing Coolify on a Hetzner VPS and
            setting up production-ready deployments with GitHub Actions and
            Docker.
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-slate prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Prerequisites
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Before starting, you&apos;ll need a fresh Ubuntu server and a domain
            pointing to it. I recommend Ubuntu 22.04 or 24.04 for compatibility.
            The recommended server specs are 2 CPU cores, 4GB RAM, and 40GB
            storage, which aligns perfectly with Hetzner&apos;s CX23 VPS.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            You&apos;ll also need root access to the server, ports 80, 443, and
            8000 open for HTTP, HTTPS, and the Coolify dashboard respectively.
            Make sure Docker is not already configured with IPv6—this is a
            common source of proxy errors during installation.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Step 1: Disable IPv6 in Docker
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            This is a critical step that prevents the most common Coolify
            installation issue. By default, Docker can automatically create
            networks with IPv6 enabled, which causes Coolify&apos;s proxy
            (Traefik) to fail with cryptic errors like{" "}
            <code>ParseAddr(&quot;fdxx:xxxx::1/64&quot;)</code>. The proxy expects a pure
            IPv4 network configuration, and when it encounters IPv6 addresses,
            it cannot properly parse the network routes. This is a{" "}
            <a
              href="https://github.com/coollabsio/coolify/issues/8649"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              well-documented issue
            </a>{" "}
            in the Coolify community.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Before installing Coolify, configure Docker to disable IPv6 support.
            Create or edit the Docker daemon configuration file at{" "}
            <code>/etc/docker/daemon.json</code> and add{" "}
            <code>{`{"ipv6": false}`}</code>. This ensures that all Docker
            networks, including the one Coolify creates, will use IPv4 only.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            After saving the file, restart Docker with{" "}
            <code>sudo systemctl restart docker</code> and verify it&apos;s
            running with <code>sudo systemctl status docker</code>. You should
            see <code>active (running)</code> in the output.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Step 2: Install Coolify
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Coolify provides an official installation script that handles the
            entire setup process. Run the following command on your server:
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            <code>curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash</code>
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            This installs the core Coolify containers: <code>coolify</code>,{" "}
            <code>coolify-db</code>, <code>coolify-redis</code>, and{" "}
            <code>coolify-realtime</code>. The installation typically takes a
            few minutes depending on your server&apos;s network speed.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Once complete, verify the installation by running{" "}
            <code>docker ps</code>. You should see all four Coolify containers
            running. You can also inspect the Docker network with{" "}
            <code>docker network inspect coolify</code> and confirm that{" "}
            <code>EnableIPv6</code> is set to <code>false</code>.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Step 3: Access the Dashboard
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Open your browser and navigate to{" "}
            <code>http://YOUR_SERVER_IP:8000</code>. You&apos;ll be prompted to
            complete the initial setup, which includes creating a root user,
            setting up your first team, and configuring the server connection.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            During this process, add your server by selecting{" "}
            <strong>Localhost</strong> as the server type. Coolify will
            automatically connect to the Docker daemon running on the same
            machine.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Step 4: Configure DNS and Domain
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Before you can deploy applications with SSL, configure your DNS
            records. In your DNS provider (Cloudflare, Namecheap, etc.), add the
            following records:
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            A wildcard record (<code>*</code>) pointing to your server IP, a
            root record (<code>@</code>) pointing to your server IP, a subdomain
            for Coolify itself (e.g., <code>coolify</code>) pointing to your
            server IP, and optionally a CNAME for <code>www</code> pointing to
            your domain.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Back in Coolify, navigate to{" "}
            <strong>Servers → localhost → Configuration → General</strong> and
            set the <strong>Wildcard Domain</strong> to{" "}
            <code>https://*.your-domain.com</code>. This allows Coolify to
            automatically route subdomains to your applications.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Step 5: Start the Proxy
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Coolify uses a reverse proxy (Traefik) to route traffic to your
            applications. Navigate to{" "}
            <strong>Servers → localhost → Proxy</strong> and click{" "}
            <strong>Start Proxy</strong>. Wait until the status shows{" "}
            <strong>Proxy Running</strong>.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Verify the proxy is running by checking <code>docker ps</code>
            —you should now see a <code>coolify-proxy</code> container in
            addition to the core Coolify containers.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Step 6: Configure Coolify Dashboard Domain
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            For security and convenience, set up a proper domain for the Coolify
            dashboard instead of accessing it via IP and port. Navigate to{" "}
            <strong>Settings → Configuration → General</strong> and set the{" "}
            <strong>URL</strong> to <code>coolify.your-domain.com</code>.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Coolify will automatically configure SSL via Let&apos;s Encrypt.
            After a few moments, you&apos;ll be able to access your dashboard at{" "}
            <code>https://coolify.your-domain.com</code> instead of using the IP
            and port.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Step 7: Deploy Your First Application
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Create a project by navigating to <strong>Projects → Add+</strong>.
            Give it a name and description. Then, add a resource by selecting{" "}
            <strong>Docker Image</strong> and specifying your image name (e.g.,{" "}
            <code>ghcr.io/your-username/your-image</code>) and tag (usually{" "}
            <code>latest</code>).
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            In the application configuration, set the <strong>Domains</strong>{" "}
            field to your desired domain(s), such as{" "}
            <code>https://your-domain.com,https://www.your-domain.com</code>.
            You can configure redirect behavior (e.g., non-www to www or vice
            versa) in the same section.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Under <strong>Network → Ports Exposes</strong>, specify which port
            your application listens on (e.g., <code>3000</code> for most
            Node.js apps). Coolify will route traffic from ports 80 and 443 to
            this internal port.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Click <strong>Save</strong>, then click <strong>Deploy</strong>.
            Coolify will pull the Docker image, start the container, attach it
            to the proxy, and configure SSL automatically. Your application will
            be live at your domain within a few minutes.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Step 8: Set Up CI/CD with GitHub Actions
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            For automated deployments, configure a GitHub Actions workflow that
            builds your Docker image, pushes it to a registry (like GitHub
            Container Registry), and triggers a Coolify deployment.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            First, configure your Coolify application to always pull the latest
            image. In your application settings, enable{" "}
            <strong>Always pull latest image</strong>. Then, set up a
            healthcheck so Coolify knows when your application is ready. Under{" "}
            <strong>Healthcheck</strong>, configure the method (GET), scheme
            (http), host (localhost), port (3000), and path (e.g.,{" "}
            <code>/api/health</code>).
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            In Coolify, navigate to your application&apos;s{" "}
            <strong>Configuration → Webhooks</strong> and copy the{" "}
            <strong>Deploy Webhook</strong> URL. Also, go to{" "}
            <strong>Keys & Tokens → API Tokens</strong> and create a new token
            with deploy permissions.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            In your GitHub repository, go to{" "}
            <strong>Settings → Secrets and variables → Actions</strong> and add
            two secrets: <code>COOLIFY_TOKEN</code> (the API token) and{" "}
            <code>COOLIFY_WEBHOOK</code> (the webhook URL).
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            Create a GitHub Actions workflow file at{" "}
            <code>.github/workflows/deploy.yml</code> that builds your Docker
            image, pushes it to GHCR, and triggers the Coolify webhook. The
            workflow should authenticate to GHCR using{" "}
            <code>secrets.GITHUB_TOKEN</code>, build and tag the image with both{" "}
            <code>latest</code> and the commit SHA, and finally call the Coolify
            webhook to trigger a deployment.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            With this setup, every push to your main branch will automatically
            build, push, and deploy your application to Coolify.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Common Issues and Solutions
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            If the proxy fails to start with an IPv6 error, stop all containers
            with <code>docker stop $(docker ps -aq)</code>, remove the network
            with <code>docker network rm coolify</code>, recreate it with{" "}
            <code>docker network create coolify</code>, and restart the
            containers from the Coolify dashboard.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            If health checks are failing, verify that your application is
            listening on <code>0.0.0.0</code> and not just{" "}
            <code>localhost</code>, that the health endpoint exists and returns
            a successful status code, and that your Docker image includes{" "}
            <code>curl</code> or <code>wget</code> for the healthcheck command.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            If the image isn&apos;t pulling from the registry, ensure the image
            is public or that Coolify has credentials configured, verify that
            &quot;Always pull latest image&quot; is enabled, and confirm the
            image tag exists in your registry.
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-4">
            Conclusion
          </h2>

          <p className="text-slate-700 leading-relaxed mb-6">
            Coolify transforms a basic VPS into a powerful deployment platform
            with minimal effort. Once configured, you have a production-ready
            environment with automatic SSL, Docker-based deployments, and
            webhook-driven CI/CD. The setup process takes about an hour, but the
            result is infrastructure you fully control and understand.
          </p>

          <p className="text-slate-700 leading-relaxed mb-6">
            This setup is ideal for personal projects, side projects, or small
            production applications. You get the simplicity of managed platforms
            like Vercel with the control and cost efficiency of self-hosting.
            For developers looking to build DevOps skills while deploying real
            applications, Coolify is an excellent choice.
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
