import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Services',
    description: 'Nos services immobilier luxe: vente, acquisition, conseil en investissement, gestion locative prestige. Expertise sur-mesure en France.',
};

const services = [
    {
        number: '01',
        title: 'Vente de Prestige',
        desc: 'Nous valorisons et commercialisons votre bien d\'exception avec une stratégie de mise en marché unique : photographie architecturale, marketing digital ciblé, accès à notre base d\'acheteurs qualifiés dans 28 pays.',
        features: ['Estimation par expert certifié', 'Reportage photo & vidéo drone', 'Marketing international', 'Négociation & suivi juridique'],
        cta: 'Estimer mon bien',
        ctaHref: '/contact?subject=estimation',
        dark: false,
    },
    {
        number: '02',
        title: 'Recherche & Acquisition',
        desc: 'Mandatez nos chasseurs immobiliers pour trouver le bien correspondant exactement à vos critères. Grâce à notre réseau off-market exclusif, nous accédons à des propriétés jamais publiées.',
        features: ['Cahier des charges précis', 'Accès portefeuille off-market', 'Visites organisées', 'Due diligence complète'],
        cta: 'Déposer ma recherche',
        ctaHref: '/contact?subject=acquisition',
        dark: true,
    },
    {
        number: '03',
        title: 'Conseil en Investissement',
        desc: 'Nos experts vous accompagnent dans vos décisions d\'investissement immobilier : analyse de marché, rendements, fiscalité, structuration juridique. Pour un patrimoine immobilier qui performe.',
        features: ['Analyse de marché locale', 'Étude de rentabilité', 'Conseil fiscal & juridique', 'Suivi de portefeuille'],
        cta: 'Consulter un expert',
        ctaHref: '/contact?subject=investissement',
        dark: false,
    },
    {
        number: '04',
        title: 'Gestion Locative Prestige',
        desc: 'Confiez la gestion de votre bien de luxe à notre département dédié. Service 5 étoiles : sélection des locataires, états des lieux, travaux, reporting mensuel. Votre tranquillité d\'esprit garantie.',
        features: ['Sélection locataires premium', 'Gestion des entrées/sorties', 'Maintenance & travaux', 'Rapport mensuel détaillé'],
        cta: 'Gérer mon bien',
        ctaHref: '/contact?subject=gestion',
        dark: true,
    },
];

export default function ServicesPage() {
    return (
        <>
            <Header />
            <div className="bg-luxury-black pt-32 pb-16">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <span className="section-label text-champagne">Notre Approche</span>
                    <h1 className="font-serif text-5xl text-white font-normal mt-2">Nos Services</h1>
                </div>
            </div>

            {services.map((s, i) => (
                <section key={s.number} className={`py-20 ${s.dark ? 'bg-luxury-black' : 'bg-white'}`}>
                    <div className="max-w-8xl mx-auto px-6 lg:px-12">
                        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                            <div>
                                <p className={`font-serif text-7xl font-normal leading-none mb-4 ${s.dark ? 'text-white/10' : 'text-gray-100'}`}>{s.number}</p>
                                <span className="section-label">{s.dark ? <span className="text-champagne">Service</span> : <span className="text-champagne">Service</span>}</span>
                                <h2 className={`section-title mt-2 mb-6 ${s.dark ? 'text-white' : 'text-luxury-black'}`}>{s.title}</h2>
                                <p className={`text-sm leading-relaxed mb-8 ${s.dark ? 'text-white/50' : 'text-luxury-muted'}`}>{s.desc}</p>
                                <ul className="flex flex-col gap-3 mb-10">
                                    {s.features.map((f) => (
                                        <li key={f} className="flex items-center gap-3">
                                            <div className="w-4 h-px bg-champagne flex-shrink-0" />
                                            <span className={`text-sm ${s.dark ? 'text-white/60' : 'text-luxury-muted'}`}>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link href={s.ctaHref} className={s.dark ? 'btn-outline-white' : 'btn-primary'}>{s.cta}</Link>
                            </div>
                            <div className={`h-80 ${s.dark ? 'bg-white/5 border border-white/8' : 'bg-luxury-cream border border-gray-100'} flex items-center justify-center`}>
                                <span className={`font-serif text-8xl ${s.dark ? 'text-white/5' : 'text-gray-200'}`}>{s.number}</span>
                            </div>
                        </div>
                    </div>
                </section>
            ))}

            {/* Process */}
            <section className="py-24 bg-luxury-cream">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <div className="text-center mb-14">
                        <span className="section-label">Comment ça Marche</span>
                        <h2 className="section-title">Notre Processus</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { step: 1, title: 'Premier Contact', desc: 'Échange téléphonique ou en bureau pour comprendre votre projet.' },
                            { step: 2, title: 'Analyse', desc: 'Étude de marché, évaluation du bien, définition de la stratégie.' },
                            { step: 3, title: 'Mise en Marché', desc: 'Activation du réseau, marketing premium, visites qualifiées.' },
                            { step: 4, title: 'Finalisation', desc: 'Négociation, compromis, acte authentique. Notre accompagnement va jusqu\'au bout.' },
                        ].map((p) => (
                            <div key={p.step} className="bg-white border border-gray-100 p-8 text-center hover:border-champagne/30 transition-colors">
                                <div className="w-10 h-10 bg-champagne text-white flex items-center justify-center font-bold text-sm mx-auto mb-5">{p.step}</div>
                                <h3 className="font-serif text-lg mb-3">{p.title}</h3>
                                <p className="text-sm text-luxury-muted leading-relaxed">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
