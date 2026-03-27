# AI Agent Instructions for oswaldorosalesdev.com

This file provides critical context for AI coding assistants (Claude Code, Cursor, GitHub Copilot, etc.) working on this Next.js portfolio project.

---

## Project Overview

**Name:** oswaldorosalesdev.com
**Type:** Personal portfolio and blog
**Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Docker
**Deployment:** Self-hosted on Hetzner VPS via Coolify
**Purpose:** Showcase backend engineering experience and technical writing

---

## Critical Architecture Rules

### 🚨 NEVER Break These Rules

#### 1. Routing Root Location
- **ONLY routing root:** `src/app/`
- **NEVER create:** `/app` folder at repository root
- **Why:** A previous attempt created `/app` at root, causing 404s in production
- **All new routes MUST go in:** `src/app/` only

#### 2. File Structure
```
oswaldorosalesdev.com/
├── src/
│   ├── app/              ← ROUTING ROOT (App Router)
│   │   ├── layout.tsx    ← Root layout
│   │   ├── page.tsx      ← Homepage
│   │   ├── blog/         ← Blog routes
│   │   └── api/          ← API routes
│   ├── components/
│   │   ├── layout/       ← Navbar, Footer
│   │   ├── sections/     ← Homepage sections
│   │   └── ui/           ← Reusable UI components
│   ├── lib/
│   │   ├── constants/    ← Data files
│   │   └── utils/        ← Helper functions
│   └── types/            ← TypeScript types
├── public/               ← Static assets
├── Dockerfile            ← DO NOT MODIFY without approval
├── .github/workflows/    ← DO NOT MODIFY without approval
└── package.json
```

#### 3. Deployment Configuration
**DO NOT modify these without explicit approval:**
- `Dockerfile`
- `docker-compose.yml`
- `.github/workflows/` (GitHub Actions)
- Build output configuration (must remain standalone)
- Port behavior (3000)
- Environment variable setup

**Why:** These are production-critical and tested for deployment via Coolify.

---

## Technology Decisions

### What's Already In Use
- **Next.js 15** - App Router (NOT Pages Router)
- **TypeScript** - Strict mode enabled
- **Tailwind CSS** - For all styling (no CSS modules, no styled-components)
- **lucide-react** - Icon library (already installed)
- **React 19** - Latest stable
- **No UI libraries** - No Shadcn, no Material-UI, no Chakra

### What NOT to Add
- ❌ New CSS frameworks (Bootstrap, etc.)
- ❌ UI component libraries (prefer custom Tailwind components)
- ❌ State management libraries (Redux, Zustand) unless absolutely necessary
- ❌ Animation libraries (Framer Motion, etc.) - keep animations minimal with Tailwind

### Dependencies Policy
**Only add new dependencies if:**
1. Clearly necessary for the task
2. Well-maintained and popular
3. Approved by user first

---

## Code Style Guidelines

### General Principles
1. **Minimal and safe** - Prefer small, incremental changes
2. **No over-engineering** - Simple solutions over complex abstractions
3. **Consistency** - Match existing code patterns
4. **Production-safe** - Don't break builds or deployments

### Component Structure
```tsx
// ✅ Good - Simple, straightforward
export function ComponentName() {
  return (
    <div className="...">
      {/* content */}
    </div>
  );
}

// ❌ Bad - Over-abstracted
const ComponentName = memo(forwardRef<HTMLDivElement, Props>(
  ({ ...props }, ref) => { /* complex logic */ }
));
```

### Styling
- Use Tailwind utility classes
- Match existing color scheme: `slate-*` (grays) and `blue-*` (accents)
- Existing palette:
  - Background: `slate-900`, `slate-800`, `slate-50`
  - Text: `slate-300`, `slate-600`, `slate-900`, `white`
  - Accent: `blue-400`, `blue-600`, `blue-700`

### File Naming
- Components: PascalCase (`Navbar.tsx`, `Hero.tsx`)
- Utilities: camelCase (`utils.ts`, `constants.ts`)
- Routes: lowercase (`page.tsx`, `layout.tsx`)

---

## Navigation System

### Hash Navigation (Homepage)
The homepage uses **hash-based navigation** for sections:
```tsx
// Sections have IDs
<section id="experience">...</section>
<section id="skills">...</section>
<section id="projects">...</section>
<section id="contact">...</section>

// Links use hash hrefs
<a href="#projects">Projects</a>
<a href="#contact">Contact</a>
```

