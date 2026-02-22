'use client';

import { useTranslations } from '@/lib/i18n/LanguageContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CookiesPage() {
    const { lang, t } = useTranslations();
    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: true,
        marketing: false,
        personalization: true
    });

    useEffect(() => {
        const savedLayout = localStorage.getItem('cookie-preferences');
        if (savedLayout) {
            try {
                setPreferences({ ...preferences, ...JSON.parse(savedLayout) });
            } catch (e) { }
        }
    }, []);

    const togglePref = (key: keyof typeof preferences) => {
        if (key === 'necessary') return; // Cannot disable necessary
        setPreferences(prev => {
            const upd = { ...prev, [key]: !prev[key] };
            localStorage.setItem('cookie-preferences', JSON.stringify(upd));
            return upd;
        });
    };

    const contentFr = {
        title: "Politique relative aux Cookies",
        lastUpdated: "Dernière mise à jour : 22 Février 2026",
        intro: "Nous utilisons des cookies et d'autres technologies de suivi pour améliorer votre expérience sur notre site web, analyser notre trafic et vous proposer des contenus et publicités personnalisés. Cette page vous explique ce que sont les cookies et comment nous les utilisons.",
        whatAre: "Que sont les cookies ?",
        whatAreDesc: "Les cookies sont de petits fichiers texte qui sont stockés sur votre navigateur ou le disque dur de votre ordinateur ou de votre appareil mobile lorsque vous visitez une page web ou une application. Les cookies agissent comme une mémoire pour un site, permettant à ce site de se souvenir de votre appareil lors de vos visites ultérieures. Les cookies peuvent également se souvenir de vos préférences, améliorer l'expérience utilisateur ou personnaliser les publicités.",
        customize: "Gérer vos préférences",
        types: [
            {
                id: 'necessary',
                title: "Cookies strictement nécessaires",
                desc: "Ces cookies sont essentiels au bon fonctionnement du site et ne peuvent pas être désactivés. Ils sont généralement établis en tant que réponse à des actions que vous avez effectuées, comme la configuration de vos préférences de confidentialité, la connexion ou le remplissage de formulaires.",
                mandatory: true
            },
            {
                id: 'analytics',
                title: "Cookies de performance et d'analyse",
                desc: "Ces cookies nous permettent d'obtenir des statistiques de fréquentation et de déterminer comment les visiteurs interagissent avec le site. Toutes les informations recueillies par ces cookies sont agrégées et donc anonymes.",
                mandatory: false
            },
            {
                id: 'personalization',
                title: "Cookies de fonctionnalité",
                desc: "Ces cookies permettent d'améliorer la fonctionnalité et la personnalisation de notre site. Ils peuvent être activés par nous ou par des tiers dont les services ont été ajoutés à nos pages.",
                mandatory: false
            },
            {
                id: 'marketing',
                title: "Cookies pour la publicité ciblée",
                desc: "Ces cookies peuvent être mis en place par nos partenaires publicitaires. Ils peuvent être utilisés pour établir un profil de vos intérêts et pour vous proposer des publicités pertinentes sur d'autres sites web.",
                mandatory: false
            }
        ],
        save: "Enregistrer mes préférences"
    };

    const contentEn = {
        title: "Cookie Policy",
        lastUpdated: "Last updated: February 22, 2026",
        intro: "We use cookies and other tracking technologies to improve your experience on our website, analyze our traffic, and provide you with personalized content and advertisements. This page explains what cookies are and how we use them.",
        whatAre: "What are cookies?",
        whatAreDesc: "Cookies are small text files that are stored on your browser or the hard drive of your computer or mobile device when you visit a webpage or application. Cookies act as a memory for a site, allowing that site to remember your device on your future visits. Cookies can also remember your preferences, improve user experience, or personalize advertisements.",
        customize: "Manage your preferences",
        types: [
            {
                id: 'necessary',
                title: "Strictly Necessary Cookies",
                desc: "These cookies are essential for the site to function properly and cannot be switched off. They are usually set in response to actions made by you, such as setting your privacy preferences, logging in, or filling out forms.",
                mandatory: true
            },
            {
                id: 'analytics',
                title: "Performance & Analytics Cookies",
                desc: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. All information these cookies collect is aggregated and therefore anonymous.",
                mandatory: false
            },
            {
                id: 'personalization',
                title: "Functional Cookies",
                desc: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
                mandatory: false
            },
            {
                id: 'marketing',
                title: "Targeting & Advertising Cookies",
                desc: "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.",
                mandatory: false
            }
        ],
        save: "Save my preferences"
    };

    const content = lang === 'en' ? contentEn : contentFr;

    return (
        <main className="min-h-screen bg-white pt-32 pb-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-12 text-luxury-black">

                <Link href="/" className="inline-flex items-center gap-2 text-xs text-luxury-muted hover:text-champagne transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                    {t.auth.backToSite}
                </Link>

                <div className="mb-14">
                    <h1 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">{content.title}</h1>
                    <p className="text-sm text-luxury-muted tracking-widest uppercase mb-8">{content.lastUpdated}</p>
                    <div className="w-16 h-px bg-champagne mb-8" />
                    <p className="text-lg font-light leading-relaxed text-luxury-muted mb-8">
                        {content.intro}
                    </p>

                    <h2 className="font-serif text-2xl mb-4 text-luxury-black">{content.whatAre}</h2>
                    <p className="text-base font-light leading-relaxed text-luxury-muted">
                        {content.whatAreDesc}
                    </p>
                </div>

                {/* Preference Center */}
                <div className="border border-gray-100 bg-luxury-cream p-8 md:p-12 mb-12">
                    <h2 className="font-serif text-2xl mb-8 border-b border-gray-200 pb-4">{content.customize}</h2>

                    <div className="space-y-8">
                        {content.types.map((type) => {
                            const isChecked = preferences[type.id as keyof typeof preferences];
                            return (
                                <div key={type.id} className="flex gap-6 items-start">
                                    <div className="pt-1">
                                        <button
                                            type="button"
                                            onClick={() => togglePref(type.id as keyof typeof preferences)}
                                            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-champagne focus:ring-offset-2 ${isChecked ? 'bg-champagne' : 'bg-gray-300'} ${type.mandatory ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={type.mandatory}
                                        >
                                            <span className="sr-only">Toggle {type.title}</span>
                                            <span
                                                aria-hidden="true"
                                                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isChecked ? 'translate-x-4' : 'translate-x-0'}`}
                                            />
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-luxury-black mb-1">
                                            {type.title} {type.mandatory && <span className="text-[10px] font-normal tracking-wider text-champagne uppercase ml-2 px-1.5 py-0.5 bg-champagne/10">Toujours actif</span>}
                                        </h3>
                                        <p className="text-sm text-luxury-muted leading-relaxed">
                                            {type.desc}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-20 p-8 border border-gray-100 text-center bg-white shadow-sm">
                    <h3 className="font-serif text-xl mb-3">Besoin d&apos;aide ? / Need help?</h3>
                    <p className="text-sm text-luxury-muted mb-6">
                        {lang === 'fr'
                            ? "Notre service juridique est à votre disposition pour toute précision sur vos données."
                            : "Our legal department is available for any clarification regarding your data."}
                    </p>
                    <Link href="/contact" className="btn-primary">
                        {lang === 'fr' ? "Nous Contacter" : "Contact Us"}
                    </Link>
                </div>

            </div>
        </main>
    );
}
