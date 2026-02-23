'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWhatsAppSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const phoneNumber = '33753767352';
        const text = `Contact from Website:%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Subject:* ${formData.subject}%0A*Message:* ${formData.message}`;
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    };

    return (
        <div className="bg-[#f9f9f9] min-h-screen font-sans">
            <Header />

            <div className="pt-24 md:pt-32 pb-20 max-w-7xl mx-auto px-6 lg:px-12">

                {/* Embedded Map */}
                <div className="w-full h-64 md:h-96 mb-16 rounded-md overflow-hidden bg-gray-200">
                    <iframe
                        src="https://maps.google.com/maps?q=41%20All.%20de%20la%20Robertsau,%2067000%20Strasbourg&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location"
                    ></iframe>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">

                    {/* Left Column: Form */}
                    <div className="lg:col-span-2">
                        <h1 className="text-2xl font-bold text-[#555555] mb-8">Contact us</h1>

                        <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm text-[#555555] font-medium mb-2">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-200 rounded-md px-4 py-3 bg-white focus:outline-none focus:border-[#DDA15E] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[#555555] font-medium mb-2">Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-200 rounded-md px-4 py-3 bg-white focus:outline-none focus:border-[#DDA15E] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[#555555] font-medium mb-2">Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full border border-gray-200 rounded-md px-4 py-3 bg-white focus:outline-none focus:border-[#DDA15E] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-[#555555] font-medium mb-2">Your Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={8}
                                    className="w-full border border-gray-200 rounded-md px-4 py-3 bg-white focus:outline-none focus:border-[#DDA15E] transition-colors resize-y"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold py-4 rounded-md transition-colors flex justify-center items-center gap-2 mt-4"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 2.17.69 4.18 1.86 5.82L3 21l3.5-.94C8.04 21.32 10.04 22 12 22c5.52 22 10 17.52 10 12S17.52 2 12 2zm4.5 14.5c-.32.91-1.84 1.73-2.58 1.82-.6.07-1.39.2-3.95-1.07-3.08-1.52-5.06-4.66-5.22-4.88-.16-.22-1.25-1.63-1.25-3.1 0-1.48.77-2.22 1.05-2.53.28-.31.6-.39.8-.39.2 0 .4 0 .58.01.2.01.47-.08.73.55.28.67.95 2.32 1.03 2.5.08.18.14.39.02.63-.12.24-.18.39-.36.61-.17.2-.36.46-.51.6-.17.15-.36.32-.16.66.2.34.89 1.48 1.93 2.4 1.34 1.2 2.45 1.57 2.79 1.72.34.15.54.12.74-.1.2-.23.86-1 1.09-1.34.23-.35.46-.29.77-.18.31.11 1.96.93 2.3 1.1s.56.26.64.41c.08.15.08.88-.24 1.79z" clipRule="evenodd" />
                                </svg>
                                Send to WhatsApp
                            </button>
                        </form>
                    </div>

                    {/* Right Column: Corporate Office */}
                    <div className="lg:col-span-1 pt-2">
                        <h2 className="text-[17px] font-bold text-[#888888] mb-6">Corporate Office</h2>

                        <div className="space-y-6 text-[13px] text-[#666666] leading-relaxed">
                            <p className="font-semibold text-[#555555]">BS ONE</p>

                            <p>
                                <span className="font-semibold text-[#555555]">Address:</span> 41 ALLEE DE LA ROBERTSAU 67000<br />STRASBOURG
                            </p>

                            <p>
                                <span className="font-semibold text-[#555555]">Phone:</span> +33 7 53 76 73 52
                            </p>

                            <p>
                                <span className="font-semibold text-[#555555]">Email:</span> contact@sothebyrealty.fr
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
