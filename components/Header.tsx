'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import UserAuthButton from './UserAuthButton';
import { useTranslations } from '@/lib/i18n/LanguageContext';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();
    const isHome = pathname === '/';
    const { t, lang, toggle } = useTranslations();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isTransparent = isHome && !scrolled;

    const navItems = [
        { label: t.nav.home, href: '/' },
        { label: t.nav.listings, href: '/annonces' },
        { label: t.nav.ourTeam, href: '/our-team' },
        { label: t.nav.faq, href: '/faq' },
        { label: t.nav.about, href: '/a-propos' },
        { label: t.nav.contactUs, href: '/contact' },
    ];

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#002247] border-b border-white/10',
                    scrolled ? 'shadow-lg' : ''
                )}
            >
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo — Sotheby's International Realty style */}
                        <Link href="/" className="flex flex-col leading-none no-underline group">
                            <span className="font-serif text-[22px] font-normal text-white tracking-normal leading-tight transition-opacity group-hover:opacity-80">
                                Sotheby&apos;s
                            </span>
                            <span className="text-[8.5px] font-light tracking-[0.28em] uppercase text-white/70 mt-[1px] transition-opacity group-hover:opacity-80">
                                INTERNATIONAL REALTY
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navItems.map((item) => (
                                <div
                                    key={item.href}
                                    className="relative"
                                    onMouseEnter={() => setOpenDropdown(item.label)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors duration-200 flex items-center gap-1 text-white/80 hover:text-white',
                                            pathname.startsWith(item.href) && item.href !== '/' && 'text-white'
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-5">

                            <UserAuthButton isTransparent={true} />


                        </div>

                        {/* Mobile toggle */}
                        <button
                            className="lg:hidden p-2"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Menu"
                            aria-expanded={mobileOpen}
                        >
                            <div className="flex flex-col gap-1.5">
                                <span className={cn('block h-px w-6 transition-all bg-white', mobileOpen && 'rotate-45 translate-y-2')} />
                                <span className={cn('block h-px w-6 transition-all bg-white', mobileOpen && 'opacity-0')} />
                                <span className={cn('block h-px w-6 transition-all bg-white', mobileOpen && '-rotate-45 -translate-y-2')} />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Nav */}
            {mobileOpen && (
                <div className="fixed inset-0 z-40 bg-[#002247] lg:hidden overflow-y-auto">
                    <div className="pt-24 pb-12 px-8">
                        <button
                            onClick={() => setMobileOpen(false)}
                            className="absolute top-6 right-6 text-white/60 hover:text-white"
                            aria-label="Fermer"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <nav className="flex flex-col gap-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="font-serif text-3xl text-white hover:text-champagne transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}


                            {/* Auth button in mobile menu */}
                            <div className="mt-2 pt-6 border-t border-white/10">
                                <UserAuthButton isTransparent={true} />
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
