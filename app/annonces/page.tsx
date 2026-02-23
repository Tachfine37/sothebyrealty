import type { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import PropertyCard from '@/components/PropertyCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DESTINATION_LABELS, TYPE_LABELS } from '@/lib/utils';
import ListingsSearchBar from '@/components/ListingsSearchBar';


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
        <div className="bg-[#FAFAFA] min-h-screen font-sans w-full">
            <Header />
            <div className="pt-24 lg:pt-32 pb-20 max-w-[1400px] mx-auto px-6 lg:px-12">

                {/* Horizontal Search Bar */}
                <ListingsSearchBar initialDestination={searchParams.destination} />

                {/* Page Title & Breadcrumbs */}
                <div className="mb-10">
                    <nav className="flex items-center gap-2 text-[13px] text-[#dda15e] mb-3">
                        <Link href="/" className="hover:text-[#c98f4c] transition-colors">Home</Link>
                        <span className="text-gray-400 px-1">›</span>
                        <span className="text-gray-500">Listings</span>
                    </nav>
                    <h1 className="text-[32px] font-semibold text-[#333333] tracking-tight">Listings</h1>
                </div>

                {/* Sorting Bar */}
                <div className="flex items-center justify-between mb-8 pb-4">
                    <span className="text-[13px] text-gray-500">{total} Rentals</span>
                    <div className="flex items-center gap-2 text-[13px] text-gray-600 font-semibold">
                        <span>Sort By:</span>
                        <select name="sort" className="bg-transparent font-medium text-[#333333] outline-none cursor-pointer border-none p-0">
                            <option value="default">Default Order</option>
                            <option value="recent">Recent</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                {properties.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                            {properties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-16">
                                {page > 1 && (
                                    <Link href={`/annonces?${new URLSearchParams({ ...searchParams, page: String(page - 1) })}`}
                                        className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center hover:border-champagne hover:text-champagne transition-colors text-sm">
                                        ←
                                    </Link>
                                )}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <Link key={p}
                                        href={`/annonces?${new URLSearchParams({ ...searchParams, page: String(p) })}`}
                                        className={`w-10 h-10 border rounded flex items-center justify-center text-sm transition-colors ${p === page ? 'bg-champagne border-champagne text-white' : 'border-gray-200 hover:border-champagne hover:text-champagne'}`}>
                                        {p}
                                    </Link>
                                ))}
                                {page < totalPages && (
                                    <Link href={`/annonces?${new URLSearchParams({ ...searchParams, page: String(page + 1) })}`}
                                        className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center hover:border-champagne hover:text-champagne transition-colors text-sm">
                                        →
                                    </Link>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-24 bg-white border border-gray-100 rounded-xl">
                        <p className="text-xl font-medium text-gray-800 mb-3">No properties found.</p>
                        <p className="text-sm text-gray-500 mb-6">Try adjusting your search criteria or removing filters.</p>
                        <Link href="/annonces" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-md font-medium transition-colors text-sm">
                            Clear Filters
                        </Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}
