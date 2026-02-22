import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL ?? 'https://sothebyrealty.fr';

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/annonces`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
        { url: `${baseUrl}/destinations/cote-dazur`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/destinations/paris`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/destinations/alpes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/destinations/bordeaux`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
        { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
        { url: `${baseUrl}/a-propos`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
        { url: `${baseUrl}/annonces?type=VILLA`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/annonces?type=APPARTEMENT`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
        { url: `${baseUrl}/annonces?type=CHALET`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.75 },
    ];

    // Try to fetch live property slugs from DB — fails gracefully if DB is unavailable (e.g., at build time locally)
    let propertyRoutes: MetadataRoute.Sitemap = [];
    try {
        const properties = await prisma.property.findMany({
            where: { published: true },
            select: { slug: true, updatedAt: true },
        });
        propertyRoutes = properties.map((p) => ({
            url: `${baseUrl}/annonces/${p.slug}`,
            lastModified: p.updatedAt,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        }));
    } catch {
        // DB unavailable at build time — sitemap will only contain static routes
    }

    return [...staticRoutes, ...propertyRoutes];
}

