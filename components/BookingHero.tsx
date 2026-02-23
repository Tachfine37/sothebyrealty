'use client';

import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/lib/i18n/LanguageContext';

const DESTINATIONS = [
    { slug: 'courchevel', labelFr: 'Courchevel', labelEn: 'Courchevel' },
    { slug: 'paris', labelFr: 'Paris', labelEn: 'Paris' },
    { slug: 'st-moritz', labelFr: 'St Moritz', labelEn: 'St Moritz' },
    { slug: 'verbier', labelFr: 'Verbier', labelEn: 'Verbier' },
    { slug: 'zermatt', labelFr: 'Zermatt', labelEn: 'Zermatt' },
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
    value: { adults: number; children: number; pets: number };
    onChange: (v: { adults: number; children: number; pets: number }) => void;
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
    const hasPets = value.pets > 0;

    // Formatting display text
    const displayPartsFr = [];
    const displayPartsEn = [];

    if (value.adults > 0) {
        displayPartsFr.push(value.adults === 1 ? '1 adulte' : `${value.adults} adultes`);
        displayPartsEn.push(value.adults === 1 ? '1 adult' : `${value.adults} adults`);
    }
    if (value.children > 0) {
        displayPartsFr.push(value.children === 1 ? '1 enfant' : `${value.children} enfants`);
        displayPartsEn.push(value.children === 1 ? '1 child' : `${value.children} children`);
    }
    if (value.pets > 0) {
        displayPartsFr.push(value.pets === 1 ? '1 animal' : `${value.pets} animaux`);
        displayPartsEn.push(value.pets === 1 ? '1 pet' : `${value.pets} pets`);
    }

    const displayText = total > 0 || hasPets
        ? (lang === 'fr' ? displayPartsFr.join(', ') : displayPartsEn.join(', '))
        : (lang === 'fr' ? 'Voyageurs' : 'Guests');

    const labels = {
        adultes: lang === 'fr' ? 'Adultes' : 'Adults',
        enfants: lang === 'fr' ? 'Enfants' : 'Children',
        animaux: lang === 'fr' ? 'Animaux' : 'Pets'
    };

    return (
        <div ref={ref} className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2.5 w-full bg-transparent px-4 h-14 text-sm text-left hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-champagne truncate"
            >
                <div className="text-gray-500 pointer-events-none flex-shrink-0">
                    <GuestIcon />
                </div>
                <span className={total > 0 || hasPets ? 'text-gray-900 font-medium truncate' : 'text-gray-500 font-medium truncate'}>
                    {displayText}
                </span>
            </button>

            {open && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-2xl border border-gray-100 z-50 p-6 min-w-[280px]">
                    {/* Adults and Children Steppers */}
                    {[
                        { key: 'adults', label: labels.adultes },
                        { key: 'children', label: labels.enfants }
                    ].map(({ key, label }) => (
                        <div key={key} className="flex items-center justify-between py-4 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <span className="w-4 text-center text-sm font-bold text-gray-900">
                                    {value[key as keyof typeof value]}
                                </span>
                                <span className="text-sm font-medium text-gray-600">{label}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onChange({ ...value, [key]: Math.max(0, value[key as keyof typeof value] - 1) }); }}
                                    className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:border-luxury-black hover:text-luxury-black transition-colors disabled:opacity-30 disabled:hover:border-gray-400 disabled:hover:text-gray-700"
                                    disabled={value[key as keyof typeof value] === 0}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" /></svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); onChange({ ...value, [key]: value[key as keyof typeof value] + 1 }); }}
                                    className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-700 hover:border-luxury-black hover:text-luxury-black transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Pets Toggle */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-100">
                        <span className="text-sm font-medium text-gray-600">{labels.animaux}</span>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer group" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onChange({ ...value, pets: 1 }); }}>
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">Yes</span>
                                <div
                                    className={`w-4 h-4 rounded-full border flex flex-shrink-0 justify-center items-center transition-colors ${value.pets > 0 ? 'border-[#DDA15E] bg-[#DDA15E]' : 'border-gray-300'}`}
                                >
                                    {value.pets > 0 && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer group" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onChange({ ...value, pets: 0 }); }}>
                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">No</span>
                                <div
                                    className={`w-4 h-4 rounded-full border flex flex-shrink-0 justify-center items-center transition-colors ${value.pets === 0 ? 'border-[#DDA15E] bg-[#DDA15E]' : 'border-gray-300'}`}
                                >
                                    {value.pets === 0 && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Apply Button */}
                    <div className="pt-6 pb-2">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="w-full bg-[#DDA15E] hover:bg-[#c99050] text-white font-bold py-3 text-sm rounded-sm transition-colors"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function BookingHero() {
    const router = useRouter();
    const { lang } = useTranslations();
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState<DateRange | undefined>();
    const [showCalendar, setShowCalendar] = useState(false);
    const [guests, setGuests] = useState({ adults: 0, children: 0, pets: 0 });

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
        if (date?.from) params.set('arrive', format(date.from, 'yyyy-MM-dd'));
        if (date?.to) params.set('depart', format(date.to, 'yyyy-MM-dd'));
        const total = guests.adults + guests.children;
        if (total > 0) params.set('guests', String(total));
        if (guests.pets > 0) params.set('pets', String(guests.pets));
        router.push(`/annonces?${params.toString()}`);
    };

    return (
        <section
            className="relative py-32 md:py-40"
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
                    className="flex flex-col lg:flex-row gap-2 items-stretch max-w-5xl mx-auto drop-shadow-xl"
                >
                    {/* Destination */}
                    <div className="flex-1 min-w-0 bg-white rounded-sm overflow-hidden relative">
                        <select
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full bg-transparent text-gray-700 font-medium h-14 px-4 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-champagne"
                        >
                            <option value="" className="text-gray-400">{content.dest}</option>
                            {DESTINATIONS.map((d) => (
                                <option key={d.slug} value={d.slug} className="text-gray-900">
                                    {lang === 'en' ? d.labelEn : d.labelFr}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>
                        </div>
                    </div>

                    {/* Dates Container */}
                    <div className="flex-1 flex flex-col lg:flex-row gap-2 relative">
                        {/* Arrive */}
                        <div
                            className="flex-1 min-w-0 bg-white rounded-sm overflow-hidden relative cursor-pointer"
                            onClick={() => setShowCalendar(!showCalendar)}
                        >
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                <CalendarIcon />
                            </div>
                            <div className="w-full bg-transparent text-gray-700 font-medium h-14 pl-11 pr-4 text-sm flex items-center focus:outline-none focus:ring-2 focus:ring-champagne">
                                {date?.from ? format(date.from, 'MM/dd/yyyy') : <span className="text-gray-400">{content.arrive}</span>}
                            </div>
                        </div>

                        {/* Depart */}
                        <div
                            className="flex-1 min-w-0 bg-white rounded-sm overflow-hidden relative cursor-pointer"
                            onClick={() => setShowCalendar(!showCalendar)}
                        >
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                <CalendarIcon />
                            </div>
                            <div className="w-full bg-transparent text-gray-700 font-medium h-14 pl-11 pr-4 text-sm flex items-center focus:outline-none focus:ring-2 focus:ring-champagne">
                                {date?.to ? format(date.to, 'MM/dd/yyyy') : <span className="text-gray-400">{content.depart}</span>}
                            </div>
                        </div>

                        {/* Calendar Dropdown */}
                        {showCalendar && (
                            <div className="absolute top-[calc(100%+10px)] left-0 lg:left-[-50%] xl:left-0 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 z-[100] text-left w-max">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 font-bold uppercase">{content.arrive}</span>
                                            <span className="text-sm font-bold text-luxury-black">{date?.from ? format(date.from, 'MM/dd/yyyy') : 'Add date'}</span>
                                        </div>
                                        <span className="text-gray-300">-</span>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-gray-500 font-bold uppercase">{content.depart}</span>
                                            <span className="text-sm font-bold text-luxury-black">{date?.to ? format(date.to, 'MM/dd/yyyy') : 'Add date'}</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setDate(undefined); }}
                                        className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-all"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <style>{`
                                    .rdp { --rdp-cell-size: 40px; --rdp-accent-color: #222222; --rdp-background-color: #f3f4f6; margin: 0; }
                                    .rdp-day_selected { font-weight: bold; }
                                    .rdp-day_range_middle { background-color: var(--rdp-background-color); color: #222222; border-radius: 0; }
                                    .rdp-day_range_start { background-color: var(--rdp-accent-color); color: white; border-top-left-radius: 8px; border-bottom-left-radius: 8px; }
                                    .rdp-day_range_end { background-color: var(--rdp-accent-color); color: white; border-top-right-radius: 8px; border-bottom-right-radius: 8px; }
                                    .rdp-month_caption { padding-bottom: 1.5rem; }
                                    .rdp-caption_label { font-size: 1.1rem; font-weight: bold; color: #222222; }
                                    .rdp-head_cell { font-size: 0.8rem; font-weight: normal; color: #6b7280; text-transform: uppercase; padding-bottom: 0.5rem; }
                                    .rdp-nav_button { color: #222222; border: 1px solid #e5e7eb; border-radius: 8px; width: 32px; height: 32px; }
                                    .rdp-nav_button:hover { background-color: #f9fafb; border-color: #d1d5db; }
                                    .rdp-table { border-collapse: separate; border-spacing: 0 4px; }
                                `}</style>
                                <DayPicker
                                    mode="range"
                                    selected={date}
                                    onSelect={setDate}
                                    numberOfMonths={2}
                                    pagedNavigation
                                    className="font-sans"
                                />

                                <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={(e) => { e.preventDefault(); setShowCalendar(false); }}
                                        className="bg-[#DDA15E] hover:bg-[#c99050] text-white font-bold py-2 px-8 text-sm rounded-sm transition-colors"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Guests */}
                    <div className="flex-1 bg-white rounded-sm relative">
                        <GuestSelector value={guests} onChange={setGuests} lang={lang} />
                    </div>

                    {/* Search button */}
                    <button
                        type="submit"
                        className="bg-[#DDA15E] hover:bg-[#c99050] text-white px-8 h-14 font-semibold text-sm rounded-sm transition-colors flex-shrink-0 flex items-center justify-center min-w-[140px]"
                    >
                        {content.search}
                    </button>
                </form>


            </div>
        </section>
    );
}
