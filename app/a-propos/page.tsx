import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'À Propos',
    description: 'Sotheby Realty France. 18 ans d\'excellence en immobilier de luxe. 85 conseillers spécialisés, €2.1Md de transactions.',
};

const values = [
    { title: 'Excellence', desc: 'Chaque propriété, chaque transaction est traitée avec le plus haut niveau d\'exigence professionnelle.' },
    { title: 'Discrétion', desc: 'La confidentialité de nos clients est une priorité absolue, inscrite dans notre ADN depuis 2007.' },
    { title: 'Expertise', desc: 'Des conseillers dits "top performers", formés aux marchés locaux et internationaux du luxe.' },
    { title: 'Innovation', desc: 'Visites en réalité virtuelle, data analytics, marketing digital : nous réinventons les codes.' },
    { title: 'Réseau Global', desc: '28 pays, 180 partenaires présélectionnés pour sourcer les meilleurs acheteurs mondiaux.' },
    { title: 'Sur-Mesure', desc: 'Chaque client bénéficie d\'un conseiller dédié et d\'un accompagnement personnalisé de A à Z.' },
];

const team = [
    { name: 'Marie-Hélène Fontaine', title: 'Directrice Générale', territory: 'Paris & Île-de-France', years: 25 },
    { name: 'Étienne Beaumont', title: 'Directeur Côte d\'Azur', territory: 'PACA & Riviera', years: 20 },
    { name: 'Sophie Marchand', title: 'Responsable International', territory: 'Alpes & Marché Asie', years: 15 },
];

export default function AboutPage() {
    return (
        <>
            <Header />
            {/* Hero */}
            <section className="bg-luxury-black pt-32 pb-24">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <span className="section-label text-champagne">Notre Histoire</span>
                    <h1 className="font-serif text-5xl md:text-6xl text-white font-normal mt-2 max-w-3xl leading-tight">
                        Pionniers de l&rsquo;Immobilier<br />de Prestige en France
                    </h1>
                    <div className="w-12 h-px bg-champagne mt-8 mb-8" />
                    <p className="text-base text-white/50 max-w-2xl leading-relaxed">
                        Fondée en 2007, Sotheby Realty France est aujourd&rsquo;hui l&rsquo;agence de référence pour les acquisitions et cessions de biens d&rsquo;exception en France. 18 ans de passion, d&rsquo;expertise et de discrétion au service de clients parmi les plus exigeants du monde.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white py-16 border-b border-gray-100">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '€2.1Md', label: 'Volume de transactions' },
                            { value: '85+', label: 'Conseillers spécialisés' },
                            { value: '18 ans', label: "d'Expertise" },
                            { value: '97%', label: 'Satisfaction client' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <p className="font-serif text-4xl text-champagne mb-2">{stat.value}</p>
                                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-luxury-muted">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 bg-luxury-cream">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-14">
                        <span className="section-label">Notre ADN</span>
                        <h2 className="section-title">Ce qui Nous Définit</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((v) => (
                            <div key={v.title} className="bg-white border border-gray-100 p-8 hover:border-champagne/30 hover:shadow-md transition-all">
                                <div className="w-1 h-8 bg-champagne mb-6" />
                                <h3 className="font-serif text-xl mb-3 text-luxury-black">{v.title}</h3>
                                <p className="text-sm text-luxury-muted leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-24 bg-white">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-14">
                        <span className="section-label">Direction</span>
                        <h2 className="section-title">L&rsquo;Équipe Dirigeante</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((m) => (
                            <div key={m.name} className="border border-gray-100 p-8 text-center hover:border-champagne/30 transition-colors">
                                <div className="w-20 h-20 rounded-full bg-luxury-cream mx-auto mb-5 flex items-center justify-center">
                                    <span className="font-serif text-3xl text-luxury-muted">{m.name.charAt(0)}</span>
                                </div>
                                <h3 className="font-serif text-lg text-luxury-black mb-1">{m.name}</h3>
                                <p className="text-xs font-semibold tracking-wider uppercase text-champagne mb-2">{m.title}</p>
                                <p className="text-xs text-luxury-muted mb-3">{m.territory}</p>
                                <p className="text-xs text-luxury-light">{m.years} ans d&rsquo;expérience</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-luxury-black text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <span className="section-label">Travaillons Ensemble</span>
                    <h2 className="section-title text-white mt-2 mb-8">Prêt à Confier votre Projet ?</h2>
                    <Link href="/contact" className="btn-primary">Prendre Rendez-vous</Link>
                </div>
            </section>
            <Footer />
        </>
    );
}
