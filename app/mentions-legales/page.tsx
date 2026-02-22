'use client';

import { useTranslations } from '@/lib/i18n/LanguageContext';
import Link from 'next/link';

export default function MentionsLegalesPage() {
    const { lang, t } = useTranslations();

    const content = {
        fr: {
            title: 'Mentions Légales',
            lastUpdated: 'Dernière mise à jour : 22 Février 2026',
            sections: [
                {
                    title: '1. Informations légales de l\'éditeur',
                    content: `Le site internet sothebyrealty.fr est édité par la société Sotheby Realty France SAS, société par actions simplifiée au capital de 500 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 842 156 478 RCS Paris.

Siège social : 8 Avenue Montaigne, 75008 Paris, France
Téléphone : +33 1 44 77 88 99
E-mail : contact@sothebyrealty.fr
Directeur de la publication : Jean-Philippe Moreau
Numéro de carte professionnelle : CPI 7501 2021 000 012 345 (Transactions sur immeubles et fonds de commerce)
Garantie financière : GALIAN – 89, rue de la Boétie, 75008 Paris`
                },
                {
                    title: '2. Hébergement',
                    content: `Le site est hébergé par :
Vercel Inc.
440 N Barranca Ave #4133
Covina, CA 91723, USA
support.vercel.com

La base de données est hébergée par :
Supabase, Inc.
970 Toa Payoh North, Singapore 318992`
                },
                {
                    title: '3. Propriété intellectuelle',
                    content: `L'ensemble des éléments constituant ce site (textes, graphiques, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses) est la propriété exclusive de Sotheby Realty France ou de ses partenaires. Ces éléments sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.

Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Sotheby Realty France.`
                },
                {
                    title: '4. Responsabilité',
                    content: `Sotheby Realty France s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, elle ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site. En conséquence, Sotheby Realty France décline toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur ce site.

Les informations présentes sur ce site ne constituent pas un document contractuel. Les prix et caractéristiques des biens sont donnés à titre indicatif et sont susceptibles d'être modifiés sans préavis.`
                },
                {
                    title: '5. Liens hypertextes',
                    content: `La création de liens hypertextes pointant vers le site sothebyrealty.fr est soumise à l'accord préalable et écrit de Sotheby Realty France. Les liens vers des sites tiers présents sur ce site sont fournis à titre informatif. Sotheby Realty France ne saurait être tenue responsable du contenu de ces sites.`
                },
                {
                    title: '6. Données personnelles',
                    content: `Le traitement de vos données personnelles est décrit dans notre Politique de Confidentialité, accessible via le lien en pied de page. Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition aux données vous concernant.

Pour exercer ces droits, contactez notre Délégué à la Protection des Données : dpo@sothebyrealty.fr`
                },
                {
                    title: '7. Droit applicable',
                    content: `Le présent site est soumis au droit français. En cas de litige, et à défaut d'accord amiable, les tribunaux français compétents du ressort de la Cour d'appel de Paris seront seuls compétents pour régler le différend.`
                },
            ]
        },
        en: {
            title: 'Legal Notice',
            lastUpdated: 'Last updated: February 22, 2026',
            sections: [
                {
                    title: '1. Publisher Information',
                    content: `The website sothebyrealty.fr is published by Sotheby Realty France SAS, a simplified joint-stock company with share capital of €500,000, registered in the Paris Trade and Companies Register under number 842 156 478 RCS Paris.

Registered office: 8 Avenue Montaigne, 75008 Paris, France
Phone: +33 1 44 77 88 99
Email: contact@sothebyrealty.fr
Publication Director: Jean-Philippe Moreau
Professional card number: CPI 7501 2021 000 012 345 (Real Estate Transactions)
Financial guarantee: GALIAN – 89, rue de la Boétie, 75008 Paris`
                },
                {
                    title: '2. Hosting',
                    content: `The site is hosted by:
Vercel Inc.
440 N Barranca Ave #4133
Covina, CA 91723, USA
support.vercel.com

The database is hosted by:
Supabase, Inc.
970 Toa Payoh North, Singapore 318992`
                },
                {
                    title: '3. Intellectual Property',
                    content: `All elements of this website (texts, graphics, software, photographs, images, videos, sounds, plans, names, logos, trademarks, creations and various protectable works) are the exclusive property of Sotheby Realty France or its partners. These elements are protected by French and international laws relating to intellectual property.

Any reproduction, representation, modification, publication or adaptation of all or part of the site's elements, by any means, is prohibited without prior written authorization from Sotheby Realty France.`
                },
                {
                    title: '4. Liability',
                    content: `Sotheby Realty France strives to ensure the accuracy and currency of information published on this site. However, it cannot guarantee the accuracy, precision or completeness of information available on this site. Accordingly, Sotheby Realty France disclaims all liability for any inaccuracy, imprecision or omission regarding information available on this site.

Information on this site does not constitute a contractual document. Property prices and features are indicative and may be subject to change without notice.`
                },
                {
                    title: '5. Hyperlinks',
                    content: `Creating hyperlinks to sothebyrealty.fr requires prior written agreement from Sotheby Realty France. Links to third-party sites on this website are provided for informational purposes only. Sotheby Realty France cannot be held responsible for the content of these sites.`
                },
                {
                    title: '6. Personal Data',
                    content: `The processing of your personal data is described in our Privacy Policy, accessible via the link in the footer. In accordance with the General Data Protection Regulation (GDPR) and French data protection law, you have the right of access, rectification, erasure, portability and opposition to data concerning you.

To exercise these rights, contact our Data Protection Officer: dpo@sothebyrealty.fr`
                },
                {
                    title: '7. Governing Law',
                    content: `This site is governed by French law. In the event of a dispute, and in the absence of an amicable settlement, the competent French courts within the jurisdiction of the Court of Appeal of Paris will have sole jurisdiction.`
                },
            ]
        }
    }[lang] ?? { title: 'Mentions Légales', lastUpdated: '', sections: [] };

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
                </div>

                <div className="space-y-12">
                    {content.sections.map((section, i) => (
                        <section key={i} className="border-b border-gray-100 pb-10 last:border-0">
                            <h2 className="font-serif text-2xl mb-5 text-luxury-black">{section.title}</h2>
                            <p className="text-base text-luxury-muted leading-relaxed whitespace-pre-line">{section.content}</p>
                        </section>
                    ))}
                </div>

                <div className="mt-20 p-8 bg-luxury-cream border border-gray-100 text-center">
                    <h3 className="font-serif text-xl mb-3">{lang === 'fr' ? 'Une question ?' : 'Have a question?'}</h3>
                    <p className="text-sm text-luxury-muted mb-6">
                        {lang === 'fr' ? 'Notre équipe juridique se tient à votre disposition.' : 'Our legal team is at your disposal.'}
                    </p>
                    <Link href="/contact" className="btn-primary">
                        {lang === 'fr' ? 'Nous Contacter' : 'Contact Us'}
                    </Link>
                </div>
            </div>
        </main>
    );
}