**Preserve this pattern** when adding navigation links.

### Route Navigation
- Homepage: `/`
- Blog index: `/blog`
- Blog posts: `/blog/[slug]`
- API health: `/api/health`

---

## Content Guidelines

### Data Management
- **Portfolio data:** `src/lib/constants/data.ts`
- **Types:** `src/types/index.ts`
- **Do NOT invent experience or skills** - only use what's in `data.ts`

### Writing Style
- **Language:** English only
- **Tone:** Professional, credible, natural
- **Audience:** Developers, recruiters, potential clients
- **Avoid:**
  - Buzzwords and hype
  - Keyword stuffing
  - Generic template content
  - Overly promotional language

### Blog Posts
- Use straightforward JSX structure
- Include SEO metadata (title, description, OpenGraph)
- Match homepage styling
- Professional technical writing
- No filler content

---

## SEO & Metadata

### Current SEO Strategy
- **Focus:** Backend Software Engineer, Java, Spring Boot
- **Keywords:** Backend Developer, Microservices, REST APIs, Event-Driven Architecture
- **Target audience:** US-based companies, remote positions

### Metadata Rules
1. **Title format:** "Page Title | Oswaldo Rosales"
2. **Description length:** 150-160 characters
3. **Include OpenGraph** for social sharing
4. **Include Twitter Card** metadata
5. **Use JSON-LD** for structured data (already configured)

### Assets
- **Open Graph image:** `public/og-image.png` (1536x1024)
- **Logo:** `public/logo.svg` (used in navbar)
- **Profile images:** `public/images/profile.{avif,webp}`

**DO NOT reference assets that don't exist.**

---

## Git & Commit Strategy

### Branch Naming
```
feat/feature-name        # New features
fix/bug-description      # Bug fixes
refactor/what-changed    # Refactoring
docs/what-documented     # Documentation
```

### Commit Messages
Follow conventional commits:
```
feat(scope): description
fix(scope): description
refactor(scope): description
docs(scope): description
```

Examples:
```
feat(navbar): add mobile navigation menu
fix(blog): correct meta description length
refactor(seo): simplify Open Graph configuration
docs(readme): add deployment instructions
```

