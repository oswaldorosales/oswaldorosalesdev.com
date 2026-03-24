# SEO Checklist & Guide

Complete SEO setup and optimization guide for the portfolio.

---

## ✅ Implemented SEO Features

### Meta Tags
- ✅ Title with template
- ✅ Meta description (optimized with keywords)
- ✅ Keywords meta tag
- ✅ Author and creator tags
- ✅ Canonical URL
- ✅ Robots meta tags

### Open Graph (Social Sharing)
- ✅ OG title, description, type
- ✅ OG image reference (1200x630)
- ✅ OG locale and URL
- ✅ Site name

### Twitter Card
- ✅ Large image card
- ✅ Twitter handle (@OswaldoRosalesA)
- ✅ Title and description
- ✅ Image reference

### Technical SEO
- ✅ robots.txt
- ✅ Dynamic sitemap.xml
- ✅ Favicon (SVG icon)
- ✅ Structured data (JSON-LD Person schema)
- ✅ PWA manifest.json
- ✅ Semantic HTML structure
- ✅ Mobile-responsive design

---

## 📋 Post-Deployment Checklist

### 1. Create OG Image

**Required:**
- Size: 1200x630 pixels
- Location: `public/og-image.png`

**Options:**
- Use [Canva OG Image template](https://www.canva.com)
- Use [og-image.vercel.app](https://og-image.vercel.app)
- Design in Figma
- See: `public/og-image-template.md`

**Quick tip:** Use your profile photo with text overlay.

### 2. Generate Icon Sizes

The SVG icon in `src/app/icon.svg` will auto-generate, but for better support:

```bash
# Create PNG icons (optional)
# 192x192 for manifest
# 512x512 for manifest
# 180x180 for Apple touch icon
```

Place in `public/`:
- `icon-192.png`
- `icon-512.png`
- `apple-touch-icon.png`

### 3. Submit to Search Engines

**Google Search Console:**
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `oswaldorosalesdev.com`
3. Verify ownership (DNS or HTML meta tag)
4. Submit sitemap: `https://oswaldorosalesdev.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add site
3. Verify ownership
4. Submit sitemap

### 4. Verify SEO Setup

**Test tools:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

**Check:**
```bash
# Verify sitemap
curl https://oswaldorosalesdev.com/sitemap.xml

# Verify robots.txt
curl https://oswaldorosalesdev.com/robots.txt

# Verify structured data
curl https://oswaldorosalesdev.com | grep "application/ld+json"
```

### 5. Monitor Performance

**Google PageSpeed Insights:**
- [pagespeed.web.dev](https://pagespeed.web.dev/)
- Target: 90+ on all metrics

**Core Web Vitals:**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## 🎯 SEO Best Practices

### Content Optimization

**Headers:**
- Use `<h1>` for your name (only one per page)
- Use `<h2>` for section titles
- Use `<h3>` for subsections

**Keywords:**
Focus on:
- Your name
- "Software Engineer"
- Technologies (Java, Spring Boot, etc.)
- Location (Guadalajara, Mexico)
- Specializations (Microservices, Event-Driven)

**Internal Linking:**
- Link to resume PDF
- Link between sections
- Link to projects/repositories

### Image Optimization

**All images should:**
- Have `alt` attributes
- Be properly sized (not oversized)
- Use modern formats (WebP, AVIF)
- Be lazy-loaded (Next.js Image component)

**Current images:**
- Profile photo: Already optimized (AVIF)
- Add OG image: 1200x630 PNG

### Performance

**Already implemented:**
- Next.js App Router (automatic optimization)
- Font optimization (next/font)
- Image optimization (next/image)
- Code splitting

**Recommendations:**
- Keep bundle size small
- Use CDN for assets (Vercel does this automatically)
- Monitor Core Web Vitals

---

## 📊 Keywords & Targeting

### Primary Keywords
- Oswaldo Rosales
- Software Engineer Guadalajara
- Java Developer Mexico
- Spring Boot Developer
- Microservices Architect

### Secondary Keywords
- Backend Developer
- Full Stack Engineer
- Event-Driven Architecture
- Cloud Infrastructure
- TypeScript Developer
- React Developer

### Long-tail Keywords
- Software Engineer with 9 years experience
- Java Spring Boot consultant
- Microservices architecture expert
- Event-driven systems developer

---

## 🔗 Backlink Strategy

**Developer Profiles:**
- ✅ GitHub: https://github.com/oswaldorosales
- ✅ LinkedIn: https://www.linkedin.com/in/oswaldo-rosales/
- ✅ Twitter: https://twitter.com/OswaldoRosalesA

**Additional Opportunities:**
- Dev.to profile
- Medium profile
- Stack Overflow profile
- Hashnode blog
- Community contributions

---

## 📈 Analytics Setup

### Google Analytics 4

1. Create GA4 property
2. Add tracking code to `layout.tsx`
3. Track custom events:
   - Resume downloads
   - External link clicks
   - Section views

### Privacy-Focused Alternatives

- **Plausible Analytics** (recommended)
- Fathom Analytics
- Simple Analytics
- Umami

**Implementation:**
Add tracking script in `layout.tsx` head section.

---

## 🚀 Advanced SEO

### Schema.org Structured Data

**Already implemented:**
- Person schema with job, location, social links

**Future additions:**
- Article schema (for blog posts)
- BreadcrumbList (for navigation)
- FAQPage (if adding FAQ section)

### Internationalization (Future)

If expanding to Spanish:
```typescript
// Add to metadata
alternates: {
  languages: {
    'en-US': 'https://oswaldorosalesdev.com',
    'es-MX': 'https://oswaldorosalesdev.com/es',
  },
},
```

---

## ✅ Verification Checklist

Before going live, verify:

- [ ] OG image created and placed in `public/og-image.png`
- [ ] Icons generated (192x192, 512x512, apple-touch-icon)
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] robots.txt accessible at `/robots.txt`
- [ ] Structured data validates (Rich Results Test)
- [ ] Twitter card previews correctly
- [ ] Facebook link preview works
- [ ] LinkedIn link preview works
- [ ] Google Search Console configured
- [ ] Sitemap submitted to Google
- [ ] PageSpeed score > 90
- [ ] Mobile-friendly test passes
- [ ] All links work (no 404s)
- [ ] HTTPS enabled
- [ ] Canonical URLs correct

---

## 📚 Resources

- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
