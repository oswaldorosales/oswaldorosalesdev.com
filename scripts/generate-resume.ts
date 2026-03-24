#!/usr/bin/env tsx

/**
 * Professional Resume PDF Generator
 *
 * Generates a high-quality, modern resume PDF from data.ts using Puppeteer.
 *
 * Features:
 * - Professional 2-column layout (sidebar + main content)
 * - Clean, modern design optimized for Software Engineers
 * - ATS-friendly structure
 * - Multi-page support with consistent formatting
 * - Reads data directly from data.ts
 *
 * Usage: pnpm generate-resume
 */

import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Import data directly from data.ts
import {
  personalInfo,
  socialLinks,
  experiences,
  skills,
  education,
} from '../src/lib/constants/data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  templatePath: path.join(__dirname, 'resume-template.html'),
  outputPath: path.join(__dirname, '../public/resume.pdf'),
  profileImagePath: path.join(__dirname, '../public/images/profile.avif'),
};

// ============================================================================
// HTML GENERATION
// ============================================================================

/**
 * Generate HTML content from template and data
 */
async function generateHTML() {
  let template = await fs.readFile(CONFIG.templatePath, 'utf-8');

  // Profile photo (convert to base64 for embedding)
  const profilePhotoHTML = await generateProfilePhotoHTML();

  // Skills HTML - grouped by category
  const skillsHTML = generateSkillsHTML();

  // Experiences HTML
  const experiencesHTML = generateExperiencesHTML();

  // Education HTML
  const educationHTML = generateEducationHTML();

  // Clean URLs for display
  const githubLink = socialLinks.find(link => link.name === 'GitHub');
  const linkedinLink = socialLinks.find(link => link.name === 'LinkedIn');

  const githubUrl = githubLink?.url || '';
  const linkedinUrl = linkedinLink?.url || '';
  const githubClean = githubUrl.replace('https://github.com/', 'github.com/');
  const linkedinClean = linkedinUrl.replace('https://www.linkedin.com/', 'linkedin.com/');

  // Replace all placeholders
  template = template
    .replace(/{{NAME}}/g, escapeHTML(personalInfo.name))
    .replace(/{{TITLE}}/g, escapeHTML(personalInfo.title))
    .replace(/{{HEADLINE}}/g, escapeHTML(personalInfo.headline))
    .replace(/{{BIO}}/g, escapeHTML(personalInfo.bio))
    .replace(/{{EMAIL}}/g, escapeHTML(personalInfo.email || ''))
    .replace(/{{LOCATION}}/g, escapeHTML(personalInfo.location))
    .replace(/{{GITHUB_URL}}/g, escapeHTML(githubUrl))
    .replace(/{{GITHUB_CLEAN}}/g, escapeHTML(githubClean))
    .replace(/{{LINKEDIN_URL}}/g, escapeHTML(linkedinUrl))
    .replace(/{{LINKEDIN_CLEAN}}/g, escapeHTML(linkedinClean))
    .replace(/{{PROFILE_PHOTO}}/g, profilePhotoHTML)
    .replace(/{{SKILLS}}/g, skillsHTML)
    .replace(/{{EXPERIENCES}}/g, experiencesHTML)
    .replace(/{{EDUCATION}}/g, educationHTML);

  return template;
}

/**
 * Generate profile photo HTML with base64 encoding
 */
async function generateProfilePhotoHTML(): Promise<string> {
  try {
    const imageBuffer = await fs.readFile(CONFIG.profileImagePath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = 'image/avif';

    return `<img src="data:${mimeType};base64,${base64Image}" alt="Profile Photo" class="profile-photo">`;
  } catch (error) {
    console.warn('⚠️  Profile photo not found, skipping...');
    return '';
  }
}

/**
 * Generate skills section HTML
 */
function generateSkillsHTML(): string {
  const categoryOrder = ['Languages', 'Backend', 'Frontend', 'Database', 'Infrastructure', 'Tools'];

  // Group skills by category
  const skillsByCategory: Record<string, string[]> = {};

  for (const skill of skills) {
    // Include Expert, Advanced, and Intermediate skills
    if (skill.level === 'Expert' || skill.level === 'Advanced' || skill.level === 'Intermediate') {
      if (!skillsByCategory[skill.category]) {
        skillsByCategory[skill.category] = [];
      }
      skillsByCategory[skill.category].push(skill.name);
    }
  }

  let html = '';

  for (const category of categoryOrder) {
    if (skillsByCategory[category] && skillsByCategory[category].length > 0) {
      html += `
        <div class="skills-category">
          <div class="skills-category-name">${escapeHTML(category)}</div>
          <div class="skills-list">${skillsByCategory[category].join(' • ')}</div>
        </div>
      `;
    }
  }

  return html;
}

/**
 * Generate experiences section HTML
 */
function generateExperiencesHTML(): string {
  return experiences.map(exp => {
    const techList = exp.technologies.join(' • ');

    return `
      <div class="experience-item">
        <div class="experience-header">
          <div class="role">${escapeHTML(exp.role)}</div>
          <div class="company-period">${escapeHTML(exp.company)} | ${escapeHTML(exp.period)}</div>
          <div class="location">${escapeHTML(exp.location)}</div>
        </div>
        ${exp.description ? `<p class="experience-description">${escapeHTML(exp.description)}</p>` : ''}
        ${exp.impact ? `<p class="experience-impact"><strong>Impact:</strong> ${escapeHTML(exp.impact)}</p>` : ''}
        ${techList ? `<div class="technologies"><span class="tech-label">Technologies:</span> <span class="tech-items">${escapeHTML(techList)}</span></div>` : ''}
      </div>
    `;
  }).join('');
}

/**
 * Generate education section HTML
 */
function generateEducationHTML(): string {
  return education.map(edu => {
    return `
      <div class="education-item">
        <div class="education-degree">${escapeHTML(edu.degree)} in ${escapeHTML(edu.field)}</div>
        <div class="education-institution">${escapeHTML(edu.institution)}</div>
        <div class="education-period">${escapeHTML(edu.period)} | ${escapeHTML(edu.location)}</div>
      </div>
    `;
  }).join('');
}

/**
 * Escape HTML to prevent injection
 */
function escapeHTML(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================================================
// PDF GENERATION
// ============================================================================

/**
 * Generate PDF using Puppeteer
 */
async function generatePDF(html: string) {
  console.log('🚀 Launching browser...');

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    console.log('📄 Rendering HTML content...');
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    });

    console.log('💾 Generating PDF...');
    await page.pdf({
      path: CONFIG.outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    });

    console.log(`✅ Resume PDF generated successfully!`);
    console.log(`📍 Location: ${CONFIG.outputPath}`);
  } finally {
    await browser.close();
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('📝  PROFESSIONAL RESUME GENERATOR');
  console.log('='.repeat(60) + '\n');

  try {
    console.log('📖 Reading data from data.ts...');

    console.log('🎨 Generating HTML from template...');
    const html = await generateHTML();

    await generatePDF(html);

    console.log('\n' + '='.repeat(60));
    console.log('✨  Resume generation completed successfully!');
    console.log('='.repeat(60) + '\n');

  } catch (error) {
    console.error('\n❌ Error generating resume:', error);
    if (error instanceof Error) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

main();
