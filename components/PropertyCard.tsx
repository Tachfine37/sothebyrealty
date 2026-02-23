import Link from 'next/link';
import Image from 'next/image';
import { formatPrice, TYPE_LABELS, DESTINATION_LABELS } from '@/lib/utils';
import type { Property, PropertyImage } from '@prisma/client';

type PropertyWithImages = Property & { images: PropertyImage[] };

interface PropertyCardProps {
    property: PropertyWithImages;
}

export default function PropertyCard({ property }: PropertyCardProps) {
    const mainImage = property.images.sort((a: PropertyImage, b: PropertyImage) => a.order - b.order)[0];
    const typeLabel = TYPE_LABELS[property.type] ?? property.type;

    return (
        <Link href={`/annonces/${property.slug}`} className="group relative block w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            {/* Background Image */}
            {mainImage ? (
                <Image
                    src={mainImage.url}
                    alt={mainImage.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 z-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center z-0">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                </div>
            )}

            {/* Top Right Profile Icon */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center z-20">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none z-10" />

            {/* Bottom Content */}
            <div className="absolute bottom-4 left-5 right-5 z-20 flex flex-col">
                <span className="text-white text-xl font-medium tracking-tight drop-shadow-md mb-0.5">
                    Price on demand
                </span>

                <h3 className="font-bold text-white text-[13px] drop-shadow-md mb-3 line-clamp-1">
                    {property.title}
                </h3>

                <div className="flex items-center justify-between">
                    {/* Amenities Icons */}
                    <div className="flex items-center gap-4 text-white/90 text-[11px] font-medium tracking-wide">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13h18M5 13V6a1 1 0 011-1h12a1 1 0 011 1v7M8 21v-8m8 8v-8M4 17h16" /></svg>
                            {property.bedrooms}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2M8 12h8M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>
                            {property.bathrooms}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                            {property.bedrooms * 2}
                        </span>
                    </div>

                    {/* More Options Dots */}
                    <div className="text-white/70 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
