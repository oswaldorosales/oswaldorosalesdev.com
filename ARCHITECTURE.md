# Architecture Documentation

## Project Overview

This is a production-grade Next.js 15+ application built for high performance, SEO optimization, and scalability. The project follows enterprise-level patterns and is containerized for deployment on self-hosted infrastructure.

## Technology Decisions

### Core Framework: Next.js 15+
- **App Router**: Modern routing with React Server Components
- **TypeScript Strict Mode**: Full type safety across the codebase
- **Turbopack**: Fast development builds
- **Standalone Output**: Optimized for Docker deployment

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: High-quality, accessible component library
- **CSS Variables**: Theme customization support

### Infrastructure
- **Multi-stage Docker Build**: Minimizes production image size
- **Health Check Endpoint**: `/api/health` for monitoring
- **Non-root User**: Security-hardened container
- **Self-hosted**: Hetzner VPS managed via Coolify

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── health/        # Health check endpoint
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles and CSS variables
├── components/            # React components (organized by feature)
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and shared logic
└── types/                 # TypeScript type definitions
```

## Configuration Files

### Next.js (`next.config.ts`)
- **Standalone output**: Optimized for Docker
- **React strict mode**: Enabled for better debugging
- **Compression**: Enabled for smaller payloads
- **No powered-by header**: Reduced fingerprinting

### TypeScript (`tsconfig.json`)
- **Strict mode**: Maximum type safety
- **Path aliases**: `@/*` for clean imports
- **No unused locals/parameters**: Enforced code quality
- **Force consistent casing**: Cross-platform compatibility

### Docker (`Dockerfile`)
Three-stage build:
1. **deps**: Production dependencies only
2. **builder**: Full build with all dependencies
3. **runner**: Minimal runtime image (~150MB)

Security features:
- Non-root user (nextjs:nodejs)
- Minimal attack surface
- Health check integration

## Performance Optimizations

### Build Time
- Turbopack in development
- Incremental builds
- Package import optimization

### Runtime
- Next.js standalone output
- Static asset optimization
- Font optimization (Inter with display: swap)

### Docker
- Multi-stage builds reduce image size by ~70%
- Layer caching for faster rebuilds
- Alpine Linux base image

## Deployment Strategy

### Local Development
```bash
npm run dev
```

### Docker Build
```bash
docker build -t oswaldorosalesdev .
docker run -p 3000:3000 oswaldorosalesdev
```

### Coolify Deployment
1. Connect Git repository
2. Coolify auto-detects Dockerfile
3. Configure environment variables
4. Automatic deployments on push to main

## Environment Variables

See `.env.example` for all configurable options. Critical variables:
- `NODE_ENV`: Environment mode
- `NEXT_PUBLIC_APP_URL`: Public-facing URL

## Health Monitoring

Health check endpoint: `GET /api/health`

Returns:
```json
{
  "status": "healthy",
  "timestamp": "2026-03-19T..."
}
```

Used by:
- Docker HEALTHCHECK
- Load balancers
- Monitoring tools

## Future Enhancements

### Phase 2: Content Integration
- Portfolio/projects section
- Resume/CV integration
- LinkedIn data sync

### Phase 3: Interactive Features
- Contact form (Server Actions + Resend)
- Blog with MDX support
- Dark mode toggle

### Phase 4: Advanced Features
- Analytics (Vercel Analytics or Plausible)
- CMS integration (Sanity or Contentful)
- CRUD applications showcase

## Development Guidelines

### Code Quality
- ESLint + TypeScript ensure quality
- Pre-commit hooks recommended (Husky + lint-staged)
- All components should be typed

### Component Organization
```
components/
├── ui/              # Shadcn/ui components
├── layout/          # Layout components (Header, Footer)
├── sections/        # Page sections (Hero, Projects)
└── features/        # Feature-specific components
```

### API Routes
- Use Route Handlers (App Router)
- Implement proper error handling
- Return typed responses

### Performance
- Lazy load heavy components
- Optimize images with next/image
- Use React Server Components by default
- Client components only when needed

## Security Considerations

- No credentials in code
- Environment variables for secrets
- HTTPS in production
- CSP headers (future)
- Rate limiting on API routes (future)

---

**Document Version**: 1.0
**Last Updated**: 2026-03-19
