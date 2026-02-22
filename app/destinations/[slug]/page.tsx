import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { prisma } from '@/lib/prisma';
import { DESTINATION_LABELS } from '@/lib/utils';

interface PageProps {
    params: { slug: string };
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const label = DESTINATION_LABELS[params.slug];
    if (!label) return { title: 'Destination inconnue' };
    return {
        title: `Immobilier de luxe ${label}`,
        description: `Découvrez nos propriétés de prestige en ${label}. Villas, appartements, chalets exclusifs. Sotheby Realty France.`,
    };
}

export default async function DestinationPage({ params }: PageProps) {
    const label = DESTINATION_LABELS[params.slug];
    if (!label) notFound();

    const [properties, total] = await Promise.all([
        prisma.property.findMany({
            where: { destination: params.slug, published: true },
            include: { images: { orderBy: { order: 'asc' } } },
            orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
            take: 9,
        }),
        prisma.property.count({ where: { destination: params.slug, published: true } }),
    ]);

    return (
        <>
            <Header />
            <div className="bg-luxury-black pt-32 pb-16">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <nav className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-white/30 mb-6">
                        <Link href="/" className="hover:text-champagne transition-colors">Accueil</Link>
                        <span>›</span>
                        <Link href="/annonces" className="hover:text-champagne transition-colors">Destinations</Link>
                        <span>›</span>
                        <span className="text-champagne">{label}</span>
                    </nav>
                    <span className="section-label text-champagne">Destination</span>
                    <h1 className="font-serif text-5xl text-white font-normal mt-2">{label}</h1>
                    <p className="text-sm text-white/40 mt-3">{total} propriété{total > 1 ? 's' : ''} disponible{total > 1 ? 's' : ''}</p>
                </div>
            </div>

            <div className="max-w-8xl mx-auto px-6 lg:px-12 py-16">
                {properties.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {properties.map((p) => (
                                <PropertyCard key={p.id} property={p} />
                            ))}
                        </div>
                        {total > 9 && (
                            <div className="text-center mt-12">
                                <Link href={`/annonces?destination=${params.slug}`} className="btn-outline">
                                    Voir les {total} propriétés
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20">
                        <p className="font-serif text-2xl text-luxury-black mb-3">Aucune propriété disponible pour cette destination.</p>
                        <Link href="/annonces" className="btn-outline">Voir toutes les annonces</Link>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
