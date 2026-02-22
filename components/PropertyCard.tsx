import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, TYPE_LABELS, DESTINATION_LABELS } from '@/lib/utils';
import type { Property, PropertyImage } from '@prisma/client';

type PropertyWithImages = Property & { images: PropertyImage[] };

interface PropertyCardProps {
    property: PropertyWithImages;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const mainImage = property.images.sort((a, b) => a.order - b.order)[0];
    const typeLabel = TYPE_LABELS[property.type] ?? property.type;

    return (
        <article className="property-card">
            <Link href={`/annonces/${property.slug}`} className="block relative overflow-hidden h-64">
                {mainImage ? (
                    <Image
                        src={mainImage.url}
                        alt={mainImage.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-luxury-cream flex items-center justify-center">
                        <svg className="w-12 h-12 text-luxury-light" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                    </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Badge */}
                {property.badge && (
                    <span className="absolute top-4 left-4 badge-champagne text-[9px] tracking-[0.2em]">
                        {property.badge}
                    </span>
                )}

                {/* Save button */}
                <button
                    className="absolute top-4 right-4 w-8 h-8 bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
                    aria-label="Sauvegarder"
                    type="button"
                >
                    <svg className="w-4 h-4 text-luxury-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </button>

                {/* Type label */}
                <span className="absolute bottom-4 left-4 text-[9px] font-semibold tracking-[0.2em] uppercase text-white/80">
                    {typeLabel}
                </span>
            </Link>

            <div className="p-6">
                <p className="font-serif text-xl text-champagne mb-2">{formatPrice(property.price)}</p>
                <h3 className="font-serif text-lg leading-snug mb-2">
                    <Link href={`/annonces/${property.slug}`} className="text-luxury-black hover:text-champagne transition-colors">
                        {property.title}
                    </Link>
                </h3>
                <p className="flex items-center gap-1.5 text-xs text-luxury-muted mb-4">
                    <svg className="w-3.5 h-3.5 text-champagne flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    {property.city}
                    {property.destination && ` · ${DESTINATION_LABELS[property.destination] ?? property.destination}`}
                </p>

                <div className="flex items-center gap-4 text-xs text-luxury-muted border-t border-gray-100 pt-4">
                    <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                        {property.bedrooms} ch.
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M4 12h16M4 6h16M4 18h7" />
                        </svg>
                        {property.bathrooms} sdb.
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                        </svg>
                        {property.surface} m²
                    </span>
                </div>
            </div>
        </article>
    );
}
