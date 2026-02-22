import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePageClient from '@/components/HomePageClient';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Sotheby Realty France – Immobilier de Luxe',
    description:
        "L'immobilier de prestige en France. Villas Côte d'Azur, appartements Paris, chalets Alpes. 850+ propriétés exclusives.",
    openGraph: {
        title: 'Sotheby Realty France – Immobilier de Luxe',
        description: "850+ propriétés de prestige. Côte d'Azur, Paris, Alpes, Bordeaux.",
        images: [{ url: '/og-home.jpg', width: 1200, height: 630 }],
    },
};

const homeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Sotheby Realty France',
    url: 'https://sothebyrealty.fr',
    description: "Agence immobilière de prestige spécialisée dans les propriétés de luxe en France.",
    foundingDate: '2007',
    address: {
        '@type': 'PostalAddress',
        streetAddress: '8 Avenue Montaigne',
        addressLocality: 'Paris',
        postalCode: '75008',
        addressCountry: 'FR',
    },
    telephone: '+33144778899',
    email: 'contact@sothebyrealty.fr',
    areaServed: 'France',
};

export default async function HomePage() {
    const featuredProperties = await prisma.property.findMany({
        where: { featured: true, published: true },
        include: { images: { orderBy: { order: 'asc' } } },
        take: 6,
        orderBy: { createdAt: 'desc' },
    });

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
            />
            <Header />
            <HomePageClient featuredProperties={featuredProperties} />
            <Footer />
        </>
    );
}
