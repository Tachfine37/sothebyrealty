import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { formatPrice, formatPricePerSqm, DESTINATION_LABELS, parseAmenities } from '@/lib/utils';

interface PageProps {
    params: { slug: string };
}

// Use dynamic SSR — property listings change frequently and this avoids
// requiring a live DB connection at build time (works both locally and on Vercel)
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const property = await prisma.property.findUnique({
        where: { slug: params.slug },
        include: { images: { orderBy: { order: 'asc' }, take: 1 } },
    });

    if (!property) return { title: 'Propriété introuvable' };

    return {
        title: `${property.title} | Price on demand`,
        description: property.description.slice(0, 160) + '…',
        openGraph: {
            title: property.title,
            description: property.description.slice(0, 160),
            images: property.images[0] ? [{ url: property.images[0].url }] : [],
            type: 'article',
        },
    };
}

export default async function PropertyDetailPage({ params }: PageProps) {
    const property = await prisma.property.findUnique({
        where: { slug: params.slug, published: true },
        include: {
            images: { orderBy: { order: 'asc' } },
            agent: true,
        },
    });

    if (!property) notFound();

    const similarProperties = await prisma.property.findMany({
        where: {
            published: true,
            destination: property.destination,
            id: { not: property.id },
        },
        include: { images: { orderBy: { order: 'asc' } } },
        take: 3,
        orderBy: { createdAt: 'desc' },
    });

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'RealEstateListing',
        name: property.title,
        url: `https://sothebyrealty.fr/annonces/${property.slug}`,
        description: property.description,
        image: property.images.map((img: any) => img.url),
        offers: {
            '@type': 'Offer',
            price: property.price,
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
        },
        address: {
            '@type': 'PostalAddress',
            streetAddress: property.address ?? '',
            addressLocality: property.city,
            addressCountry: 'FR',
        },
        numberOfRooms: property.rooms,
        floorSize: {
            '@type': 'QuantitativeValue',
            value: property.surface,
            unitCode: 'MTK',
        },
        amenityFeature: parseAmenities(property.amenities).map((a: string) => ({
            '@type': 'LocationFeatureSpecification',
            name: a,
            value: true,
        })),
    };

    const mainImage = property.images[0];

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Header />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-12">
                {/* Title and Actions Row */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
                    <div>
                        <h1 className="font-serif text-4xl text-luxury-black mb-2">{property.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-luxury-muted">
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {property.city}
                            </span>
                            <span>•</span>
                            <span>{property.type}</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 text-sm font-medium text-luxury-black hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                            Save
                        </button>
                        <button className="flex items-center gap-2 text-sm font-medium text-luxury-black hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                            Print
                        </button>
                    </div>
                </div>

                {/* Loziara-style Grid Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[50vh] min-h-[400px] mb-12 rounded-2xl overflow-hidden relative">
                    {/* Main large image */}
                    <div className="md:col-span-2 md:row-span-2 relative h-full">
                        {mainImage ? (
                            <Image src={mainImage.url} alt={mainImage.alt || property.title} fill className="object-cover hover:scale-105 transition-transform duration-500" priority sizes="(max-width: 768px) 100vw, 50vw" />
                        ) : (
                            <div className="w-full h-full bg-gray-100" />
                        )}
                    </div>
                    {/* Secondary images (up to 4) */}
                    {property.images.slice(1, 5).map((img: any, idx: number) => (
                        <div key={img.id} className="relative hidden md:block h-full overflow-hidden">
                            <Image src={img.url} alt={img.alt || ''} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="25vw" />
                        </div>
                    ))}

                    {/* Fill empty spots if less than 5 images */}
                    {Array.from({ length: Math.max(0, 4 - property.images.slice(1).length) }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-gray-100 hidden md:block h-full"></div>
                    ))}

                    <button className="absolute bottom-6 right-6 bg-white px-4 py-2 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 text-luxury-black transition-colors z-10">
                        <svg className="w-4 h-4 border-[1.5px] border-black rounded-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="6" cy="6" r="1" /><circle cx="12" cy="6" r="1" /><circle cx="18" cy="6" r="1" /><circle cx="6" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="18" cy="12" r="1" /><circle cx="6" cy="18" r="1" /><circle cx="12" cy="18" r="1" /><circle cx="18" cy="18" r="1" /></svg>
                        Show all photos
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
                    {/* Main Info Column */}
                    <div className="lg:col-span-2">
                        {/* About / Description */}
                        <section className="mb-12 pb-12 border-b border-gray-200">
                            <h2 className="text-2xl font-serif text-luxury-black mb-6">About this listing</h2>
                            <div className="text-gray-600 leading-relaxed whitespace-pre-line text-[15px]">
                                {property.description}
                            </div>
                        </section>

                        {/* Details */}
                        <section className="mb-12 pb-12 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-luxury-black mb-6">Details</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-[15px] text-gray-700">
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> ID: <span className="font-medium ml-2">{property.reference}</span></li>
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> Guests: <span className="font-medium ml-2">{property.bedrooms * 2}</span></li>
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> Bedrooms: <span className="font-medium ml-2">{property.bedrooms}</span></li>
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> Beds: <span className="font-medium ml-2">{property.bedrooms}</span></li>
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> Bathrooms: <span className="font-medium ml-2">{property.bathrooms}</span></li>
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> Type: <span className="font-medium ml-2">{property.type}</span></li>
                            </ul>
                        </section>

                        {/* Prices */}
                        <section className="mb-12 pb-12 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-luxury-black mb-6">Prices</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-[15px] text-gray-700">
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> night: <span className="font-medium ml-2">Price on demand</span></li>
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> Allow additional guests: <span className="font-medium ml-2">No</span></li>
                            </ul>
                        </section>

                        {/* Features */}
                        {parseAmenities(property.amenities).length > 0 && (
                            <section className="mb-12 pb-12 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-luxury-black mb-6">Features</h3>
                                <p className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-4">Amenities</p>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 text-[15px] text-gray-700">
                                    {parseAmenities(property.amenities).map((amenity: string) => (
                                        <li key={amenity} className="flex items-center gap-3">
                                            <svg className="w-[18px] h-[18px] text-gray-400 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                                            </svg>
                                            {amenity}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Terms & rules */}
                        <section className="mb-12 pb-12 border-b border-gray-200">
                            <h3 className="text-xl font-bold text-luxury-black mb-6">Terms & rules</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-[15px] text-gray-700">
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> Smoking allowed: <span className="font-medium ml-2">No</span></li>
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> Pets allowed: <span className="font-medium ml-2">Yes</span></li>
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> Party allowed: <span className="font-medium ml-2">No</span></li>
                                <li className="flex items-center"><span className="text-gray-400 mr-3">•</span> Children allowed: <span className="font-medium ml-2">Yes</span></li>
                            </ul>
                        </section>

                        {/* Map */}
                        {property.latitude && property.longitude && (
                            <section className="mb-12">
                                <h3 className="text-xl font-bold text-luxury-black mb-6">Location</h3>
                                <div className="h-[400px] w-full rounded-2xl overflow-hidden bg-gray-100">
                                    <iframe
                                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.01},${property.latitude - 0.008},${property.longitude + 0.01},${property.latitude + 0.008}&layer=mapnik&marker=${property.latitude},${property.longitude}`}
                                        className="w-full h-full border-0"
                                        title={`Localisation – ${property.title}`}
                                        loading="lazy"
                                    />
                                </div>
                            </section>
                        )}

                    </div>

                    {/* Sidebar: Availability & Contact */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            {/* Booking / Price Widget */}
                            <div className="border border-gray-200 rounded-2xl p-6 shadow-[0_6px_24px_rgba(0,0,0,0.06)] bg-white">
                                <div className="mb-6">
                                    <span className="text-2xl font-bold text-luxury-black">Price on demand</span>
                                </div>

                                <form action="/api/contact" method="post" className="flex flex-col gap-3">
                                    <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg overflow-hidden mb-0">
                                        <div className="p-3 border-r border-gray-300 bg-white">
                                            <div className="text-[10px] uppercase font-bold text-gray-800 mb-1">Check-in</div>
                                            <input type="date" className="w-full text-sm outline-none text-luxury-black bg-transparent cursor-pointer" />
                                        </div>
                                        <div className="p-3 bg-white">
                                            <div className="text-[10px] uppercase font-bold text-gray-800 mb-1">Check-out</div>
                                            <input type="date" className="w-full text-sm outline-none text-luxury-black bg-transparent cursor-pointer" />
                                        </div>
                                    </div>
                                    <div className="border border-gray-300 rounded-lg p-3 bg-white mb-2">
                                        <div className="text-[10px] uppercase font-bold text-gray-800 mb-1">Guests</div>
                                        <select className="w-full text-sm outline-none text-luxury-black bg-transparent cursor-pointer appearance-none bg-no-repeat bg-[position:right_center] bg-[image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] pr-6">
                                            <option>1 guest</option>
                                            <option>2 guests</option>
                                            <option>3 guests</option>
                                            <option>4+ guests</option>
                                        </select>
                                    </div>

                                    <input type="hidden" name="propertyRef" value={property.reference} />
                                    <button type="button" className="w-full bg-[#E31C5F] hover:bg-[#D01654] text-white font-bold text-[15px] py-3.5 rounded-lg transition-colors mt-2">
                                        Check availability
                                    </button>
                                </form>
                            </div>

                            {/* Agent Widget (Loziara style 'Hosted by') */}
                            {property.agent && (
                                <div className="border border-gray-200 rounded-2xl p-6 bg-white flex flex-col items-center text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                                    <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mb-4 ring-1 ring-gray-200">
                                        {property.agent.photo ? (
                                            <Image src={property.agent.photo} alt={property.agent.name} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-serif text-3xl">
                                                {property.agent.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-xl text-luxury-black mb-1">Hosted by {property.agent.name}</h3>
                                    <p className="text-gray-500 text-[15px] mb-6">{property.agent.title}</p>
                                    <a href={`tel:${property.agent.phone.replace(/\s+/g, '')}`} className="w-full border border-black hover:bg-gray-50 text-black font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                        <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        Contact Host
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Similar Properties */}
                {similarProperties.length > 0 && (
                    <div className="mt-16 pt-16 border-t border-gray-200">
                        <h2 className="text-[26px] font-bold text-luxury-black mb-8">Compare listings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {similarProperties.map((p: any) => (
                                <PropertyCard key={p.id} property={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
