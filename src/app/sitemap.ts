import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oswaldorosalesdev.com';

  // Define specific dates for accuracy
  const homepageLastModified = new Date('2026-03-31'); // Last major update
  const blogLastModified = new Date('2026-04-18'); // Last post published
  const resumeLastModified = new Date('2026-03-31'); // Resume last update

  return [
    {
      url: baseUrl,
      lastModified: homepageLastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: blogLastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog/jwt-stateless-vs-userdetailsservice`,
      lastModified: new Date('2026-04-18'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/how-to-setup-coolify-on-hetzner-vps`,
      lastModified: new Date('2026-04-13'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/why-i-chose-vps-coolify-instead-of-vercel`,
      lastModified: new Date('2026-04-13'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog/the-importance-of-side-projects`,
      lastModified: new Date('2026-03-27'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/resume.pdf`,
      lastModified: resumeLastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
