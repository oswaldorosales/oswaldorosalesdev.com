#!/usr/bin/env node
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '..', 'public', 'images');
const inputFile = join(publicDir, 'profile.png');
const outputAvif = join(publicDir, 'profile.avif');
const outputWebp = join(publicDir, 'profile.webp');

async function optimizeImages() {
  console.log('🎨 Optimizing profile image...\n');

  try {
    const image = sharp(inputFile);
    const metadata = await image.metadata();

    console.log(`📸 Original: ${metadata.width}x${metadata.height} (${metadata.format})`);

    // Target size for profile images
    const targetSize = 800;

    // Generate AVIF (best compression, modern browsers)
    console.log('⚡ Generating AVIF...');
    await image
      .resize(targetSize, targetSize, {
        fit: 'cover',
        position: 'center'
      })
      .avif({
        quality: 85,
        effort: 6
      })
      .toFile(outputAvif);

    const avifStats = await sharp(outputAvif).metadata();
    console.log(`   ✓ AVIF: ${avifStats.width}x${avifStats.height}`);

    // Generate WebP (good compression, wide support)
    console.log('🌐 Generating WebP...');
    await image
      .resize(targetSize, targetSize, {
        fit: 'cover',
        position: 'center'
      })
      .webp({
        quality: 85,
        effort: 6
      })
      .toFile(outputWebp);

    const webpStats = await sharp(outputWebp).metadata();
    console.log(`   ✓ WebP: ${webpStats.width}x${webpStats.height}`);

    console.log('\n✨ Image optimization complete!');
    console.log('\nGenerated files:');
    console.log('  - profile.avif (modern browsers)');
    console.log('  - profile.webp (fallback)');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

optimizeImages();
