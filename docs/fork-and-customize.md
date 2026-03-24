# Fork and Customize Guide

Complete guide to fork this portfolio project and make it your own.

---

## Table of Contents

1. [Quick Start](#quick-start)
2. [Customize Your Content](#customize-your-content)
3. [Customize Styling & Branding](#customize-styling--branding)
4. [Add Your Profile Photo](#add-your-profile-photo)
5. [Generate Your Resume](#generate-your-resume)
6. [Deploy Your Portfolio](#deploy-your-portfolio)
7. [Optional Customizations](#optional-customizations)

---

## Quick Start

### 1. Fork the Repository

Click the **Fork** button at the top right of this repository on GitHub.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/oswaldorosalesdev.com.git
cd oswaldorosalesdev.com
```

### 3. Install Dependencies

```bash
# Enable corepack (if not already enabled)
corepack enable

# Install dependencies
pnpm install
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

---

## Customize Your Content

All content is managed in a single file: **`src/lib/constants/data.ts`**

This is your **single source of truth** for all portfolio content, including:
- Personal information
- Work experience
- Projects
- Skills
- Education
- Social links

### Step 1: Update Personal Information

Edit `src/lib/constants/data.ts`:

```typescript
export const personalInfo: PersonalInfo = {
  name: "Your Name",
  title: "Your Job Title",
  headline: "Your professional headline - what you do and specialize in",
  bio: "Your professional bio - tell your story, your experience, and what you're passionate about",
  location: "Your City, Country",
  email: "your.email@example.com",
  avatar: "/images/profile.avif",  // Path to your profile photo
  resume: "/resume.pdf",
};
```

### Step 2: Update Social Links

```typescript
export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/your-username",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/your-profile/",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/your-handle",
    icon: "twitter",
  },
];
```

### Step 3: Add Your Work Experience

```typescript
export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Your Company",
    role: "Your Role",
    location: "City, Country (Remote/On-site)",
    period: "Jan 2023 - Present",
    startDate: "2023-01-01",
    endDate: null,  // null for current position
    description: "Brief description of your role and responsibilities",
    impact: "The impact you made in this role",
    technologies: ["Technology 1", "Technology 2", "Technology 3"],
  },
  // Add more experiences...
];
```

**Tips:**
- List experiences in **reverse chronological order** (most recent first)
- Use `endDate: null` for your current position
- Keep descriptions concise but impactful
- Highlight specific achievements and metrics when possible

### Step 4: Add Your Projects

```typescript
export const projects: Project[] = [
  {
    id: "proj-1",
    name: "Project Name",
    description: "Brief one-line description",
    longDescription: "Detailed description of the project, technologies used, and your role",
    technologies: ["Tech 1", "Tech 2", "Tech 3"],
    repository: "https://github.com/your-username/project-repo",
    demo: "https://project-demo.com",  // Optional
    featured: true,
    language: "JavaScript",  // Primary language
  },
  // Add more projects...
];
```

### Step 5: Update Your Skills

```typescript
export const skills: Skill[] = [
  // Languages
  { name: "JavaScript", category: "Languages", level: "Expert" },
  { name: "Python", category: "Languages", level: "Advanced" },

  // Backend
  { name: "Node.js", category: "Backend", level: "Expert" },
  { name: "Express", category: "Backend", level: "Advanced" },

  // Add more skills...
];
```

**Skill Levels:**
- `Expert` - Deep expertise, can mentor others
- `Advanced` - Professional proficiency, production experience
- `Intermediate` - Working knowledge, can build with guidance
- `Learning` - Currently learning (won't show on resume by default)

**Categories:**
- `Languages`
- `Frontend`
- `Backend`
- `Database`
- `Infrastructure`
- `Tools`

### Step 6: Add Your Education

```typescript
export const education: Education[] = [
  {
    id: "edu-1",
    institution: "University Name",
    degree: "Bachelor's Degree",
    field: "Computer Science",
    location: "City, Country",
    period: "2015 - 2019",
    startYear: 2015,
    endYear: 2019,
  },
];
```

---

## Customize Styling & Branding

### Update Color Scheme

Edit `src/app/globals.css` to change the color palette:

```css
@layer base {
  :root {
    --primary: 217 91% 60%;     /* Blue accent color */
    --foreground: 222 84% 5%;   /* Text color */
    --background: 0 0% 100%;    /* Background color */
    /* ... more CSS variables */
  }
}
```

### Update Fonts

Edit `src/app/layout.tsx`:

```typescript
import { Inter, Roboto } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

### Customize Components

All components are in `src/components/`:

```
src/components/
├── layout/
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Footer with links
├── sections/
│   ├── Hero.tsx        # Hero/landing section
│   ├── Experience.tsx  # Work experience section
│   ├── Projects.tsx    # Projects showcase
│   ├── Skills.tsx      # Skills grid
│   └── Contact.tsx     # Contact form/info
└── ui/                 # Reusable UI components
```

Edit these files to change layout, styling, or functionality.

---

## Add Your Profile Photo

### Prepare Your Photo

1. **Take a professional photo** (headshot or full body)
2. **Crop to square** (1:1 aspect ratio)
3. **Recommended size:** 400x400px to 800x800px

### Convert to AVIF (Recommended)

AVIF provides the best compression with high quality.

**Using online tool:**
- Visit [Squoosh.app](https://squoosh.app)
- Upload your photo
- Choose AVIF format
- Adjust quality (50-70 is usually good)
- Download

**Using command line:**

```bash
# Install sharp-cli
npm install -g sharp-cli

# Convert image
sharp input.jpg -o public/images/profile.avif --avif
```

### Alternative: Use WebP or PNG

```bash
# Place your photo in:
public/images/profile.avif  # AVIF (best)
# or
public/images/profile.webp  # WebP (good)
# or
public/images/profile.png   # PNG (fallback)
```

### Update data.ts

```typescript
export const personalInfo: PersonalInfo = {
  // ...
  avatar: "/images/profile.avif",  // Update to match your filename
};
```

---

## Generate Your Resume

The project includes an automated resume generator that creates a professional PDF from your `data.ts`.

### Generate Your Resume

```bash
pnpm generate-resume
```

This creates: `public/resume.pdf`

### Customize Resume Design

The resume generator uses:
- **Template:** `scripts/resume-template.html` (HTML/CSS)
- **Generator:** `scripts/generate-resume.ts` (TypeScript)

**To customize:**

1. Edit `scripts/resume-template.html` to change:
   - Colors
   - Fonts
   - Layout
   - Spacing

2. Edit `scripts/generate-resume.ts` to change:
   - Content filtering (which experiences/skills to show)
   - Data formatting

**See full documentation:** [docs/resume-generator.md](resume-generator.md)

---

## Deploy Your Portfolio

### Option 1: Vercel (Recommended for Beginners)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click **Import Project**
4. Select your repository
5. Click **Deploy**

**Domain setup:**
- Vercel provides free `.vercel.app` subdomain
- Add custom domain in Vercel dashboard

### Option 2: Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click **New site from Git**
4. Select your repository
5. Build settings:
   - Build command: `pnpm build`
   - Publish directory: `.next`

### Option 3: Self-Hosted (Coolify)

For full control and learning experience:

1. Get a VPS (Hetzner, DigitalOcean, Linode)
2. Install Coolify
3. Configure GitHub Actions for CI/CD
4. Deploy via Docker

**Full guide:** [docs/coolify-setup-guide.md](coolify-setup-guide.md)

### Configure Custom Domain

**After deploying:**

1. Buy a domain (Namecheap, Google Domains, Cloudflare)
2. Add DNS records:
   ```
   Type: A
   Name: @
   Value: YOUR_SERVER_IP (or Vercel IP)

   Type: CNAME
   Name: www
   Value: your-domain.com
   ```
3. Configure SSL (automatic on Vercel/Netlify/Coolify)

---

## Optional Customizations

### Add Analytics

**Google Analytics:**

1. Get tracking ID from [analytics.google.com](https://analytics.google.com)
2. Add to `.env.local`:
   ```bash
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Create `src/lib/analytics.ts` (see Next.js docs)

**Privacy-focused alternatives:**
- Plausible Analytics
- Fathom Analytics
- Simple Analytics

### Add Contact Form

**Using Formspree:**

1. Sign up at [formspree.io](https://formspree.io)
2. Create a form
3. Update `src/components/sections/Contact.tsx` with form endpoint

**Using Server Actions (Next.js):**

Create `src/app/api/contact/route.ts` and handle form submission server-side.

### Enable Dark Mode

1. Install next-themes:
   ```bash
   pnpm add next-themes
   ```

2. Set up theme provider in `src/app/layout.tsx`
3. Add theme toggle button in header
4. Define dark mode colors in `globals.css`

### Add Blog

1. Create `src/app/blog/` directory
2. Use MDX for blog posts
3. Install dependencies:
   ```bash
   pnpm add @next/mdx @mdx-js/loader @mdx-js/react
   ```
4. Configure `next.config.js` for MDX

### Customize Metadata & SEO

Edit `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your Name | Your Title",
  description: "Your professional description",
  keywords: ["keyword1", "keyword2"],
  openGraph: {
    title: "Your Name",
    description: "Your description",
    images: ["/og-image.png"],
  },
};
```

**Create OG image:**
- Size: 1200x630px
- Save as: `public/og-image.png`
- Include your name and title

---

## Troubleshooting

### Port 3000 already in use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 pnpm dev
```

### TypeScript errors

```bash
# Run type check
pnpm type-check

# Common fixes:
# 1. Ensure all data.ts fields match type definitions
# 2. Check src/types/index.ts for correct interfaces
```

### Build errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Try building again
pnpm build
```

### Profile photo not showing

1. Check file path matches `data.ts`
2. Ensure image is in `public/images/`
3. Check browser console for 404 errors
4. Verify image format is supported (AVIF, WebP, PNG, JPG)

---

## Checklist Before Going Live

- [ ] Updated all personal information in `data.ts`
- [ ] Added your profile photo
- [ ] Added at least 2-3 work experiences
- [ ] Added 2-3 featured projects
- [ ] Updated skills list
- [ ] Generated your resume PDF
- [ ] Customized color scheme (optional)
- [ ] Tested all links work
- [ ] Configured custom domain
- [ ] Set up SSL certificate
- [ ] Added analytics (optional)
- [ ] Tested on mobile devices
- [ ] Checked for typos and formatting
- [ ] Updated README with your name
- [ ] Updated package.json name field

---

## Getting Help

- **Documentation:** Check other docs in `/docs` folder
- **Issues:** Open an issue on the original repo
- **Discussions:** Use GitHub Discussions for questions

---

## License

This project is licensed under the MIT License. You're free to use it for your own portfolio!

---

**Good luck with your portfolio! 🚀**
