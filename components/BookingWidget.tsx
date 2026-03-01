'use client';

import { useState, useEffect } from 'react';
import { format, differenceInDays } from 'date-fns';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export default function BookingWidget({ propertyRef, price, propertyTitle }: { propertyRef: string, price: number, propertyTitle?: string }) {
    const [date, setDate] = useState<DateRange | undefined>();
    const [showCalendar, setShowCalendar] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [isAvailabilityChecked, setIsAvailabilityChecked] = useState(false);
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [whatsappDefaultMessage, setWhatsappDefaultMessage] = useState('');

    useEffect(() => {
        fetch('/api/settings/whatsapp')
            .then(r => r.json())
            .then(data => {
                if (data.whatsappNumber) setWhatsappNumber(data.whatsappNumber.replace(/\D/g, ''));
                if (data.whatsappMessage) setWhatsappDefaultMessage(data.whatsappMessage);
            })
            .catch(() => { });
    }, []);

    const handleRequestToBook = () => {
        const number = whatsappNumber || '33600000000'; // fallback
        const checkIn = date?.from ? format(date.from, 'dd/MM/yyyy') : '';
        const checkOut = date?.to ? format(date.to, 'dd/MM/yyyy') : '';
        let message = whatsappDefaultMessage || `Bonjour, je suis intéressé(e) par la propriété`;
        if (propertyTitle) message += ` : ${propertyTitle}`;
        if (checkIn) message += `\nArrivée : ${checkIn}`;
        if (checkOut) message += `\nDépart : ${checkOut}`;
        const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    // Reset availability check if dates change
    useEffect(() => {
        setIsAvailabilityChecked(false);
    }, [date]);

    const nights = date?.from && date?.to ? Math.max(0, differenceInDays(date.to, date.from)) : 0;
    const total = nights * price;

    const formattedPrice = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(price);

    const formattedTotal = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(total);

    return (
        <div className="border border-gray-200 rounded-2xl p-6 shadow-[0_6px_24px_rgba(0,0,0,0.06)] bg-white relative">
            <div className="mb-6 flex justify-between items-center">
                <span className="text-2xl font-bold text-luxury-black">Price on demand</span>
            </div>

            {/* Availability Banner - Top Position */}
            {date?.from && date?.to && isAvailabilityChecked && (
                <div className="mb-4 border border-[#8DC63F] rounded-lg p-4 text-center bg-[#f2f9eb] shadow-sm">
                    <p className="text-[#8DC63F] font-bold text-[15px] flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Your dates are available!
                    </p>
                </div>
            )}

            <form action="/api/contact" method="post" className="flex flex-col gap-4">
                <div className="flex gap-4 relative">
                    {/* Arrive Field */}
                    <div
                        className="flex-1 border border-gray-300 rounded-lg p-3 bg-white flex flex-col gap-1 cursor-pointer hover:border-luxury-black transition-colors"
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        <label className="text-[11px] uppercase font-bold text-gray-800 flex items-center gap-1.5 cursor-pointer">
                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Arrive
                        </label>
                        <div className="text-[15px] text-luxury-black outline-none bg-transparent">
                            {date?.from ? format(date.from, 'dd/MM/yyyy') : <span className="text-gray-400">Add date</span>}
                        </div>
                    </div>

                    {/* Depart Field */}
                    <div
                        className="flex-1 border border-gray-300 rounded-lg p-3 bg-white flex flex-col gap-1 cursor-pointer hover:border-luxury-black transition-colors"
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        <label className="text-[11px] uppercase font-bold text-gray-800 flex items-center gap-1.5 cursor-pointer">
                            <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Depart
                        </label>
                        <div className="text-[15px] text-luxury-black outline-none bg-transparent">
                            {date?.to ? format(date.to, 'dd/MM/yyyy') : <span className="text-gray-400">Add date</span>}
                        </div>
                    </div>

                    {/* Calendar Dropdown */}
                    {showCalendar && (
                        <div className="absolute top-[110%] md:right-0 -left-4 md:left-auto bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-200 p-6 z-50">
                            <div className="flex justify-end mb-2">
                                <button type="button" onClick={() => setShowCalendar(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>
                            <style>{`
                                .rdp { --rdp-cell-size: 40px; --rdp-accent-color: #222222; --rdp-background-color: #E6F3F5; margin: 0; }
                                .rdp-day_selected { font-weight: bold; }
                                .rdp-day_range_middle { background-color: var(--rdp-background-color); color: #222222; border-radius: 0; }
                                .rdp-day_range_start { background-color: var(--rdp-accent-color); color: white; border-top-left-radius: 4px; border-bottom-left-radius: 4px; }
                                .rdp-day_range_end { background-color: var(--rdp-accent-color); color: white; border-top-right-radius: 4px; border-bottom-right-radius: 4px; }
                                .rdp-month_caption { padding-bottom: 1rem; }
                                .rdp-caption_label { font-size: 1.1rem; font-weight: bold; color: #222222; }
                                .rdp-head_cell { font-size: 0.8rem; font-weight: normal; color: #6b7280; text-transform: uppercase; }
                                .rdp-nav_button { color: #6b7280; }
                                .rdp-nav_button:hover { background-color: #f3f4f6; }
                            `}</style>
                            <DayPicker
                                mode="range"
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                                pagedNavigation
                                className="font-sans"
                            />
                        </div>
                    )}
                </div>

                {/* Validation Button shown when dates are selected but not validated yet */}
                {date?.from && date?.to && !isAvailabilityChecked && (
                    <button
                        type="button"
                        onClick={() => setIsAvailabilityChecked(true)}
                        className="w-full bg-luxury-black hover:bg-gray-800 text-white font-bold text-[15px] py-3 rounded-lg transition-colors mt-2"
                    >
                        Check Availability
                    </button>
                )}

                {/* Guests Field */}
                <div className="border border-gray-300 rounded-lg p-3 bg-white flex flex-col gap-1 focus-within:ring-2 focus-within:ring-luxury-black">
                    <label className="text-[11px] uppercase font-bold text-gray-800 flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Guests
                    </label>
                    <select className="w-full text-[15px] outline-none text-luxury-black bg-transparent cursor-pointer appearance-none bg-no-repeat bg-[position:right_center] bg-[image:url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M5%208l5%205%205-5%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%221.5%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] mt-1">
                        <option>1 Adult, 0 Children</option>
                        <option>2 Adults, 0 Children</option>
                        <option>2 Adults, 1 Child</option>
                        <option>2 Adults, 2 Children</option>
                        <option>4 Adults, 0 Children</option>
                    </select>
                </div>

                {/* Price Breakdown Block */}
                {nights > 0 && (
                    <div className="flex flex-col gap-4 mt-2">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-luxury-black">Total</span>
                                <span className="text-[13px] text-gray-500">Includes taxes and fees</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-lg font-bold text-luxury-black">{formattedTotal}</span>
                                <span
                                    className="text-[13px] font-bold text-luxury-black cursor-pointer hover:underline"
                                    onClick={() => setShowDetails(!showDetails)}
                                >
                                    {showDetails ? 'Hide details' : 'View details'}
                                </span>
                            </div>
                        </div>

                        {showDetails && (
                            <>
                                <div className="flex justify-between items-center text-[15px] text-gray-700 mt-2">
                                    <span>{formattedPrice} x {nights} nights</span>
                                    <span>{formattedTotal}</span>
                                </div>

                                <div className="border-b border-gray-200 border-dashed my-2"></div>

                                <div className="flex justify-between items-center text-lg font-bold text-luxury-black">
                                    <span>Sub Total</span>
                                    <span>{formattedTotal}</span>
                                </div>
                            </>
                        )}
                    </div>
                )}

                <input type="hidden" name="propertyRef" value={propertyRef} />
                <button
                    type="button"
                    onClick={handleRequestToBook}
                    className="w-full bg-[#CD9B65] hover:bg-[#b88550] text-white font-bold text-[16px] py-4 rounded-lg transition-colors mt-2"
                >
                    Request to Book
                </button>
                <div className="flex items-center justify-center gap-2 mt-1 text-[14px] text-gray-500">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    You won&apos;t be charged yet
                </div>
            </form>
        </div>
    );
}
