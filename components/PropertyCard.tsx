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
        <article className="bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full border border-gray-100/50">
            <Link href={`/annonces/${property.slug}`} className="block relative overflow-hidden h-[280px]">
                {mainImage ? (
                    <Image
                        src={mainImage.url}
                        alt={mainImage.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                    </div>
                )}

                {/* Vertical Gradient for bottom text readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

                {/* Badge */}
                <span className="absolute top-4 left-4 bg-[#2A2B39] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-[2px] z-10">
                    FEATURED
                </span>

                {/* Bottom content: Price and Avatar */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10 pointer-events-none">
                    <span className="text-white text-[22px] font-medium tracking-tight drop-shadow-md pb-0.5">
                        Price on demand
                    </span>
                    <div className="w-[30px] h-[30px] rounded-full bg-[#5D19A8] border-[1.5px] border-white flex items-center justify-center text-white flex-shrink-0 shadow-lg pointer-events-auto shadow-black/30">
                        {/* Abstract symbol / logo resembling the one from the image */}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-[#2A2B39] text-[15px] mb-1 truncate">
                    <Link href={`/annonces/${property.slug}`} className="hover:text-[#DDA15E] transition-colors">
                        {property.title}
                    </Link>
                </h3>
                <p className="text-[#9CA3AF] text-[12px] mb-5 truncate font-sans">
                    {property.city}{property.destination ? `, ${DESTINATION_LABELS[property.destination] ?? property.destination}` : ''}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium tracking-tight text-[#6B7280] mb-5 font-sans">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13h18M5 13V6a1 1 0 011-1h12a1 1 0 011 1v7M8 21v-8m8 8v-8M4 17h16" /></svg>
                        {property.bedrooms} Bedrooms
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V6a2 2 0 012-2h12a2 2 0 012 2v2M8 12h8M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" /></svg>
                        {property.bathrooms} Baths
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-[#9CA3AF]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        {property.bedrooms * 2} Guests
                    </span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-[11px] text-[#6B7280] font-sans">
                        {typeLabel}
                    </span>
                    <button type="button" className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors" aria-label="More options">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                    </button>
                </div>
            </div>
        </article>
    );
}
