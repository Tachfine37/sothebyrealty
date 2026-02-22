'use client';

import { useTranslations } from '@/lib/i18n/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';

const TEAM_MEMBERS = [
    {
        id: '1',
        name: 'Jean-Philippe Moreau',
        roleFr: 'Président Directeur Général',
        roleEn: 'Chief Executive Officer',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
        quoteFr: 'L\'excellence n\'est pas un acte, c\'est une habitude.',
        quoteEn: 'Excellence is not an act, but a habit.',
        bioFr: 'Fort de 25 ans d\'expérience dans l\'immobilier ultra-luxe, Jean-Philippe a fondé Sotheby Realty France avec une vision claire : redéfinir les standards de l\'accompagnement sur-mesure.',
        bioEn: 'With 25 years of experience in ultra-luxury real estate, Jean-Philippe founded Sotheby Realty France with a clear vision: to redefine the standards of bespoke service.',
    },
    {
        id: '2',
        name: 'Éléonore de Rostand',
        roleFr: 'Directrice des Opérations',
        roleEn: 'Chief Operating Officer',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
        quoteFr: 'La discrétion est la première de nos valeurs.',
        quoteEn: 'Discretion is our foremost value.',
        bioFr: 'Ancienne avocate d\'affaires, Éléonore supervise la structuration juridique et financière des transactions les plus complexes pour notre clientèle internationale.',
        bioEn: 'A former corporate lawyer, Éléonore oversees the legal and financial structuring of the most complex transactions for our international clientele.',
    },
    {
        id: '3',
        name: 'Arthur Delacroix',
        roleFr: 'Directeur du Pôle Paris Rive Droite',
        roleEn: 'Director, Paris Right Bank Division',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80',
        quoteFr: 'Chaque propriété historique possède une âme unique.',
        quoteEn: 'Every historic property possesses a unique soul.',
        bioFr: 'Expert incontesté du triangle d\'or parisien, Arthur et son équipe dénichent les hôtels particuliers les plus exclusifs et les penthouses hors marché.',
        bioEn: 'The undisputed expert of the Parisian Champagneen Triangle, Arthur and his team unearth the most exclusive private mansions and off-market penthouses.',
    },
    {
        id: '4',
        name: 'Camille Leroy-Beaulieu',
        roleFr: 'Directrice Côte d\'Azur & Monaco',
        roleEn: 'Director, French Riviera & Monaco',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
        quoteFr: 'L\'art de vivre méditerranéen dans son expression la plus pure.',
        quoteEn: 'The Mediterranean art of living in its purest expression.',
        bioFr: 'Naviguant entre Cannes, Saint-Tropez et Monaco, Camille accompagne une clientèle exigeante en recherche de villas d\'exception pieds dans l\'eau.',
        bioEn: 'Navigating between Cannes, Saint-Tropez, and Monaco, Camille assists a demanding clientele in search of exceptional waterfront villas.',
    },
    {
        id: '5',
        name: 'Thomas Chen',
        roleFr: 'Responsable Clientèle Asie',
        roleEn: 'Head of Asia Desk',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
        quoteFr: 'Construire des ponts entre les cultures et les patrimoines.',
        quoteEn: 'Building bridges between cultures and heritage.',
        bioFr: 'Trilingue Mandarin, Anglais et Français, Thomas offre un accompagnement stratégique global pour nos grands comptes asiatiques investissant en France.',
        bioEn: 'Trilingual in Mandarin, English, and French, Thomas provides comprehensive strategic support for our major Asian accounts investing in France.',
    },
    {
        id: '6',
        name: 'Sophie Laurent',
        roleFr: 'Expert Vignobles & Domaines',
        roleEn: 'Vineyards & Estates Expert',
        image: 'https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?w=800&q=80',
        quoteFr: 'Le terroir français est un investissement intemporel.',
        quoteEn: 'The French terroir is a timeless investment.',
        bioFr: 'Œnologue de formation, Sophie audite la viabilité et le potentiel des propriétés viticoles bordelaises et provençales avant leur mise sur le marché.',
        bioEn: 'A trained oenologist, Sophie audits the viability and potential of Bordeaux and Provençal wine properties before they are brought to market.',
    }
];

