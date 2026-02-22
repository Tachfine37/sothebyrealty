'use client';

import { useTranslations } from '@/lib/i18n/LanguageContext';
import Link from 'next/link';

export default function CGUPage() {
    const { lang, t } = useTranslations();

    const contentFr = {
        title: "Conditions Générales d'Utilisation",
        lastUpdated: "Dernière mise à jour : 22 Février 2026",
        intro: "Bienvenue sur Sotheby Realty France. Les présentes Conditions Générales d'Utilisation (ci-après les « CGU ») ont pour objet de définir les modalités et conditions de navigation et d'utilisation de notre plateforme.",
        sections: [
            {
                title: "1. Définitions et Interprétation",
                content: "Pour les besoins des présentes CGU, la « Plateforme » désigne le site internet accessible à l'adresse sothebyrealty.fr. L'« Utilisateur » désigne toute personne physique ou morale accédant à la Plateforme. Les « Annonces » désignent les présentations de propriétés de prestige publiées sur la Plateforme."
            },
            {
                title: "2. Objet de la Plateforme et Services",
                content: "Sotheby Realty France est une agence immobilière spécialisée dans les biens de prestige. La Plateforme a pour objectif de présenter notre portefeuille exclusif de propriétés, de permettre la création de comptes pour sauvegarder des favoris, et de faciliter la mise en relation avec nos experts immobiliers."
            },
            {
                title: "3. Obligations de l'Utilisateur",
                content: "L'Utilisateur s'engage à utiliser la Plateforme conformément à sa destination, à ne pas entraver son bon fonctionnement, et à fournir des informations exactes lors de la création d'un compte ou de la soumission d'un formulaire de contact. Toute activité frauduleuse ou utilisation de robots est strictement interdite."
            },
            {
                title: "4. Données Personnelles et Cookies",
                content: "Le traitement des données personnelles est effectué dans le respect du Règlement Général sur la Protection des Données (RGPD). Les Utilisateurs peuvent exercer leurs droits d'accès, de rectification et de suppression en nous contactant à privacy@sothebyrealty.fr."
            },
            {
                title: "5. Propriété Intellectuelle",
                content: "L'ensemble des contenus présents sur la Plateforme (textes, photographies, vidéos, logos, marques) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation, modification ou extraction non autorisée est strictement interdite et pourra faire l'objet de poursuites judiciaires."
            },
            {
                title: "6. Limitation de Responsabilité",
                content: "Sotheby Realty France s'efforce d'assurer l'exactitude des informations publiées. Toutefois, les caractéristiques et les prix des biens immobiliers sont donnés à titre indicatif et ne constituent pas un document contractuel. Notre responsabilité ne saurait être engagée en cas d'interruption temporaire de la Plateforme."
            },
            {
                title: "7. Loi Applicable et Juridiction Compétente",
                content: "Les présentes CGU sont soumises au droit français. En cas de litige non résolu à l'amiable, compétence exclusive est attribuée aux tribunaux du ressort de la Cour d'appel de Paris, France."
            },
            {
                title: "8. Informations de Contact",
                content: "Pour toute question relative aux présentes CGU, vous pouvez nous contacter à l'adresse suivante : legal@sothebyrealty.fr ou par courrier à Sotheby Realty France, Service Juridique, Paris."
            }
        ]
    };

    const contentEn = {
        title: "Terms and Conditions of Use",
        lastUpdated: "Last updated: February 22, 2026",
        intro: "Welcome to Sotheby Realty France. These Terms and Conditions of Use (hereinafter the \"T&C\") aim to define the terms and conditions for navigating and using our platform.",
        sections: [
            {
                title: "1. Definitions and Interpretation",
                content: "For the purposes of these T&C, the \"Platform\" refers to the website accessible at sothebyrealty.fr. The \"User\" refers to any natural or legal person accessing the Platform. \"Listings\" refer to the presentations of prestige properties published on the Platform."
            },
            {
                title: "2. Purpose of the Platform and Services",
                content: "Sotheby Realty France is a real estate agency specializing in luxury properties. The Platform aims to present our exclusive portfolio of properties, allow the creation of accounts to save favorites, and facilitate contact with our real estate experts."
            },
            {
                title: "3. User Obligations",
                content: "The User agrees to use the Platform in accordance with its intended purpose, not to hinder its proper functioning, and to provide accurate information when creating an account or submitting a contact form. Any fraudulent activity or use of bots is strictly prohibited."
            },
            {
                title: "4. Personal Data and Cookies",
                content: "Personal data is processed in accordance with the General Data Protection Regulation (GDPR). Users may exercise their rights of access, rectification, and deletion by contacting us at privacy@sothebyrealty.fr."
            },
            {
                title: "5. Intellectual Property",
                content: "All content on the Platform (text, photographs, videos, logos, trademarks) is protected by intellectual property law. Any unauthorized reproduction, representation, modification, or extraction is strictly prohibited and may be subject to legal action."
            },
            {
                title: "6. Limitation of Liability",
                content: "Sotheby Realty France strives to ensure the accuracy of published information. However, the characteristics and prices of properties are indicative and do not constitute a contractual document. We cannot be held liable for any temporary interruption of the Platform."
            },
            {
                title: "7. Governing Law and Jurisdiction",
                content: "These T&C are governed by French law. In the event of an unresolved amicable dispute, exclusive jurisdiction is granted to the courts of the Court of Appeal of Paris, France."
            },
            {
                title: "8. Contact Information",
                content: "For any questions regarding these T&C, you can contact us at: legal@sothebyrealty.fr or by mail at Sotheby Realty France, Legal Department, Paris."
            }
        ]
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
                    <p className="text-lg font-light leading-relaxed text-luxury-muted">
                        {content.intro}
                    </p>
                </div>

                <div className="space-y-12">
                    {content.sections.map((section, index) => (
                        <section key={index} className="scroll-mt-32" id={`section-${index}`}>
                            <h2 className="font-serif text-2xl mb-4 text-luxury-black">{section.title}</h2>
                            <p className="text-base text-luxury-muted leading-relaxed whitespace-pre-line">
                                {section.content}
                            </p>
                        </section>
                    ))}
                </div>

                <div className="mt-20 p-8 bg-luxury-cream border border-gray-100 text-center">
                    <h3 className="font-serif text-xl mb-3">Besoin d&apos;aide ? / Need help?</h3>
                    <p className="text-sm text-luxury-muted mb-6">
                        {lang === 'fr'
                            ? "Notre service juridique est à votre disposition pour toute précision."
                            : "Our legal department is available for any clarification."}
                    </p>
                    <Link href="/contact" className="btn-primary">
                        {lang === 'fr' ? "Nous Contacter" : "Contact Us"}
                    </Link>
                </div>

            </div>
        </main>
    );
}
