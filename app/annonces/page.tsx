import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PropertyCard from '@/components/PropertyCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DESTINATION_LABELS, TYPE_LABELS } from '@/lib/utils';


interface SearchParams {
    destination?: string;
    type?: string;
    minPrice?: string;
    maxPrice?: string;
    rooms?: string;
    page?: string;
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
    const dest = searchParams.destination ? DESTINATION_LABELS[searchParams.destination] : null;
    const type = searchParams.type ? TYPE_LABELS[searchParams.type] : null;
    const title = [type, dest, 'Annonces Immobilier Luxe France'].filter(Boolean).join(' · ');
    return {
        title,
        description: `Découvrez notre sélection de ${type ?? 'propriétés'} de luxe${dest ? ` en ${dest}` : ' en France'}. Villas, appartements et chalets prestige.`,
    };
}

const PAGE_SIZE = 9;

export default async function AnnoncesPage({ searchParams }: { searchParams: SearchParams }) {
    const page = parseInt(searchParams.page ?? '1', 10);
    const where = {
        published: true,
        ...(searchParams.destination && { destination: searchParams.destination }),
        ...(searchParams.type && { type: searchParams.type }),
        ...(searchParams.minPrice && { price: { gte: parseInt(searchParams.minPrice) } }),
        ...(searchParams.maxPrice && { price: { lte: parseInt(searchParams.maxPrice) } }),
        ...(searchParams.rooms && { bedrooms: { gte: parseInt(searchParams.rooms) } }),
    };

    const [properties, total] = await Promise.all([
        prisma.property.findMany({
            where,
            include: { images: { orderBy: { order: 'asc' } } },
            orderBy: { createdAt: 'desc' },
            skip: (page - 1) * PAGE_SIZE,
            take: PAGE_SIZE,
        }),
        prisma.property.count({ where }),
    ]);

    const totalPages = Math.ceil(total / PAGE_SIZE);

    return (
        <>
            <Header />
            {/* Page Hero */}
            <div className="bg-luxury-black pt-32 pb-12">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-[10px] font-medium tracking-wider uppercase text-white/30 mb-6">
                        <Link href="/" className="hover:text-champagne transition-colors">Accueil</Link>
                        <span>›</span>
                        <span className="text-white/60">Annonces</span>
                        {searchParams.destination && (
                            <><span>›</span><span className="text-champagne">{DESTINATION_LABELS[searchParams.destination]}</span></>
                        )}
                    </nav>
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mb-3">
                        {searchParams.type ? TYPE_LABELS[searchParams.type] + 's' : 'Toutes nos'} Annonces
                        {searchParams.destination && ` · ${DESTINATION_LABELS[searchParams.destination]}`}
                    </h1>
                    <p className="text-sm text-white/40">{total} propriété{total > 1 ? 's' : ''} trouvée{total > 1 ? 's' : ''}</p>
                </div>
            </div>

            <div className="max-w-8xl mx-auto px-6 lg:px-12 py-12">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="sticky top-24">
                            <h2 className="font-semibold text-xs tracking-[0.2em] uppercase mb-6">Filtres</h2>
                            <form method="get" action="/annonces" className="flex flex-col gap-6">
                                <div>
                                    <label className="form-label">Destination</label>
                                    <select name="destination" className="form-select" defaultValue={searchParams.destination ?? ''}>
                                        <option value="">Toutes</option>
                                        {Object.entries(DESTINATION_LABELS).map(([v, l]) => (
                                            <option key={v} value={v}>{l}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label">Type de Bien</label>
                                    <select name="type" className="form-select" defaultValue={searchParams.type ?? ''}>
                                        <option value="">Tous</option>
                                        {Object.entries(TYPE_LABELS).map(([v, l]) => (
                                            <option key={v} value={v}>{l}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label">Prix Maximum</label>
                                    <select name="maxPrice" className="form-select" defaultValue={searchParams.maxPrice ?? ''}>
                                        <option value="">Sans limite</option>
                                        <option value="2000000">2 M€</option>
                                        <option value="5000000">5 M€</option>
                                        <option value="10000000">10 M€</option>
                                        <option value="20000000">20 M€</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label">Chambres minimum</label>
                                    <select name="rooms" className="form-select" defaultValue={searchParams.rooms ?? ''}>
                                        <option value="">Peu importe</option>
                                        <option value="2">2+</option>
                                        <option value="4">4+</option>
                                        <option value="6">6+</option>
                                        <option value="8">8+</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn-primary justify-center">Appliquer</button>
                                <Link href="/annonces" className="text-xs text-center text-luxury-muted hover:text-champagne transition-colors">
                                    Réinitialiser les filtres
                                </Link>
                            </form>

                            {/* SEO links */}
                            <div className="mt-10 pt-8 border-t border-gray-100">
                                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-luxury-muted mb-4">Par Destination</p>
                                <ul className="flex flex-col gap-2">
                                    {Object.entries(DESTINATION_LABELS).map(([slug, label]) => (
                                        <li key={slug}>
                                            <Link href={`/annonces?destination=${slug}`} className="text-sm text-luxury-muted hover:text-champagne transition-colors">
                                                {label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>

                    {/* Results */}
                    <main className="flex-1">
                        {/* Toolbar */}
                        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                            <p className="text-sm text-luxury-muted">{total} résultats</p>
                            <div className="flex items-center gap-4">
                                <select className="form-select w-auto text-xs py-2" name="sort">
                                    <option value="recent">Plus récent</option>
                                    <option value="price-asc">Prix croissant</option>
                                    <option value="price-desc">Prix décroissant</option>
                                    <option value="surface">Surface</option>
                                </select>
                            </div>
                        </div>

                        {properties.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {properties.map((property) => (
                                        <PropertyCard key={property.id} property={property} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2 mt-12">
                                        {page > 1 && (
                                            <Link href={`/annonces?${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`}
                                                className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-champagne hover:text-champagne transition-colors text-sm">
                                                ←
                                            </Link>
                                        )}
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                            <Link key={p}
                                                href={`/annonces?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
                                                className={`w-10 h-10 border flex items-center justify-center text-sm transition-colors ${p === page ? 'bg-champagne border-champagne text-white' : 'border-gray-200 hover:border-champagne hover:text-champagne'}`}>
                                                {p}
                                            </Link>
                                        ))}
                                        {page < totalPages && (
                                            <Link href={`/annonces?${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`}
                                                className="w-10 h-10 border border-gray-200 flex items-center justify-center hover:border-champagne hover:text-champagne transition-colors text-sm">
                                                →
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-20">
                                <p className="font-serif text-2xl text-luxury-black mb-3">Aucune propriété trouvée.</p>
                                <p className="text-sm text-luxury-muted mb-6">Essayez de modifier vos critères de recherche.</p>
                                <Link href="/annonces" className="btn-outline">Voir toutes les annonces</Link>
                            </div>
                        )}
                    </main>
                </div>
            </div>
            <Footer />
        </>
    );
}
