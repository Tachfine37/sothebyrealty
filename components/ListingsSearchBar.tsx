'use client';

import { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { DESTINATION_LABELS } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ListingsSearchBarProps {
    initialDestination?: string;
}

export default function ListingsSearchBar({ initialDestination }: ListingsSearchBarProps) {
    const router = useRouter();
    const [destination, setDestination] = useState(initialDestination ?? '');
    const [date, setDate] = useState<DateRange | undefined>();
    const [guests, setGuests] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
                setShowCalendar(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (destination) params.set('destination', destination);
        // Note: For a real app, we would pass dates and guests to the URL, but the current backend filtering only supports destination, type, price, rooms.
        // We'll pass them in case they are needed later.
        router.push(`/annonces?${params.toString()}`);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-md shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-10 overflow-visible relative">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row w-full items-stretch relative">

                {/* Destination */}
                <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 p-1 flex items-center">
                    <select
                        name="destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-500 outline-none px-4 py-3 cursor-pointer"
                    >
                        <option value="">Where to go?</option>
                        {Object.entries(DESTINATION_LABELS).map(([v, l]) => (
                            <option key={v} value={v}>{l}</option>
                        ))}
                    </select>
                </div>

                {/* Arrive */}
                <div
                    className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 p-1 flex items-center px-4 gap-3 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="w-full bg-transparent text-sm text-gray-500 outline-none py-3">
                        {date?.from ? format(date.from, 'dd/MM/yyyy') : 'Arrive'}
                    </div>
                </div>

                {/* Depart */}
                <div
                    className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 p-1 flex items-center px-4 gap-3 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setShowCalendar(!showCalendar)}
                >
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div className="w-full bg-transparent text-sm text-gray-500 outline-none py-3">
                        {date?.to ? format(date.to, 'dd/MM/yyyy') : 'Depart'}
                    </div>
                </div>

                {/* Calendar Dropdown */}
                {showCalendar && (
                    <div ref={calendarRef} className="absolute top-[100%] left-0 lg:left-1/4 translate-y-2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
                        <style>{`
                            .rdp { --rdp-cell-size: 38px; --rdp-accent-color: #dda15e; --rdp-background-color: #fdf8f3; margin: 0; }
                            .rdp-day_selected { font-weight: bold; }
                            .rdp-day_range_middle { background-color: var(--rdp-background-color); color: #222222; border-radius: 0; }
                            .rdp-day_range_start { background-color: var(--rdp-accent-color); color: white; border-top-left-radius: 4px; border-bottom-left-radius: 4px; }
                            .rdp-day_range_end { background-color: var(--rdp-accent-color); color: white; border-top-right-radius: 4px; border-bottom-right-radius: 4px; }
                            .rdp-month_caption { padding-bottom: 0.5rem; }
                            .rdp-caption_label { font-size: 1rem; font-weight: bold; color: #333333; }
                            .rdp-head_cell { font-size: 0.75rem; font-weight: normal; color: #6b7280; text-transform: uppercase; }
                        `}</style>
                        <DayPicker
                            mode="range"
                            selected={date}
                            onSelect={setDate}
                            numberOfMonths={window.innerWidth >= 768 ? 2 : 1}
                            defaultMonth={new Date()}
                            disabled={{ before: new Date() }}
                        />
                    </div>
                )}

                {/* Guests */}
                <div className="flex-1 lg:border-r border-gray-200 p-1 flex items-center px-4 gap-3 bg-white">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-500 outline-none placeholder-gray-500 py-3"
                    />
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 p-2 bg-white">
                    <button type="button" className="p-3 border border-gray-200 rounded text-gray-400 hover:text-gray-600 transition-colors ml-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>
                    </button>
                    <button type="submit" className="bg-[#DDA15E] hover:bg-[#C98F4C] text-white px-8 py-3 rounded font-medium transition-colors text-sm">
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
}
