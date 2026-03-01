import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import BookingWidget from '@/components/BookingWidget';
import AvailabilityCalendar from '@/components/AvailabilityCalendar';
import SaveButton from '@/components/SaveButton';
import PropertyGallery from '@/components/PropertyGallery';
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
        take: 4,
        orderBy: { createdAt: 'desc' },
    });

    const parsedAmenities = parseAmenities(property.amenities);

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
        amenityFeature: parsedAmenities.map((a: string) => ({
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
                        <SaveButton />
                        <button className="flex items-center gap-2 text-sm font-medium text-luxury-black hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                            Print
                        </button>
                    </div>
                </div>

                {/* Loziara-style Grid Gallery */}
                <PropertyGallery images={property.images} title={property.title} />

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
                        <section className="mb-12 pb-12 border-b border-gray-200 bg-[#f8f9fa] -mx-6 px-6 sm:-mx-12 sm:px-12 py-12 rounded-2xl">
                            <h3 className="text-xl font-bold text-luxury-black mb-8">Prestations</h3>

                            {parsedAmenities.length > 0 ? (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-[15px] text-gray-600">
                                    {parsedAmenities.map((amenity: string) => (
                                        <li key={amenity} className="flex items-center gap-4">
                                            <svg className="w-4 h-4 text-gray-400 stroke-[1.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                            <span className="font-light">{amenity}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-[15px] text-gray-500 italic">
                                    Aucune prestation n&apos;a été renseignée pour cette propriété.
                                </p>
                            )}
                        </section>

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
                        {(() => {
                            // Fallback coordinates based on destination or city
                            const DESTINATION_COORDS: Record<string, { lat: number, lng: number }> = {
                                'courchevel': { lat: 45.4162, lng: 6.6341 },
                                'paris': { lat: 48.8566, lng: 2.3522 },
                                'cote-dazur': { lat: 43.2677, lng: 6.6407 }, // St Tropez roughly
                                'alpes': { lat: 45.4162, lng: 6.6341 },
                                'bordeaux': { lat: 44.8378, lng: -0.5792 },
                                'provence': { lat: 43.7667, lng: 5.2167 }, // Luberon roughly
                                'verbier': { lat: 46.0968, lng: 7.2286 },
                                'zermatt': { lat: 46.0207, lng: 7.7491 },
                                'st-moritz': { lat: 46.4908, lng: 9.8355 },
                            };

                            const mapLat = property.latitude || DESTINATION_COORDS[property.destination?.toLowerCase()]?.lat;
                            const mapLng = property.longitude || DESTINATION_COORDS[property.destination?.toLowerCase()]?.lng;

                            if (!mapLat || !mapLng) return null;

                            return (
                                <section className="mb-12 pb-12 border-b border-gray-200">
                                    <h3 className="text-xl font-bold text-luxury-black mb-6">Location</h3>
                                    <div className="h-[400px] w-full rounded-2xl overflow-hidden bg-gray-100 relative">
                                        <iframe
                                            src={`https://www.openstreetmap.org/export/embed.html?bbox=${mapLng - 0.01},${mapLat - 0.008},${mapLng + 0.01},${mapLat + 0.008}&layer=mapnik&marker=${mapLat},${mapLng}`}
                                            className="w-full h-full border-0"
                                            title={`Localisation – ${property.title}`}
                                            loading="lazy"
                                        />
                                        <div className="absolute bottom-2 right-2 flex flex-col gap-1 items-end pointer-events-none">
                                            {(!property.latitude && !property.longitude) && (
                                                <span className="bg-white/80 backdrop-blur-sm text-[10px] text-gray-500 px-2 py-1 rounded shadow-sm">
                                                    General destination location
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            );
                        })()}

                        {/* Availability Calendar */}
                        <section className="mb-12">
                            <AvailabilityCalendar propertyId={property.id} />
                        </section>

                        {/* Similar Properties */}
                        {similarProperties.length > 0 && (
                            <section className="mt-12 pt-12 border-t border-gray-200">
                                <h2 className="text-[18px] font-semibold text-luxury-black mb-6">Similar listings</h2>
                                <div className="flex flex-col gap-5">
                                    {similarProperties.map((p: any) => (
                                        <Link href={`/annonces/${p.slug}`} key={p.id} className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow group">
                                            {/* Image Section */}
                                            <div className="relative w-full sm:w-[320px] h-[220px] shrink-0">
                                                {p.images?.[0] ? (
                                                    <Image
                                                        src={p.images[0].url}
                                                        alt={p.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-200" />
                                                )}
                                                {/* Gradient overlay for text */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                                {/* Featured Badge */}
                                                {p.featured && (
                                                    <div className="absolute top-4 left-4 bg-[#1e1e1e] text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                                                        Featured
                                                    </div>
                                                )}

                                                {/* Price */}
                                                <div className="absolute bottom-4 left-4 text-white font-medium text-[20px]">
                                                    Price on demand
                                                </div>
                                            </div>

                                            {/* Details Section */}
                                            <div className="flex-1 p-6 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-[17px] font-bold text-[#1a1a1a] mb-1 group-hover:text-luxury-black transition-colors">{p.title}</h3>
                                                    <p className="text-[13px] text-gray-400 mb-4 line-clamp-1">{p.address ? `${p.address}, ` : ''}{p.city}</p>

                                                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-gray-500 mb-2">
                                                        <span className="flex items-center gap-2">
                                                            <svg className="w-[18px] h-[18px] text-gray-400 stroke-[1.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                                            {p.bedrooms} Bedrooms
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <svg className="w-[18px] h-[18px] text-gray-400 stroke-[1.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                                            {p.bathrooms} Baths
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <svg className="w-[18px] h-[18px] text-gray-400 stroke-[1.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                                            {p.bedrooms * 2} Guests
                                                        </span>
                                                    </div>
                                                    <p className="text-[13px] text-gray-400">{p.type}</p>
                                                </div>

                                                <div className="flex items-center justify-between mt-6 md:mt-2 pt-0">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center text-[10px] font-bold">
                                                            S
                                                        </div>
                                                        <span className="text-[11px] text-gray-400 leading-tight">Hosted By <br /><span className="text-gray-900 font-semibold text-[12px]">Sotheby Realty</span></span>
                                                    </div>
                                                    <button className="text-gray-300 hover:text-gray-500 hover:bg-gray-100 rounded-full p-2 transition-colors">
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar: Availability & Contact */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-8">
                            {/* Booking / Price Widget */}
                            <BookingWidget propertyRef={property.reference!} price={property.price} />


                        </div>
                    </div>
                </div>


            </div>
            <Footer />
        </>
    );
}
