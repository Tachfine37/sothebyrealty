'use client';

import Link from 'next/link';
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
            {/* ── HERO ─────────────────────────────────────── */}
            <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden" aria-label="Hero">
                <div className="absolute inset-0 bg-luxury-black" aria-hidden="true">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70 z-10" />
                    <div
                        className="absolute inset-0 bg-cover bg-center animate-ken-burns"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1800&q=80')" }}
                    />
                </div>

                <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
                    <span className="inline-block text-[10px] font-semibold tracking-[0.4em] uppercase text-champagne mb-6 animate-fade-in">
                        {t.hero.eyebrow}
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-normal leading-[1.05] mb-8 animate-slide-up">
                        {t.hero.line1}<br />
                        <em className="italic text-champagne">{t.hero.line2}</em><br />
                        {t.hero.line3}
                    </h1>
                    <p className="text-sm md:text-base font-light text-white/70 mb-12 max-w-xl mx-auto leading-relaxed animate-fade-in whitespace-pre-line">
                        {t.hero.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                        <Link href="/annonces" className="btn-primary">
                            {t.hero.cta1}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
                        </Link>
                        <Link href="/contact" className="btn-outline-white">
                            {t.hero.cta2}
                        </Link>
                    </div>
                </div>

                {/* Stats bar */}
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/70 backdrop-blur-sm">
                    <div className="max-w-8xl mx-auto px-6 lg:px-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                            {t.stats.map((stat) => (
                                <div key={stat.label} className="py-6 px-6 text-center">
                                    <p className="font-serif text-2xl text-champagne mb-1">{stat.value}</p>
                                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BOOKING HERO ──────────────────────────────── */}
            <BookingHero />

            {/* ── SEARCH BAR ───────────────────────────────── */}
            <section className="bg-white py-8 border-b border-gray-100" aria-label={t.search.search}>
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <form action="/annonces" method="get" className="flex flex-col md:flex-row gap-4 md:items-end">
                        <div className="flex-1 w-full">
                            <label htmlFor="destination" className="form-label">{t.search.destination}</label>
                            <select name="destination" id="destination" className="form-select">
                                <option value="">{t.search.allDestinations}</option>
                                {DESTINATION_SLUGS.map((d) => (
                                    <option key={d.slug} value={d.slug}>
                                        {destinations.find(x => x.slug === d.slug)?.label ?? d.slug}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 w-full">
                            <label htmlFor="type" className="form-label">{t.search.type}</label>
                            <select name="type" id="type" className="form-select">
                                <option value="">{t.search.allTypes}</option>
                                <option value="VILLA">{t.search.types.villa}</option>
                                <option value="APPARTEMENT">{t.search.types.apartment}</option>
                                <option value="CHALET">{t.search.types.chalet}</option>
                                <option value="DOMAINE">{t.search.types.domain}</option>
                                <option value="PENTHOUSE">{t.search.types.penthouse}</option>
                            </select>
                        </div>
                        <div className="flex-1 w-full">
                            <label htmlFor="maxPrice" className="form-label">{t.search.budget}</label>
                            <select name="maxPrice" id="maxPrice" className="form-select">
                                <option value="">{t.search.noBudget}</option>
                                <option value="2000000">2 000 000 €</option>
                                <option value="5000000">5 000 000 €</option>
                                <option value="10000000">10 000 000 €</option>
                                <option value="20000000">20 000 000 €</option>
                            </select>
                        </div>
                        <button type="submit" className="btn-primary whitespace-nowrap w-full md:w-auto mt-2 md:mt-0 justify-center">
                            {t.search.search}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                        </button>
                    </form>
                </div>
            </section>

            {/* ── FEATURED PROPERTIES ──────────────────────── */}
            <section className="py-24 bg-white" aria-labelledby="featured-heading">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <div className="flex justify-between items-end mb-14 flex-wrap gap-6">
                        <div>
                            <span className="section-label">{t.featured.eyebrow}</span>
                            <h2 className="section-title" id="featured-heading">{t.featured.title}</h2>
                        </div>
                        <Link href="/annonces" className="btn-outline">
                            {t.featured.allListings}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
                        </Link>
                    </div>
                    {featuredProperties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-luxury-muted">
                            <p className="font-serif text-2xl mb-3">{t.featured.empty}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ── DESTINATIONS ─────────────────────────────── */}
            <section className="py-24 bg-luxury-cream" aria-labelledby="destinations-heading">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-14">
                        <span className="section-label">{t.destinationsSection.eyebrow}</span>
                        <h2 className="section-title" id="destinations-heading">{t.destinationsSection.title}</h2>
                        <div className="divider-champagne divider-champagne-center" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {destinations.map((d) => (
                            <Link
                                key={d.slug}
                                href={`/destinations/${d.slug}`}
                                className="group border border-gray-200 bg-white p-6 hover:border-champagne hover:shadow-lg transition-all duration-300"
                            >
                                <p className="font-serif text-xl mb-1 text-luxury-black group-hover:text-champagne transition-colors">{d.label}</p>
                                <p className="text-xs text-luxury-muted mb-3 leading-relaxed">{d.desc}</p>
                                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-champagne">{d.count} {t.destinationsSection.properties}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHY US ───────────────────────────────────── */}
            <section className="py-24 bg-luxury-black" aria-labelledby="whyus-heading">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-14">
                        <span className="section-label">{t.whyUs.eyebrow}</span>
                        <h2 className="section-title text-white" id="whyus-heading">{t.whyUs.title}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {t.whyUs.items.map((item, i) => (
                            <div key={item.title} className="text-center">
                                <div className="w-16 h-16 border border-champagne/30 flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-7 h-7 text-champagne" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                        <path d={WHY_ICONS[i]} />
                                    </svg>
                                </div>
                                <h3 className="font-serif text-xl text-white mb-4">{item.title}</h3>
                                <p className="text-sm text-white/50 leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ─────────────────────────────── */}
            <section className="py-24 bg-white" aria-labelledby="testimonials-heading">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-14">
                        <span className="section-label">{t.testimonials.eyebrow}</span>
                        <h2 className="section-title" id="testimonials-heading">{t.testimonials.title}</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t.testimonials.items.map((testimonial) => (
                            <div key={testimonial.name} className="border border-gray-100 p-8 hover:border-champagne/30 transition-colors">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-3.5 h-3.5 text-champagne" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                                <p className="text-sm text-luxury-muted leading-relaxed mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                                <div>
                                    <p className="font-semibold text-sm text-luxury-black">{testimonial.name}</p>
                                    <p className="text-xs text-luxury-muted mt-0.5">{testimonial.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ───────────────────────────────── */}
            <section className="py-24 bg-luxury-black relative overflow-hidden" aria-label="CTA">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #C9A84C 0%, transparent 70%)' }} aria-hidden="true" />
                <div className="relative max-w-3xl mx-auto text-center px-6">
                    <span className="section-label">{t.ctaBanner.eyebrow}</span>
                    <h2 className="section-title text-white mb-6 whitespace-pre-line">{t.ctaBanner.title}</h2>
                    <p className="text-sm text-white/50 mb-10 leading-relaxed">{t.ctaBanner.subtitle}</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact" className="btn-primary">{t.ctaBanner.cta1}</Link>
                        <Link href="/annonces" className="btn-outline-white">{t.ctaBanner.cta2}</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
