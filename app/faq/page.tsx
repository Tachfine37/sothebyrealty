'use client';

import { useState } from 'react';

const faqCategories = [
    {
        title: 'Recommended for you',
        questions: [
            {
                q: 'How long does the booking process take?',
                a: 'Once you’ve selected a property and submitted your booking request, most hosts respond within 24 hours. Instant booking options are also available for select listings, allowing immediate confirmation.',
            },
            {
                q: 'What methods of payment accepted?',
                a: 'We accept all major credit and debit cards, as well as secure online payment solutions such as Apple Pay and PayPal. All transactions are processed through encrypted gateways to ensure your safety.',
            },
            {
                q: 'What do I do if I receive a tax statement?',
                a: 'Tax statements are provided for transparency and may include local occupancy taxes or service fees. If you have any questions, our support team will gladly help clarify any charges.',
            },
            {
                q: 'Can I use more than one payment method to pay for a reservation?',
                a: 'At this time, payments must be made using a single payment method per reservation. However, you can split payments by creating separate bookings if your stay spans multiple dates.',
            },
            {
                q: 'How do I edit or remove a payment method?',
                a: 'You can update or remove your saved payment methods anytime from your Account Settings → Payments section. Changes are applied instantly to future bookings.',
            },
        ],
    },
    {
        title: 'Booking Questions',
        questions: [
            {
                q: 'Can I make changes to a pending reservation request?',
                a: 'You can modify your request (such as dates or number of guests) before the host accepts it. Once approved, any further changes must be requested through the host or our support team.',
            },
            {
                q: 'How do I cancel a reservation request?',
                a: 'Pending requests can be cancelled directly from your Trips page before they are confirmed. If your booking has already been accepted, please review the property’s cancellation policy.',
            },
            {
                q: 'How do I check the status of my reservation?',
                a: 'Log into your account and visit the Trips section. You’ll see whether your reservation is pending, confirmed, or completed, along with any relevant updates.',
            },
            {
                q: 'How do I find my reservation?',
                a: 'Your booking confirmation and details are available in your profile under Trips. You’ll also receive an email confirmation with all relevant information, including check-in instructions.',
            },
            {
                q: 'When am I charged for a reservation?',
                a: 'You’ll be charged once your booking is confirmed by the host or immediately for instant bookings. A receipt will be sent to your registered email address.',
            },
        ],
    },
    {
        title: 'Help on your reservations',
        questions: [
            {
                q: 'What happens if my host cancels my reservation?',
                a: 'In the rare event a host cancels, you’ll receive a full refund and assistance from our team to help you find a similar or upgraded property for your dates.',
            },
            {
                q: 'What is the Resolution Center?',
                a: 'The Resolution Center is a secure platform where guests and hosts can resolve any booking-related issues, such as damage claims or payment adjustments, with our support team’s guidance.',
            },
            {
                q: 'What should I do if I forgot something at a place I stayed?',
                a: 'Please contact your host directly as soon as possible. If needed, our support team can help coordinate the return of your belongings.',
            },
            {
                q: 'Should I book if I have not heard back from the host?',
                a: 'If your booking request is still pending, there’s no need to take additional action. Most hosts reply within 24 hours. You can also explore properties with Instant Booking for immediate confirmation.',
            },
            {
                q: 'How do I share trip details with others?',
                a: 'You can share your reservation confirmation directly from your Trips page by selecting Share Trip. This allows your guests to view essential details such as check-in times and location.',
            },
        ],
    },
];

export default function FaqPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleOpen = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <main className="min-h-screen bg-white text-luxury-black pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6">
                <header className="mb-16 text-center">
                    <h1 className="text-4xl lg:text-5xl font-serif text-[#002247] mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Whether you’re planning your next getaway or hosting with us, our goal is to make every step effortless and transparent. If you can’t find what you’re looking for, our dedicated team is always here to help.
                    </p>
                </header>

                <div className="space-y-12">
                    {faqCategories.map((category, catIdx) => (
                        <section key={catIdx}>
                            <h2 className="text-2xl font-serif text-[#C9A84C] mb-6">
                                {category.title}
                            </h2>
                            <div className="space-y-4">
                                {category.questions.map((item, qIdx) => {
                                    const id = `${catIdx}-${qIdx}`;
                                    const isOpen = openIndex === id;

                                    return (
                                        <div
                                            key={qIdx}
                                            className="border border-gray-100 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <button
                                                onClick={() => toggleOpen(id)}
                                                className="w-full text-left px-6 py-5 flex justify-between items-center bg-[#F9FAFB] hover:bg-white transition-colors"
                                                aria-expanded={isOpen}
                                            >
                                                <span className="font-medium text-[15px] text-[#002247] pr-8">
                                                    {item.q}
                                                </span>
                                                <span className="flex-shrink-0 text-gray-400">
                                                    <svg
                                                        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </span>
                                            </button>
                                            <div
                                                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                                            >
                                                <div className="px-6 py-5 text-gray-600 text-[14px] leading-relaxed border-t border-gray-100 bg-white">
                                                    {item.a}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
