'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { isBefore, startOfToday, addMonths } from 'date-fns';
import 'react-day-picker/dist/style.css';

// Mock availability status for demonstration purposes.
// In a real application, this would be fetched from the API based on the propertyId.
type DateStatus = 'available' | 'pending' | 'booked';

const getMockStatus = (date: Date): DateStatus => {
    const day = date.getDate();
    // Deterministic mock generation based on the day of the month
    if (day % 7 === 0 || day % 7 === 1) return 'booked';
    if (day % 13 === 0) return 'pending';
    return 'available';
};

interface AvailabilityCalendarProps {
    propertyId: string;
}

export default function AvailabilityCalendar({ propertyId }: AvailabilityCalendarProps) {
    const [month, setMonth] = useState<Date>(new Date());
    const today = startOfToday();

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_24px_rgba(0,0,0,0.04)] border border-gray-100 p-8 w-full">
            <h2 className="text-xl font-bold text-luxury-black pb-2 mb-6 border-b border-gray-100">
                Availability
            </h2>

            <div className="availability-calendar-wrapper flex flex-col items-center">
                <style>{`
                    .availability-calendar-wrapper .rdp {
                        --rdp-cell-size: 44px;
                        --rdp-accent-color: #dda15e;
                        --rdp-background-color: transparent;
                        margin: 0;
                    }
                    .availability-calendar-wrapper .rdp-month_caption {
                        display: flex;
                        justify-content: center;
                        padding-bottom: 2rem;
                    }
                    .availability-calendar-wrapper .rdp-caption_label {
                        font-size: 1.1rem;
                        font-weight: bold;
                        color: #333333;
                    }
                    .availability-calendar-wrapper .rdp-head_cell {
                        font-size: 0.75rem;
                        font-weight: normal;
                        color: #9ca3af;
                        text-transform: uppercase;
                        padding-bottom: 1rem;
                    }
                    .availability-calendar-wrapper .rdp-nav {
                        display: none; /* Hide default nav, we will build custom below */
                    }
                    .availability-calendar-wrapper .rdp-months {
                        gap: 3rem;
                    }
                    .availability-calendar-wrapper .rdp-cell {
                        padding: 1px;
                    }
                    .availability-calendar-wrapper .rdp-day {
                        width: 100%;
                        height: 100%;
                        border-radius: 4px;
                    }
                    .availability-calendar-wrapper .day-available:not(.rdp-outside) {
                        background-color: #eaf5e0;
                        color: #333;
                    }
                    .availability-calendar-wrapper .day-available:not(.rdp-outside):hover {
                        background-color: #d6ecb8;
                    }
                    .availability-calendar-wrapper .day-pending:not(.rdp-outside) {
                        background-color: #fef0d2;
                        color: #333;
                    }
                    .availability-calendar-wrapper .day-booked:not(.rdp-outside) {
                        background-color: #f3f4f6;
                        color: #9ca3af;
                        text-decoration: line-through;
                        cursor: not-allowed;
                    }
                    @media (max-width: 768px) {
                         .availability-calendar-wrapper .rdp {
                            --rdp-cell-size: 38px;
                         }
                         .availability-calendar-wrapper .rdp-months {
                            flex-direction: column;
                            gap: 2rem;
                         }
                    }
                `}</style>

                <DayPicker
                    mode="single"
                    month={month}
                    onMonthChange={setMonth}
                    numberOfMonths={typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 2}
                    pagedNavigation
                    disableNavigation
                    disabled={[{ before: today }]}
                    modifiers={{
                        available: (date) => getMockStatus(date) === 'available',
                        pending: (date) => getMockStatus(date) === 'pending',
                        booked: (date) => getMockStatus(date) === 'booked',
                    }}
                    modifiersClassNames={{
                        available: 'day-available',
                        pending: 'day-pending',
                        booked: 'day-booked'
                    }}
                />

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-10 mb-8 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#eaf5e0] rounded-sm"></div>
                        <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#fef0d2] rounded-sm"></div>
                        <span>Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#f3f4f6] rounded-sm"></div>
                        <span>Booked</span>
                    </div>
                </div>

                {/* Custom Navigation */}
                <div className="flex items-center justify-between w-full mt-2 border-t border-gray-100 pt-6">
                    <button
                        onClick={() => setMonth(prev => addMonths(prev, -1))}
                        disabled={isBefore(month, new Date(today.getFullYear(), today.getMonth(), 1))}
                        className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-800 hover:border-gray-300 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setMonth(prev => addMonths(prev, 1))}
                        className="w-10 h-10 border border-gray-200 rounded flex items-center justify-center text-gray-400 hover:text-gray-800 hover:border-gray-300 transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
