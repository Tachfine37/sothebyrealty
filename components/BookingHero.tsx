'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/i18n/LanguageContext';

const DESTINATIONS = [
    { slug: 'cote-dazur', labelFr: "Côte d'Azur", labelEn: "Côte d'Azur" },
    { slug: 'paris', labelFr: 'Paris & Île-de-France', labelEn: 'Paris & Île-de-France' },
    { slug: 'alpes', labelFr: 'Alpes & Savoie', labelEn: 'Alps & Savoy' },
    { slug: 'bordeaux', labelFr: 'Bordeaux', labelEn: 'Bordeaux' },
    { slug: 'provence', labelFr: 'Provence', labelEn: 'Provence' },
];

function CalendarIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
    );
}

function GuestIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function GuestSelector({
    value,
    onChange,
    lang,
}: {
    value: { adults: number; children: number };
    onChange: (v: { adults: number; children: number }) => void;
    lang: string;
}) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const total = value.adults + value.children;
    const labels = {
        adultes: lang === 'fr' ? 'Adultes' : 'Adults',
        enfants: lang === 'fr' ? 'Enfants' : 'Children',
        voyageurs: lang === 'fr' ? (total === 1 ? '1 voyageur' : `${total} voyageurs`) : (total === 1 ? '1 guest' : `${total} guests`),
    };

    return (
        <div ref={ref} className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2.5 w-full bg-white/10 border border-white/20 text-white placeholder-white/50 px-4 h-12 text-sm text-left hover:border-white/40 transition-colors"
            >
                <GuestIcon />
                <span className={total > 0 ? 'text-white' : 'text-white/60'}>
                    {total > 0 ? labels.voyageurs : (lang === 'fr' ? 'Voyageurs' : 'Guests')}
                </span>
            </button>

            {open && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-2xl border border-gray-100 z-50 p-4 min-w-[220px]">
                    {[
                        { key: 'adults', label: labels.adultes, desc: lang === 'fr' ? '18 ans et +' : '18 and older' },
                        { key: 'children', label: labels.enfants, desc: lang === 'fr' ? '0-17 ans' : '0-17 years' }
                    ].map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div>
                                <p className="text-sm font-medium text-gray-900">{label}</p>
                                <p className="text-xs text-gray-400">{desc}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => onChange({ ...value, [key]: Math.max(0, value[key as keyof typeof value] - 1) })}
                                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-champagne hover:text-champagne transition-colors text-lg leading-none disabled:opacity-30"
                                    disabled={value[key as keyof typeof value] === 0}
                                >
                                    −
                                </button>
                                <span className="w-4 text-center text-sm font-medium text-gray-900">
                                    {value[key as keyof typeof value]}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onChange({ ...value, [key]: value[key as keyof typeof value] + 1 })}
                                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-champagne hover:text-champagne transition-colors text-lg leading-none"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function BookingHero() {
    const router = useRouter();
    const { lang } = useTranslations();
    const [destination, setDestination] = useState('');
    const [arrive, setArrive] = useState('');
    const [depart, setDepart] = useState('');
    const [guests, setGuests] = useState({ adults: 0, children: 0 });

    const content = {
        fr: {
            eyebrow: 'Location & Prestige',
            title: 'Réservez & Vivez',
            highlight: 'des Lieux Exceptionnels',
            dest: 'Où souhaitez-vous aller ?',
            arrive: 'Arrivée',
            depart: 'Départ',
            search: 'Chercher',
        },
        en: {
            eyebrow: 'Luxury Rental & Experiences',
            title: 'Book & Experience',
            highlight: 'Amazing Places',
            dest: 'Where to go?',
            arrive: 'Arrive',
            depart: 'Depart',
            search: 'Search',
        }
    }[lang] ?? {
        eyebrow: 'Location & Prestige',
        title: 'Réservez & Vivez',
        highlight: 'des Lieux Exceptionnels',
        dest: 'Où souhaitez-vous aller ?',
        arrive: 'Arrivée',
        depart: 'Départ',
        search: 'Chercher',
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (destination) params.set('destination', destination);
        if (arrive) params.set('arrive', arrive);
        if (depart) params.set('depart', depart);
        const total = guests.adults + guests.children;
        if (total > 0) params.set('guests', String(total));
        router.push(`/annonces?${params.toString()}`);
    };

    return (
        <section
            className="relative py-32 md:py-40 overflow-hidden"
            aria-label="Booking search"
        >
            {/* Background photo */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1484154218962-a197022b5858?w=2000&q=80')" }}
                />
                <div className="absolute inset-0 bg-luxury-black/55" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 text-center">
                <span className="inline-block text-[10px] font-semibold tracking-[0.4em] uppercase text-champagne mb-4">
                    {content.eyebrow}
                </span>
                <h2 className="font-serif text-3xl md:text-5xl text-white mb-10 leading-tight">
                    {content.title}{' '}
                    <em className="italic text-champagne not-italic">{content.highlight}</em>
                </h2>

                {/* Search bar */}
                <form
                    onSubmit={handleSearch}
                    className="bg-white/10 backdrop-blur-md border border-white/15 p-2 flex flex-col lg:flex-row gap-2 items-stretch max-w-5xl mx-auto shadow-2xl"
                >
                    {/* Destination */}
                    <div className="flex-1 min-w-0">
                        <select
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 text-white h-12 px-4 text-sm appearance-none cursor-pointer hover:border-white/40 transition-colors focus:outline-none focus:border-champagne"
                            style={{ colorScheme: 'dark' }}
                        >
                            <option value="" style={{ color: '#000' }}>{content.dest}</option>
                            {DESTINATIONS.map((d) => (
                                <option key={d.slug} value={d.slug} style={{ color: '#000' }}>
                                    {lang === 'en' ? d.labelEn : d.labelFr}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-px bg-white/15 my-1" />

                    {/* Arrive */}
                    <div className="flex-1 min-w-0 relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                            <CalendarIcon />
                        </div>
                        <input
                            type="date"
                            value={arrive}
                            onChange={(e) => setArrive(e.target.value)}
                            placeholder={content.arrive}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-white/10 border border-white/20 text-white h-12 pl-10 pr-4 text-sm hover:border-white/40 transition-colors focus:outline-none focus:border-champagne"
                            style={{ colorScheme: 'dark' }}
                        />
                        {!arrive && (
                            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-white/55 text-sm pointer-events-none">
                                {content.arrive}
                            </span>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-px bg-white/15 my-1" />

                    {/* Depart */}
                    <div className="flex-1 min-w-0 relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
                            <CalendarIcon />
                        </div>
                        <input
                            type="date"
                            value={depart}
                            onChange={(e) => setDepart(e.target.value)}
                            placeholder={content.depart}
                            min={arrive || new Date().toISOString().split('T')[0]}
                            className="w-full bg-white/10 border border-white/20 text-white h-12 pl-10 pr-4 text-sm hover:border-white/40 transition-colors focus:outline-none focus:border-champagne"
                            style={{ colorScheme: 'dark' }}
                        />
                        {!depart && (
                            <span className="absolute left-10 top-1/2 -translate-y-1/2 text-white/55 text-sm pointer-events-none">
                                {content.depart}
                            </span>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-px bg-white/15 my-1" />

                    {/* Guests */}
                    <div className="flex-1 min-w-0">
                        <GuestSelector value={guests} onChange={setGuests} lang={lang} />
                    </div>

                    {/* Search button */}
                    <button
                        type="submit"
                        className="bg-champagne hover:bg-champagne/90 text-white px-8 h-12 font-semibold tracking-[0.15em] text-[11px] uppercase transition-colors flex-shrink-0 flex items-center gap-2 justify-center"
                    >
                        {content.search}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                </form>

                {/* Quick links */}
                <div className="flex flex-wrap justify-center gap-3 mt-6">
                    {DESTINATIONS.map((d) => (
                        <button
                            key={d.slug}
                            type="button"
                            onClick={() => {
                                setDestination(d.slug);
                                router.push(`/annonces?destination=${d.slug}`);
                            }}
                            className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/50 hover:text-champagne transition-colors px-3 py-1 border border-white/10 hover:border-champagne/30"
                        >
                            {lang === 'en' ? d.labelEn : d.labelFr}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
