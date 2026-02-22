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
        title: `${property.title} | ${formatPrice(property.price)}`,
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
        image: property.images.map((img) => img.url),
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

            {/* Gallery */}
            <section className="pt-20" aria-label="Galerie photo">
                {/* Main hero image */}
                <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
                    {mainImage ? (
                        <Image
                            src={mainImage.url}
                            alt={mainImage.alt || property.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-luxury-cream flex items-center justify-center">
                            <span className="text-luxury-muted text-sm">Aucune photo disponible</span>
                        </div>
                    )}
                    {/* Photo count badge */}
                    {property.images.length > 1 && (
                        <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs font-semibold px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-sm">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                            </svg>
                            {property.images.length} photos
                        </div>
                    )}
                </div>

                {/* Thumbnail strip for additional images */}
                {property.images.length > 1 && (
                    <div className="bg-luxury-black">
                        <div className="max-w-8xl mx-auto px-6 lg:px-12">
                            <div className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
                                {property.images.map((img, idx) => (
                                    <a
                                        key={img.id}
                                        href={img.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`relative flex-shrink-0 w-24 h-16 overflow-hidden transition-opacity ${idx === 0 ? 'ring-1 ring-champagne opacity-100' : 'opacity-60 hover:opacity-100'
                                            }`}
                                        title={`Photo ${idx + 1}`}
                                    >
                                        <Image
                                            src={img.url}
                                            alt={img.alt || `Photo ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="96px"
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </section>


            <div className="max-w-8xl mx-auto px-6 lg:px-12 py-12">
                {/* Breadcrumb */}
                <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-[10px] font-medium tracking-wider uppercase text-luxury-muted mb-8">
                    <Link href="/" className="hover:text-champagne transition-colors">Accueil</Link>
                    <span>›</span>
                    <Link href="/annonces" className="hover:text-champagne transition-colors">Annonces</Link>
                    <span>›</span>
                    <Link href={`/destinations/${property.destination}`} className="hover:text-champagne transition-colors">
                        {DESTINATION_LABELS[property.destination] ?? property.destination}
                    </Link>
                    <span>›</span>
                    <span className="text-champagne truncate max-w-[200px]">{property.title}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <main className="lg:col-span-2">
                        <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                            <div>
                                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-luxury-muted mb-1">
                                    {property.reference}
                                </p>
                            </div>
                        </div>

                        <h1 className="font-serif text-3xl md:text-4xl text-luxury-black mb-3">{property.title}</h1>
                        <p className="flex items-center gap-2 text-sm text-luxury-muted mb-8">
                            <svg className="w-4 h-4 text-champagne" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                            </svg>
                            {property.address ?? property.city}
                        </p>

                        {/* Meta bar */}
                        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 border-y border-gray-100 py-6 mb-10">
                            {[
                                { label: 'Surface', value: `${property.surface} m²` },
                                { label: 'Chambres', value: property.bedrooms },
                                { label: 'Salles de bain', value: property.bathrooms },
                                { label: 'Pièces', value: property.rooms },
                                { label: 'DPE', value: property.dpe ?? 'N/A' },
                            ].map((m) => (
                                <div key={m.label} className="text-center">
                                    <p className="font-serif text-xl text-luxury-black mb-1">{m.value}</p>
                                    <p className="text-[10px] font-semibold tracking-wider uppercase text-luxury-muted">{m.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Description */}
                        <div className="mb-10">
                            <h2 className="font-serif text-2xl mb-6">Description du Bien</h2>
                            <div className="prose prose-sm max-w-none text-luxury-muted leading-relaxed">
                                {property.description.split('\n\n').map((para, i) => (
                                    <p key={i} className="mb-4">{para}</p>
                                ))}
                            </div>
                        </div>

                        {/* Amenities */}
                        {parseAmenities(property.amenities).length > 0 && (
                            <div className="mb-10">
                                <h2 className="font-serif text-2xl mb-6">Prestations & Équipements</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {parseAmenities(property.amenities).map((amenity: string) => (
                                        <div key={amenity} className="flex items-center gap-3">
                                            <svg className="w-4 h-4 text-champagne flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="text-sm text-luxury-muted">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Details table */}
                        <div className="mb-10">
                            <h2 className="font-serif text-2xl mb-6">Caractéristiques</h2>
                            <table className="w-full text-sm">
                                <tbody className="divide-y divide-gray-100">
                                    {[
                                        { label: 'Type de bien', value: property.type },
                                        { label: 'Surface habitable', value: `${property.surface} m²` },
                                        { label: 'Pièces', value: property.rooms },
                                        { label: 'Chambres', value: property.bedrooms },
                                        { label: 'Salles de bains', value: property.bathrooms },
                                        { label: 'Ville / Secteur', value: `${property.city}` },
                                        ...(property.dpe ? [{ label: 'DPE', value: property.dpe }] : []),
                                        ...(property.charges ? [{ label: 'Charges mensuelles', value: `${property.charges} €` }] : []),
                                        { label: 'Référence', value: property.reference },
                                    ].map(({ label, value }) => (
                                        <tr key={label}>
                                            <td className="py-3 text-luxury-muted w-1/2">{label}</td>
                                            <td className="py-3 font-semibold text-luxury-black">{String(value)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Map */}
                        {property.latitude && property.longitude && (
                            <div className="mb-10">
                                <h2 className="font-serif text-2xl mb-6">Localisation</h2>
                                <div className="h-80 bg-luxury-cream border border-gray-100 overflow-hidden">
                                    <iframe
                                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${property.longitude - 0.01},${property.latitude - 0.008},${property.longitude + 0.01},${property.latitude + 0.008}&layer=mapnik&marker=${property.latitude},${property.longitude}`}
                                        className="w-full h-full border-0"
                                        title={`Localisation – ${property.title}`}
                                        loading="lazy"
                                    />
                                </div>
                                <p className="text-xs text-luxury-muted mt-2">Adresse exacte communiquée lors de la prise de contact.</p>
                            </div>
                        )}
                    </main>

                    {/* Sticky Sidebar */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 flex flex-col gap-6">
                            {/* Price card */}
                            <div className="border border-gray-100 p-8 bg-white shadow-sm">
                                <p className="font-serif text-3xl text-champagne mb-1">{formatPrice(property.price)}</p>
                                <p className="text-xs text-luxury-muted mb-6">{formatPricePerSqm(property.price, property.surface)}</p>
                                <Link href={`/contact?ref=${property.reference}`} className="btn-primary w-full justify-center mb-3">
                                    Demander une Visite
                                </Link>
                                <a href="tel:+33144778899" className="btn-outline w-full justify-center flex items-center gap-2 text-xs">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.22 2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72" />
                                    </svg>
                                    +33 1 44 77 88 99
                                </a>
                            </div>

                            {/* Agent card */}
                            {property.agent && (
                                <div className="border border-gray-100 p-6">
                                    <div className="flex gap-4 mb-4">
                                        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-luxury-cream flex-shrink-0">
                                            {property.agent.photo ? (
                                                <Image src={property.agent.photo} alt={property.agent.name} fill className="object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-luxury-muted font-serif text-xl">
                                                    {property.agent.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-luxury-black">{property.agent.name}</p>
                                            <p className="text-xs text-luxury-muted">{property.agent.title}</p>
                                            <p className="text-xs text-champagne mt-0.5">{property.agent.phone}</p>
                                        </div>
                                    </div>
                                    {/* Contact mini-form */}
                                    <form action="/api/contact" method="post" className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
                                        <input type="hidden" name="propertyRef" value={property.reference} />
                                        <input type="text" name="name" className="form-input text-xs py-2" placeholder="Votre nom" required />
                                        <input type="email" name="email" className="form-input text-xs py-2" placeholder="Email" required />
                                        <input type="tel" name="phone" className="form-input text-xs py-2" placeholder="Téléphone" />
                                        <textarea name="message" className="form-input form-textarea text-xs py-2 min-h-[80px]"
                                            defaultValue={`Bonjour, je souhaite obtenir plus d'informations concernant "${property.title}" (réf. ${property.reference}).`} />
                                        <button type="submit" className="btn-primary text-[10px] justify-center">Envoyer</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>

                {/* Similar properties */}
                {similarProperties.length > 0 && (
                    <section className="mt-20 pt-12 border-t border-gray-100" aria-labelledby="similar-heading">
                        <div className="flex justify-between items-end mb-10">
                            <div>
                                <span className="section-label">Vous Pourriez Aimer</span>
                                <h2 className="section-title" id="similar-heading">Propriétés Similaires</h2>
                            </div>
                            <Link href={`/destinations/${property.destination}`} className="btn-outline text-xs">
                                Voir la destination
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {similarProperties.map((p) => (
                                <PropertyCard key={p.id} property={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
            <Footer />
        </>
    );
}