export default function TeamPage() {
    const { lang, t } = useTranslations();

    const content = {
        fr: {
            title: 'L\'Équipe',
            subtitle: 'L\'excellence humaine au service de votre patrimoine immobilier.',
            philosophyTitle: 'Notre Philosophie',
            philosophyText: 'Au-delà des propriétés d\'exception, Sotheby Realty France est avant tout une aventure humaine. Notre équipe rassemble des négociateurs chevronnés, des experts en droit immobilier, des financiers et des architectes. Tous partagent la même exigence inflexible : offrir à nos clients un service d\'hyper-luxe, garantissant discrétion, célérité et sécurité absolue dans chaque transaction.',
            joinUs: 'Rejoindre l\'équipe',
            contactUs: 'Prendre Rendez-vous',
            meetTheTeam: 'Rencontrez nos Experts'
        },
        en: {
            title: 'Our Team',
            subtitle: 'Human excellence dedicated to your real estate portfolio.',
            philosophyTitle: 'Our Philosophy',
            philosophyText: 'Beyond exceptional properties, Sotheby Realty France is primarily a human endeavor. Our team brings together seasoned negotiators, real estate law experts, financiers, and architects. All share the same uncompromising standard: to provide our clients with ultra-luxury service, guaranteeing discretion, speed, and absolute security in every transaction.',
            joinUs: 'Join our team',
            contactUs: 'Schedule a Meeting',
            meetTheTeam: 'Meet our Experts'
        }
    }[lang] ?? { title: 'L\'Équipe', subtitle: '', philosophyTitle: '', philosophyText: '', joinUs: '', contactUs: '', meetTheTeam: '' };

    return (
        <main className="min-h-screen bg-white pt-24 pb-24">
            {/* Header */}
            <header className="bg-luxury-black text-white py-16 md:py-24 px-6 lg:px-12 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block text-[10px] font-semibold tracking-[0.4em] uppercase text-champagne mb-4">
                        Sotheby Realty France
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl mb-6">{content.title}</h1>
                    <p className="text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                </div>
            </header>

            {/* Philosophy Section */}
            <section className="py-20 bg-luxury-cream">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl text-luxury-black mb-8 leading-tight">
                        {content.philosophyTitle}
                    </h2>
                    <div className="w-12 h-px bg-champagne mx-auto mb-8" />
                    <p className="text-lg text-luxury-muted leading-relaxed font-light">
                        {content.philosophyText}
                    </p>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-4xl text-luxury-black">
                        {content.meetTheTeam}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {TEAM_MEMBERS.map((member) => (
                        <div key={member.id} className="group relative flex flex-col items-center">
                            {/* Photo */}
                            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 shadow-xl bg-gray-100 ring-4 ring-offset-4 ring-champagne/0 group-hover:ring-champagne/30 transition-all duration-500">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    unoptimized={true}
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                                />
                            </div>

                            {/* Details */}
                            <div className="text-center bg-white px-2">
                                <h3 className="font-serif text-2xl text-luxury-black mb-2">{member.name}</h3>
                                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-champagne mb-6">
                                    {lang === 'en' ? member.roleEn : member.roleFr}
                                </p>

                                <p className="italic font-serif text-luxury-muted text-base mb-6 px-4">
                                    &ldquo;{lang === 'en' ? member.quoteEn : member.quoteFr}&rdquo;
                                </p>

                                <div className="w-8 h-px bg-gray-200 mx-auto mb-6" />

                                <p className="text-sm text-luxury-muted font-light leading-relaxed line-clamp-4 px-2">
                                    {lang === 'en' ? member.bioEn : member.bioFr}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t border-gray-100 pt-20 pb-10 text-center px-6">
                <h3 className="font-serif text-2xl text-luxury-black mb-6">
                    {lang === 'fr' ? 'Discutons de votre projet' : 'Let\'s Discuss Your Project'}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact" className="btn-primary">
                        {content.contactUs}
                    </Link>
                    <Link href="/contact" className="btn-outline">
                        {content.joinUs}
                    </Link>
                </div>
            </section>
        </main>
    );
}
