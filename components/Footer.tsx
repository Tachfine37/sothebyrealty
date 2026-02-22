'use client';

import Link from 'next/link';
import { useTranslations } from '@/lib/i18n/LanguageContext';

export default function Footer() {
    const { t } = useTranslations();

    return (
        <footer className="bg-luxury-black text-white">
            <div className="max-w-8xl mx-auto px-6 lg:px-12 pt-20 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="block mb-6">
                            <span className="font-serif text-base tracking-[0.25em] uppercase text-white">SOTHEBY REALTY</span>
                            <span className="block text-[9px] font-medium tracking-[0.3em] uppercase text-white/40 mt-1">France · Prestige & Excellence</span>
                        </Link>
                        <p className="text-sm text-white/40 leading-relaxed mb-6 italic font-light">{t.footer.tagline}</p>
                        <address className="not-italic text-xs text-white/35 leading-relaxed mb-6">
                            8 Avenue Montaigne<br />
                            75008 Paris<br />
                            <a href="tel:+33144778899" className="hover:text-champagne transition-colors">+33 1 44 77 88 99</a>
                        </address>
                        <div className="flex gap-4">
                            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                                className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:text-champagne hover:border-champagne/40 transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                            </a>
                            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                                className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:text-champagne hover:border-champagne/40 transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                            </a>
                            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube"
                                className="w-8 h-8 border border-white/15 flex items-center justify-center text-white/40 hover:text-champagne hover:border-champagne/40 transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Nav Columns */}
                    {t.footer.cols.map((col) => (
                        <div key={col.heading}>
                            <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-6">{col.heading}</h4>
                            <ul className="space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-white/55 hover:text-champagne transition-colors duration-200">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/25">
                        © {new Date().getFullYear()} Sotheby Realty France. {t.footer.copyright}
                    </p>
                    <p className="text-xs text-white/20">{t.footer.guarantee}</p>
                </div>
            </div>
        </footer>
    );
}