### Commit Strategy for Large Features
- **Split into logical commits** (don't batch everything)
- **Each commit should build successfully**
- **Commit message should explain WHY, not just WHAT**

---

## Testing & Verification

### Before Every Commit
```bash
# Build must succeed
pnpm build

# No TypeScript errors
# No linting errors
# All routes should generate successfully
```

### Critical Checks
- [ ] Homepage loads at `/`
- [ ] All sections render (Hero, Experience, Skills, Projects, Contact, Footer)
- [ ] Hash navigation works (`#projects`, `#contact`)
- [ ] Blog routes work (`/blog`, `/blog/[slug]`)
- [ ] No console errors
- [ ] No 404s introduced
- [ ] Navbar renders on all pages
- [ ] Build output is standalone (for Docker)

### Route Verification
```bash
# After adding routes, verify they generate
pnpm build | grep "Route (app)"
```

---

## Common Tasks

### Adding a New Blog Post

1. **Create static route:**
   ```
   src/app/blog/post-slug/page.tsx
   ```

2. **Add metadata:**
   ```tsx
   export const metadata: Metadata = {
     title: "Post Title",
     description: "Post description (150-160 chars)",
     openGraph: { ... },
   };
   ```

3. **Update blog index:**
   ```tsx
   // Add to posts array in src/app/blog/page.tsx
   {
     slug: "post-slug",
     title: "Post Title",
     date: "YYYY-MM-DD",
     excerpt: "Brief description",
   }
   ```

4. **Use straightforward JSX** - no complex abstractions

### Adding a New Component

1. **Choose correct directory:**
   - Layout components → `src/components/layout/`
   - Homepage sections → `src/components/sections/`
   - Reusable UI → `src/components/ui/`

2. **Match existing patterns:**
   - Use Tailwind for styling
   - Export as named function
   - Include TypeScript types

3. **Keep it simple:**
   - Avoid over-abstraction
   - No unnecessary state management
   - Minimal props

### Modifying Metadata

**File:** `src/app/layout.tsx`

**Rules:**
- Keep title format: "Oswaldo Rosales | Backend Software Engineer"
- Keep description focused on backend development
- Don't remove existing OpenGraph/Twitter config
- Verify image paths exist before using them

---

## Deployment Context

### Current Setup
- **Hosting:** Hetzner VPS (Germany)
- **Deployment platform:** Coolify
- **Build method:** Docker multi-stage build
- **Output:** Next.js standalone mode
- **Port:** 3000 (exposed in Docker)
- **CI/CD:** GitHub Actions → Docker build → Coolify deployment

### Environment Variables
- `.env.local` - Local development
- `.env.production.local` - Production (not in git)
- `.env.example` - Template (committed)

**See `.env.example` for required variables.**

### Docker Build
```bash
# Test Docker build locally (optional)
docker build -t oswaldorosales-portfolio-test .
docker run -p 3000:3000 oswaldorosales-portfolio-test
```

---

## Known Issues & Gotcases

### 1. Root `/app` Folder
**Problem:** Creating `/app` at repository root breaks routing
**Solution:** Always use `src/app/` for routes
**Detection:** `test -d app` should return false

### 2. Asset References
**Problem:** Referencing non-existent assets (e.g., `og-image.png` before it existed)
**Solution:** Always verify assets exist before using them
**Check:** `ls -la public/asset-name`

### 3. Apostrophes in JSX
**Problem:** ESLint errors for unescaped apostrophes
**Solution:** Use `&apos;` or `'` instead of `'`
**Example:** `don't` → `don&apos;t`

### 4. Hash Navigation from Blog Pages
**Problem:** Hash links need to return to homepage first
**Solution:** Use `/#section` format, not `#section`
**Example:** `href="/#projects"` (works from any page)

---

## Performance Considerations

### Images
- Use Next.js `<Image>` component
- Provide width/height to avoid layout shift
- Use `priority` for above-the-fold images
- Prefer modern formats: AVIF > WebP > PNG

### Code Splitting
- App Router handles this automatically
- Avoid importing heavy libraries in layout files
- Use dynamic imports for heavy components if needed

### Build Size
- Monitor bundle size: `pnpm build` shows route sizes
- Keep dependencies minimal
- Avoid large icon sets (lucide-react is tree-shakeable)

---

## Security Notes

### Environment Variables
- Never commit `.env.local` or `.env.production.local`
- Use `.env.example` for documentation
- Sensitive vars (API keys, secrets) go in Coolify UI

### Content Security
- No user-generated content (portfolio only)
- No authentication system (not needed)
- Blog posts are static, pre-rendered

---

## Questions to Ask User Before Making Changes

### Routing Changes
- "Where should this new route be created? Confirm it's inside `src/app/`."
- "Should this route be static or dynamic?"

### Design Changes
- "Should this match the existing slate/blue color scheme?"
- "Desktop-first or mobile-first approach?"

### Content Changes
- "Should I pull this information from `data.ts` or create new content?"
- "What tone should this content have? (professional, casual, technical?)"

### Dependency Changes
- "This feature could use library X, or I can build it custom. Which do you prefer?"
- "Is it okay to add this new dependency?"

### Breaking Changes
- "This change might affect [X]. Should I proceed or suggest alternatives?"
- "This requires modifying Docker/CI. Is this approved?"

---

## Success Criteria

A change is successful when:
1. ✅ `pnpm build` succeeds with no errors
2. ✅ All existing routes still work
3. ✅ No console errors in browser
4. ✅ No routing root violations (still `src/app/` only)
5. ✅ Follows existing code patterns
6. ✅ Matches existing design language
7. ✅ No deployment configuration changes (unless approved)
8. ✅ Commit messages are clear and descriptive

---

## Quick Reference Commands

```bash
# Development
pnpm dev              # Start dev server (http://localhost:3000)
pnpm build            # Production build
pnpm start            # Run production build locally
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript type checking

# Docker (optional local testing)
docker build -t test .           # Build Docker image
docker run -p 3000:3000 test     # Run Docker container

# Git workflow
git checkout -b feat/feature-name    # Create feature branch
git add <files>                      # Stage changes
git commit -m "feat: description"    # Commit changes
git push -u origin feat/feature-name # Push branch
```

---

## When in Doubt

1. **Check existing patterns** - Look at similar components/routes
2. **Keep it minimal** - Smaller changes are safer
3. **Ask the user** - Clarify before making assumptions
4. **Verify assets** - Check files exist before referencing them
5. **Test the build** - Always run `pnpm build` before committing
6. **Read this file** - The answer might be here

---

**Last updated:** 2024-03-27
**Maintained by:** Oswaldo Rosales
**For questions:** See project README or ask the repository owner
