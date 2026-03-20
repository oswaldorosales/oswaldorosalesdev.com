# Oswaldo Rosales | Software Engineer

Professional portfolio and project hub built with modern web technologies and optimized for production deployment.

## 🛠 Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS + Shadcn/ui
- **Deployment:** Self-hosted on Hetzner VPS (managed via Coolify)
- **Infrastructure:** Docker (Multi-stage builds)

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
- npm/yarn/pnpm

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## 🐳 Docker Deployment

### Build and Run with Docker

```bash
# Build the image
docker build -t oswaldorosalesdev .

# Run the container
docker run -p 3000:3000 oswaldorosalesdev
```

### Using Docker Compose

```bash
docker-compose up -d
```

### Deploy to Coolify/Hetzner VPS

1. Push code to your Git repository
2. Configure Coolify to point to your repo
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
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## 📝 License

Licensed under the [MIT License](./LICENSE).

---

**Built with ⚡ by Oswaldo Rosales**
