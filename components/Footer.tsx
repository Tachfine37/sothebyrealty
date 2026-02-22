'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/i18n/LanguageContext';

export default function Footer() {
    const { t } = useTranslations();

    return (
        <footer className="bg-white py-16 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Left Side: Brand & Tagline */}
                    <div className="flex flex-col">
                        <Link href="/" className="block mb-4 no-underline group">
                            <span className="font-serif text-2xl tracking-[0.2em] uppercase text-black group-hover:text-[#C9A84C] transition-colors">SOTHEBY REALTY</span>
                            <span className="block text-[10px] font-medium tracking-[0.25em] uppercase text-black/40 mt-1 group-hover:text-black/60 transition-colors">France · Prestige & Excellence</span>
                        </Link>
                        <p className="text-[#374151] text-sm font-medium mb-12 italic">
                            {t.footer.tagline}
                        </p>

                        <div className="mt-auto pt-8">
                            <p className="text-[#6B7280] text-xs">
                                © 2026 Copyrights by Sotheby&apos;s . All Rights Reserved
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Legal Links */}
                    <div className="flex flex-col">
                        <ul className="space-y-4">
                            {t.footer.cols[0].links.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="flex items-center gap-3 text-[15px] font-bold text-black hover:text-[#C9A84C] transition-colors group"
                                    >
                                        <span className="text-sm font-light text-black/60">&rsaquo;</span>
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
