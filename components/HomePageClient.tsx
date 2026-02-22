'use client';

import Link from 'next/link';
import Image from 'next/image';
import PropertyCard from '@/components/PropertyCard';
import BookingHero from '@/components/BookingHero';
import { useTranslations } from '@/lib/i18n/LanguageContext';
import { Prisma } from '@prisma/client';

type PropertyWithImages = Prisma.PropertyGetPayload<{ include: { images: true } }>;

const DESTINATION_SLUGS = [
    { slug: 'cote-dazur', count: 218, descFr: "Nice, Cannes, Saint-Tropez, Monaco", descEn: "Nice, Cannes, Saint-Tropez, Monaco" },
    { slug: 'paris', count: 154, descFr: "Immeubles haussmanniens & hôtels particuliers", descEn: "Haussmann buildings & private mansions" },
    { slug: 'alpes', count: 87, descFr: "Courchevel, Megève, Val d'Isère", descEn: "Courchevel, Megève, Val d'Isère" },
    { slug: 'bordeaux', count: 62, descFr: "Domaines, châteaux & vignobles", descEn: "Estates, châteaux & vineyards" },
    { slug: 'provence', count: 45, descFr: "Luberon, Alpilles & villages perchés", descEn: "Luberon, Alpilles & hilltop villages" },
];

const WHY_ICONS = [
    'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
    'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
    'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
];

export default function HomePageClient({ featuredProperties }: { featuredProperties: PropertyWithImages[] }) {
    const { t, lang } = useTranslations();

    const destinations = DESTINATION_SLUGS.map((d) => ({
        ...d,
        label: t.nav.destinationLinks[(d.slug === 'cote-dazur' ? 'cotedazur' : d.slug) as keyof typeof t.nav.destinationLinks] ?? d.slug,
        desc: lang === 'en' ? d.descEn : d.descFr,
    }));

    return (
        <>


            {/* ── BOOKING HERO ──────────────────────────────── */}
            <BookingHero />



            {/* ── FEATURED PROPERTIES ──────────────────────── */}
            <section className="py-24 bg-gray-50/50" aria-labelledby="featured-heading">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2 font-sans tracking-tight" id="featured-heading">Our Featured Homes</h2>
                            <p className="text-gray-500 text-sm font-sans">Hand-picked selection of quality places</p>
                        </div>
                        <div className="flex gap-2">
                            <button type="button" className="px-4 py-1.5 border border-[#DDA15E]/60 text-[#DDA15E] text-sm rounded-sm hover:bg-[#DDA15E] hover:text-white transition-colors disabled:opacity-50">Prev</button>
                            <button type="button" className="px-4 py-1.5 border border-[#DDA15E]/60 text-[#DDA15E] text-sm rounded-sm hover:bg-[#DDA15E] hover:text-white transition-colors">Next</button>
                        </div>
                    </div>
                    {featuredProperties.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredProperties.map((property) => (
                                    <PropertyCard key={property.id} property={property} />
                                ))}
                            </div>
                            <div className="flex justify-center gap-2 mt-8">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20 text-gray-400">
                            <p className="font-sans text-xl mb-3">No featured properties available</p>
                        </div>
                    )}
                </div>
            </section>





            {/* ── TESTIMONIALS ─────────────────────────────── */}
            <section className="py-24 bg-white" aria-labelledby="testimonials-heading">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-[#374151] font-sans tracking-tight mb-3" id="testimonials-heading">Hear From Our Customers</h2>
                        <p className="text-[#6B7280] text-[15px] font-sans">The biggest reward is to satisfy our clients and share their experience with us</p>
                    </div>

                    <div className="flex justify-end gap-2 mb-10">
                        <button type="button" className="px-3 py-1 border border-[#DDA15E]/60 text-[#DDA15E] text-xs font-medium rounded-[2px] hover:bg-[#DDA15E] hover:text-white transition-colors">Prev</button>
                        <button type="button" className="px-3 py-1 border border-[#DDA15E]/60 text-[#DDA15E] text-xs font-medium rounded-[2px] hover:bg-[#DDA15E] hover:text-white transition-colors">Next</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {t.testimonials.items.slice(0, 4).map((testimonial, idx) => (
                            <div key={testimonial.name} className="flex flex-col items-center">
                                {/* Speech Bubble */}
                                <div className="relative bg-white border border-gray-100 rounded-sm shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] p-6 mb-8 w-full text-center">
                                    <p className="text-[13px] text-[#6B7280] leading-relaxed font-sans">
                                        {testimonial.text}
                                    </p>
                                    {/* Down Arrow / Triangle */}
                                    <div className="absolute -bottom-[8px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-gray-100 transform rotate-45 shadow-[2px_2px_2px_-1px_rgba(0,0,0,0.02)]"></div>
                                </div>

                                {/* Avatar & Name */}
                                <div className="text-center">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 mx-auto mb-3 overflow-hidden">
                                        {/* Fallback image if real avatars aren't available */}
                                        <Image
                                            src={`https://i.pravatar.cc/150?u=${idx}`}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                            unoptimized // For pravatar external URL in demo
                                        />
                                    </div>
                                    <h4 className="text-[13px] font-bold text-[#374151] font-sans">{testimonial.name}</h4>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-16">
                        <span className="w-1 h-1 rounded-full bg-[#374151]"></span>
                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    </div>
                </div>
            </section>


        </>
    );
}
