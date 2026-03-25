# Oswaldo Rosales | Software Engineer

Professional portfolio and project hub built with modern web technologies and optimized for production deployment.

🌐 **Live Site:** [oswaldorosalesdev.com](https://oswaldorosalesdev.com)

---

> **Want to use this for your own portfolio?**
> Check out the [Fork & Customize Guide](docs/fork-and-customize.md) for step-by-step instructions on how to make this portfolio your own!

---

## 🛠 Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS + Custom components
- **Package Manager:** pnpm 10+ (via Corepack)
- **Deployment:** Self-hosted on Hetzner VPS (managed via Coolify)
- **Infrastructure:** Docker (Multi-stage builds with BuildKit caching)
- **CI/CD:** GitHub Actions → GHCR → Coolify

---

## 📁 Project Structure

```
oswaldorosalesdev.com/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes (health check)
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   │   ├── layout/         # Header, Footer, Navigation
│   │   ├── sections/       # Hero, Experience, Projects, Skills, Contact
│   │   └── ui/             # Reusable UI components
│   ├── lib/
│   │   ├── constants/      # Data source (data.ts)
│   │   └── utils/          # Utility functions
│   └── types/              # TypeScript definitions
├── public/
│   ├── images/             # Profile photos, assets
│   └── resume.pdf          # Auto-generated resume (see docs/resume-generator.md)
├── scripts/
│   ├── generate-resume.ts  # PDF resume generator (Puppeteer)
│   ├── resume-template.html # Resume HTML/CSS template
│   └── optimize-images.mjs # Image optimization script
├── docs/
│   ├── coolify-setup-guide.md  # Complete Coolify setup guide
│   └── resume-generator.md     # Resume generator documentation
├── Dockerfile              # Multi-stage production build
├── docker-compose.yml      # Local Docker orchestration
└── .github/workflows/      # CI/CD automation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+ (or use corepack: `corepack enable && corepack prepare pnpm@10 --activate`)
- Docker & Docker Compose (optional, for containerized development)

### Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Run development server:**
   ```bash
   pnpm dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

---

## 🐳 Docker Deployment

### Multi-Stage Dockerfile Architecture

The Dockerfile uses a 3-stage build process optimized for production:

1. **deps** - Installs dependencies using pnpm with cache mounts
2. **builder** - Builds the Next.js application with standalone output
3. **runner** - Minimal production runtime using `node:20-slim` with dumb-init

**Key Features:**
- BuildKit cache mounts for faster dependency installation
- pnpm via Corepack (eliminates npm deadlock issues)
- Standalone Next.js output (self-contained server)
- Non-root user for security
- Memory limits for VPS environments (`--max-old-space-size=384`)
- Health check endpoint (`/api/health`) for Coolify monitoring

### Build and Run with Docker

```bash
# Build the production image
docker build -t oswaldorosalesdev .

# Run the container
docker run -p 3000:3000 oswaldorosalesdev
```

### Using Docker Compose

**Development mode:**
```bash
docker-compose up -d
```

This mounts your local code with hot-reload enabled using the `builder` target and runs `pnpm dev`.

**Features:**
- Live code synchronization
- Node modules excluded from volume mount
- Automatic restart on changes
- Port 3000 exposed

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The repository includes automated builds via `.github/workflows/deploy.yml`:

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**Process:**
1. Builds Docker image using BuildKit
2. Pushes to GitHub Container Registry (GHCR)
3. Tags: `latest` + commit SHA
4. Triggers Coolify deployment via webhook
5. Coolify pulls new image and deploys with zero downtime

**Image Registry:**
```bash
ghcr.io/oswaldorosales/oswaldorosalesdev:latest
ghcr.io/oswaldorosales/oswaldorosalesdev:<commit-sha>
```

### Deploy to Coolify

1. Configure Coolify to pull from GHCR
2. Set up deployment webhook
3. Configure health checks
4. Push to `main` → auto-deploy

**See detailed setup:** [docs/coolify-setup-guide.md](docs/coolify-setup-guide.md)

---

## 📝 Content Management

All content is managed through a single source of truth: `src/lib/constants/data.ts`

This includes:
- Personal information
- Work experience
- Technical skills
- Projects
- Education
- Social links

### Auto-Generated Resume

The project includes a professional resume generator that reads from `data.ts`:

```bash
# Generate PDF resume
pnpm generate-resume
```

Output: `public/resume.pdf`

**Features:**
- Professional 2-column layout
- ATS-friendly design
- Automatically includes latest experience from `data.ts`
- Multi-page support with consistent formatting

**Documentation:** [docs/resume-generator.md](docs/resume-generator.md)

---

## 🧪 Available Scripts

```bash
pnpm dev               # Start development server with Turbopack
pnpm build             # Build for production (with linting)
pnpm build:docker      # Build for Docker (skips linting)
pnpm start             # Start production server
pnpm lint              # Run ESLint
pnpm type-check        # Run TypeScript compiler check
pnpm optimize-images   # Optimize images in public directory
pnpm generate-resume   # Generate PDF resume from data.ts
```

---

## 📚 Documentation

- **[Fork & Customize Guide](docs/fork-and-customize.md)** - Complete guide to fork this repo and make it your own portfolio
- **[Coolify Setup Guide](docs/coolify-setup-guide.md)** - Complete guide for VPS deployment with Coolify
- **[Resume Generator](docs/resume-generator.md)** - Documentation for the automated resume PDF generator

---

## 🎯 Features

### ✅ Implemented

- [x] Infrastructure-ready setup with Docker
- [x] Health check endpoint for monitoring
- [x] Automated CI/CD pipeline (GitHub Actions → GHCR → Coolify)
- [x] Professional portfolio sections (Hero, Experience, Skills, Projects, Contact)
- [x] Responsive design with Tailwind CSS
- [x] Auto-generated PDF resume from data.ts
- [x] Type-safe content management
- [x] SEO-optimized metadata
- [x] Direct contact information

### 🚧 Roadmap

- [ ] Dark mode support
- [ ] Blog with MDX support
- [ ] Analytics integration (privacy-focused)
- [ ] Multi-language support (EN/ES)
- [ ] Performance monitoring dashboard

---

## 🏗️ Infrastructure

### Production Stack

- **Hosting:** Hetzner Cloud VPS (CPX11 - 2 vCPU, 4GB RAM)
- **Orchestration:** Coolify (open-source PaaS)
- **Reverse Proxy:** Traefik (via Coolify)
- **SSL:** Let's Encrypt (automatic renewal)
- **Registry:** GitHub Container Registry (GHCR)

### Monitoring

- **Health Checks:** `/api/health` endpoint
- **Container Health:** Docker HEALTHCHECK directive
- **Uptime Monitoring:** Configured in Coolify

---

## 🔐 Environment Variables

Currently, this project does not require any environment variables for basic functionality.

Optional environment variables can be added as needed for your specific deployment.

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Licensed under the [MIT License](./LICENSE).

---

## 🔗 Connect

- **Website:** [oswaldorosalesdev.com](https://oswaldorosalesdev.com)
- **GitHub:** [@oswaldorosales](https://github.com/oswaldorosales)
- **LinkedIn:** [Oswaldo Rosales](https://www.linkedin.com/in/oswaldo-rosales/)

---

**Built with ⚡ by Oswaldo Rosales**
