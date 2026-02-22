import type { Metadata } from 'next';
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google';
import Providers from '@/components/Providers';
import CookieConsent from '@/components/CookieConsent';
import './globals.css';

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    variable: '--font-cormorant',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXTAUTH_URL ?? 'http://localhost:3000'),
    title: {
        default: 'Sotheby Realty France – Immobilier de Luxe',
        template: '%s | Sotheby Realty France',
    },
    description:
        'Sotheby Realty France – Villas, appartements et propriétés de prestige en France. Côte d\'Azur, Paris, Alpes, Bordeaux. Expertise immobilier luxe depuis 2007.',
    keywords: ['immobilier luxe france', 'villa prestige', 'appartement prestige paris', 'côte d\'azur immobilier', 'chalet luxe alpes'],
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        siteName: 'Sotheby Realty France',
        url: process.env.NEXTAUTH_URL ?? 'http://localhost:3000',
    },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
};

import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
            <head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            </head>
            <body className="font-sans antialiased bg-white text-luxury-black flex min-h-screen flex-col">
                <Providers>
                    {children}
                    <CookieConsent />
                    <WhatsAppFloatingButton />
                </Providers>
            </body>
        </html>
    );
}
