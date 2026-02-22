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
        {
            label: t.nav.listings,
            href: '/annonces',
            children: [
                { label: t.nav.listingTypes.villas, href: '/annonces?type=VILLA' },
                { label: t.nav.listingTypes.apartments, href: '/annonces?type=APPARTEMENT' },
                { label: t.nav.listingTypes.chalets, href: '/annonces?type=CHALET' },
                { label: t.nav.listingTypes.domains, href: '/annonces?type=DOMAINE' },
                { label: t.nav.listingTypes.penthouses, href: '/annonces?type=PENTHOUSE' },
            ],
        },
        {
            label: t.nav.destinations,
            href: '/destinations',
            children: [
                { label: t.nav.destinationLinks.paris, href: '/destinations/paris' },
                { label: t.nav.destinationLinks.cotedazur, href: '/destinations/cote-dazur' },
                { label: t.nav.destinationLinks.alpes, href: '/destinations/alpes' },
                { label: t.nav.destinationLinks.bordeaux, href: '/destinations/bordeaux' },
                { label: t.nav.destinationLinks.provence, href: '/destinations/provence' },
            ],
        },
        { label: t.nav.services, href: '/services' },
        { label: t.nav.about, href: '/a-propos' },
        { label: t.nav.contact, href: '/contact' },
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
                                INTERNATIONAL REALTY — France
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
                                        {item.children && (
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        )}
                                    </Link>

                                    {/* Dropdown */}
                                    {item.children && openDropdown === item.label && (
                                        <div className="absolute top-full left-0 mt-2 w-56 bg-[#002247] border border-white/20 shadow-xl py-2 z-50">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    href={child.href}
                                                    className="block px-5 py-2.5 text-[11px] font-medium tracking-wider text-white/70 hover:text-white hover:bg-white/10 transition-colors duration-150"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Desktop CTA */}
                        <div className="hidden lg:flex items-center gap-5">
                            {/* Language toggle */}
                            <button
                                onClick={toggle}
                                className="text-[10px] font-semibold tracking-[0.2em] transition-colors flex items-center gap-1 text-white/60 hover:text-white"
                                title={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
                            >
                                <span className={lang === 'fr' ? 'text-white' : ''}> FR</span>
                                <span className="opacity-40">|</span>
                                <span className={lang === 'en' ? 'text-white' : ''}>EN</span>
                            </button>

                            <UserAuthButton isTransparent={true} />

                            <Link
                                href="/contact"
                                className="btn-sm text-[10px] tracking-widest btn-outline-white"
                            >
                                {t.nav.contactUs}
                            </Link>
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
                            <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-4 justify-center">
                                {t.nav.contactUs}
                            </Link>
                            {/* Language toggle for mobile */}
                            <button
                                onClick={toggle}
                                className="flex items-center gap-2 text-sm text-white/50 hover:text-white mt-2"
                            >
                                <span className={lang === 'fr' ? 'text-champagne font-semibold' : ''}>Français</span>
                                <span className="opacity-30">|</span>
                                <span className={lang === 'en' ? 'text-champagne font-semibold' : ''}>English</span>
                            </button>
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
