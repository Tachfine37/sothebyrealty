'use client';

import { useTranslations } from '@/lib/i18n/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

const DESTINATIONS = [
    {
        id: 'paris',
        nameFr: 'Paris & Île-de-France',
        nameEn: 'Paris & Île-de-France',
        descriptionFr: 'Hôtels particuliers, triplex avec vue sur la Tour Eiffel et propriétés historiques cachées au cœur de la capitale.',
        descriptionEn: 'Private mansions, triplexes with Eiffel Tower views, and hidden historic properties in the heart of the capital.',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1600&q=80',
        propertiesCount: 142
    },
    {
        id: 'french-riviera',
        nameFr: 'Côte d\'Azur & Monaco',
        nameEn: 'French Riviera & Monaco',
        descriptionFr: 'Villas d\'architecte pieds dans l\'eau, demeures Belle Époque et penthouses exclusifs surplombant la Méditerranée.',
        descriptionEn: 'Waterfront architect villas, Belle Époque mansions, and exclusive penthouses overlooking the Mediterranean.',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=1600&q=80',
        propertiesCount: 285
    },
    {
        id: 'french-alps',
        nameFr: 'Alpes Françaises',
        nameEn: 'French Alps',
        descriptionFr: 'Chalets ultra-luxe au pied des pistes de Courchevel, Megève ou Chamonix avec prestations para-hôtelières.',
        descriptionEn: 'Ultra-luxury chalets at the foot of the slopes in Courchevel, Megève, or Chamonix with high-end hotel services.',
        image: 'https://images.unsplash.com/photo-1522855141201-f2f28b5e28a5?w=1600&q=80',
        propertiesCount: 94
    },
    {
        id: 'bordeaux',
        nameFr: 'Bordeaux & Vignobles',
        nameEn: 'Bordeaux & Vineyards',
        descriptionFr: 'Châteaux viticoles, chartreuses girondines historiques et luxueuses propriétés aux portes de Saint-Émilion.',
        descriptionEn: 'Wine estates, historic Girondin chartreuses, and luxurious properties on the outskirts of Saint-Émilion.',
        image: 'https://images.unsplash.com/photo-1590492850986-eede612c6a46?w=1600&q=80',
        propertiesCount: 67
    },
    {
        id: 'provence',
        nameFr: 'Provence & Luberon',
        nameEn: 'Provence & Luberon',
        descriptionFr: 'Mas provençaux authentiques redessinés, bastides d\'époque au milieu des champs de lavande et d\'oliviers.',
        descriptionEn: 'Authentic redesigned Provençal farmhouses, period bastides amidst lavender and olive fields.',
        image: 'https://images.unsplash.com/photo-1555021200-a92c89dbf7c1?w=1600&q=80',
        propertiesCount: 110
    },
    {
        id: 'biarritz',
        nameFr: 'Biarritz & Pays Basque',
        nameEn: 'Biarritz & Basque Country',
        descriptionFr: 'Villas néo-basques face à l\'océan réinventées pour offrir le comble de l\'esthétisme et du luxe décontracté.',
        descriptionEn: 'Oceanfront neo-Basque villas reinvented to offer the pinnacle of aesthetics and relaxed luxury.',
        image: 'https://images.unsplash.com/photo-1574541571597-29007e5b611e?w=1600&q=80',
        propertiesCount: 43
    }
];

export default function DestinationsPage() {
    const { lang } = useTranslations();

    const content = {
        fr: {
            title: 'Nos Destinations d\'Exception',
            subtitle: 'Explorez nos portefeuilles immobiliers à travers les régions les plus prisées de France.',
            viewProperties: 'Voir les Biens',
            properties: 'Propriétés',
            contactExpert: 'Contacter un expert local'
        },
        en: {
            title: 'Our Exceptional Destinations',
            subtitle: 'Explore our real estate portfolios across the most sought-after regions in France.',
            viewProperties: 'View Properties',
            properties: 'Properties',
            contactExpert: 'Contact a local expert'
        }
    }[lang] ?? { title: '', subtitle: '', viewProperties: '', properties: '', contactExpert: '' };

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-luxury-black text-white pt-32 pb-24 px-6 lg:px-12 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block text-[10px] font-semibold tracking-[0.4em] uppercase text-champagne mb-6">
                        Sotheby Realty France
                    </span>
                    <h1 className="font-serif text-5xl md:text-6xl mb-8">{content.title}</h1>
                    <p className="text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                </div>
            </header>

            {/* Destinations Grid */}
            <section className="py-24 max-w-[1400px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                    {DESTINATIONS.map((dest) => (
                        <div key={dest.id} className="group relative bg-gray-50 overflow-hidden flex flex-col cursor-pointer border border-gray-100 hover:shadow-2xl transition-all duration-500">
                            <div className="relative aspect-[16/9] overflow-hidden">
                                <Image
                                    src={dest.image}
                                    alt={lang === 'en' ? dest.nameEn : dest.nameFr}
                                    fill
                                    unoptimized={true}
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                                    <h2 className="font-serif text-3xl md:text-4xl drop-shadow-lg">
                                        {lang === 'en' ? dest.nameEn : dest.nameFr}
                                    </h2>
                                    <div className="text-right hidden sm:block">
                                        <span className="block text-2xl font-light">{dest.propertiesCount}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-champagne font-bold">
                                            {content.properties}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 lg:p-10 flex flex-col flex-grow bg-white relative z-10 transition-transform duration-500">
                                <p className="text-luxury-muted leading-relaxed font-light mb-8 flex-grow">
                                    {lang === 'en' ? dest.descriptionEn : dest.descriptionFr}
                                </p>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                                    <Link href={`/annonces?destination=${dest.id}`} className="text-sm font-semibold uppercase tracking-[0.15em] text-luxury-black hover:text-champagne transition-colors inline-flex items-center">
                                        {content.viewProperties}
                                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </Link>

                                    <Link href="/contact" className="text-xs text-luxury-muted hover:text-champagne transition-colors border-b border-transparent hover:border-champagne">
                                        {content.contactExpert}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
