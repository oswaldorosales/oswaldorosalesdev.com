# Resume PDF Generator

Professional resume PDF generation system using Puppeteer + HTML/CSS.

## 📋 Features

- ✅ Professional 2-column layout optimized for Software Engineers
- ✅ Modern, minimalist design with subtle visual accents
- ✅ Auto-generated from `data.ts` - single source of truth
- ✅ Embedded profile photo
- ✅ Multi-page support with consistent formatting
- ✅ ATS-friendly (semantic structure, selectable text)
- ✅ Easy to maintain and customize

## 🚀 Usage

```bash
# Generate PDF from data.ts
pnpm generate-resume
```

Output: `public/resume.pdf`

## 🎨 Design Structure

### 2-Column Layout

**Sidebar (32% - Light gray background)**
- Circular profile photo
- Contact information
- Technical skills grouped by category

**Main Content (68%)**
- Header: Name, title, headline
- Professional summary
- Work experience (reverse chronological)
- Education

### Color Palette

- **Primary Blue**: `#2563eb` - Accents, section titles, links
- **Dark Slate**: `#1e293b` - Main text
- **Gray**: `#475569` - Secondary text
- **Light Gray**: `#f8fafc` - Sidebar background

## 📁 System Files

```
scripts/
├── generate-resume.ts          # Main generation script (TypeScript)
├── resume-template.html        # HTML/CSS template
├── README-RESUME.md           # This documentation
└── optimize-images.mjs        # Image optimization (separate script)
```

## ⚙️ Configuration

Edit `CONFIG` in `generate-resume.ts`:

```typescript
const CONFIG = {
  templatePath: path.join(__dirname, 'resume-template.html'),
  outputPath: path.join(__dirname, '../public/resume.pdf'),
  profileImagePath: path.join(__dirname, '../public/images/profile.avif'),
};
```

## 🎯 Content Structure

The generator reads directly from `data.ts`:

- **personalInfo**: Name, title, headline, bio, contact
- **socialLinks**: GitHub, LinkedIn
- **experiences**: Work history with description, impact, technologies
- **skills**: Technical skills (Expert, Advanced, Intermediate levels)
- **education**: Academic background

### Experience Format

Each experience includes:
- **description**: Role overview and responsibilities
- **impact**: Business/technical impact of the work
- **technologies**: Tech stack used

## 🛠️ Technologies

- **Puppeteer**: PDF generation from HTML
- **tsx**: TypeScript execution
- **HTML/CSS Grid**: Layout system
- **Node.js**: Script orchestration

## 📝 Customization

### Modify Styles

Edit `scripts/resume-template.html` - all CSS is inline:

```css
.section-title {
  color: #2563eb;  /* Change section title color */
}
```

### Modify Layout

The template uses CSS Grid for the 2-column layout:

```css
.resume-container {
  display: grid;
  grid-template-columns: 32% 68%;  /* Adjust column widths */
}
```

### Add Sections

1. Edit `resume-template.html` to add placeholders
2. Edit `generate-resume.ts` to generate the content HTML
3. Run `pnpm generate-resume`

## 🔧 Troubleshooting

### PDF not generating

```bash
# Verify dependencies are installed
pnpm install

# Run with debug
tsx scripts/generate-resume.ts
```

### Profile photo not appearing

Verify file exists: `public/images/profile.avif`

### Content overflow

The system uses `page-break-inside: avoid` on items to prevent splits. If content is too long, it will flow to multiple pages automatically.

### Customize which experience gets page 2 margin

Edit `.experience-item:nth-child(N)` in the template where N is the item that breaks to page 2:

```css
.experience-item:nth-child(5) {
  padding-top: 25mm;  /* Top margin for page 2 */
}
```

## 🚀 Future Enhancements

- Multi-language support (EN/ES)
- Theme variants (dark mode, color schemes)
- JSON export for sharing
- Web preview route (`/resume/preview`)
- CI/CD auto-regeneration on data.ts changes
- Dynamic years of experience calculation

## 📄 License

This generator is part of your personal portfolio project.
