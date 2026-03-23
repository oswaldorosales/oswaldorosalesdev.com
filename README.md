# Oswaldo Rosales | Software Engineer

Professional portfolio and project hub built with modern web technologies and optimized for production deployment.

## 🛠 Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS + Shadcn/ui
- **Package Manager:** pnpm 10+ (via Corepack)
- **Deployment:** Self-hosted on Hetzner VPS (managed via Coolify)
- **Infrastructure:** Docker (Multi-stage builds with BuildKit caching)
- **CI/CD:** GitHub Actions (GHCR image registry)

## 📁 Project Structure

```
oswaldorosalesdev.com/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # Global styles
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
├── Dockerfile              # Multi-stage production build
├── docker-compose.yml      # Local Docker orchestration
└── .env.example           # Environment variables template
```

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

### GitHub Actions CI/CD

The repository includes automated builds via `.github/workflows/deploy.yml`:

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch with optional cache skip

**Process:**
1. Builds Docker image using BuildKit
2. Pushes to GitHub Container Registry (GHCR)
3. Tags: `latest` + commit SHA
4. Caches layers using GitHub Actions cache

**Image Registry:**
```bash
ghcr.io/oswaldorosales/oswaldorosalesdev:latest
ghcr.io/oswaldorosales/oswaldorosalesdev:<commit-sha>
```

### Deploy to Coolify/Hetzner VPS

1. Push code to your Git repository
2. Configure Coolify to point to your repo or GHCR
3. Set environment variables in Coolify dashboard
4. Deploy automatically on push

## 🎯 Features Roadmap

- [x] Infrastructure-ready setup
- [x] Docker multi-stage build
- [x] Health check endpoint
- [ ] Responsive design system
- [ ] Dark mode support
- [ ] Portfolio/Projects section
- [ ] Blog with Markdown support
- [ ] Contact form with Server Actions
- [ ] SEO optimization
- [ ] Analytics integration

## 🧪 Scripts

```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production (with linting)
pnpm build:docker     # Build for Docker (skips linting)
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm type-check       # Run TypeScript compiler check
pnpm optimize-images  # Optimize images in public directory
```

## 📝 License

Licensed under the [MIT License](./LICENSE).

---

**Built with ⚡ by Oswaldo Rosales**
