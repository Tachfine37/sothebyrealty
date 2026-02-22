'use client';

import { useTranslations } from '@/lib/i18n/LanguageContext';
import Link from 'next/link';

export default function PolitiqueConfidentialitePage() {
    const { lang, t } = useTranslations();

    const content = {
        fr: {
            title: 'Politique de Confidentialité',
            lastUpdated: 'Dernière mise à jour : 22 Février 2026',
            intro: 'Sotheby Realty France accorde une importance capitale à la protection de vos données personnelles. La présente Politique de Confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos informations dans le plein respect du Règlement Général sur la Protection des Données (RGPD – Règlement UE 2016/679) et de la loi française Informatique et Libertés.',
            sections: [
                {
                    title: '1. Responsable du traitement',
                    content: `Sotheby Realty France SAS
8 Avenue Montaigne, 75008 Paris
RCS Paris 842 156 478
Délégué à la Protection des Données (DPO) : dpo@sothebyrealty.fr`
                },
                {
                    title: '2. Données collectées',
                    content: `Nous collectons les catégories de données personnelles suivantes :

• Données d'identification : nom, prénom, adresse email, numéro de téléphone
• Données de compte : identifiants de connexion, historique des biens consultés et favoris
• Données de navigation : adresse IP, type de navigateur, pages visitées, durée de visite (via cookies analytiques, avec votre consentement)
• Données de contact : le contenu de vos messages envoyés via nos formulaires

Nous ne collectons ni ne traitons de données sensibles (données de santé, opinions politiques ou religieuses, etc.).`
                },
                {
                    title: '3. Finalités et bases légales du traitement',
                    content: `Vos données sont traitées aux fins suivantes :

• Gestion de votre compte utilisateur (base légale : exécution du contrat)
• Envoi de communications transactionnelles liées à vos demandes (base légale : exécution du contrat)
• Amélioration de nos services par l'analyse statistique du trafic (base légale : intérêt légitime / consentement)
• Envoi de communications marketing et de newsletters (base légale : consentement)
• Obligation légale (conservation de certaines données) (base légale : obligation légale)`
                },
                {
                    title: '4. Durée de conservation',
                    content: `Vos données personnelles sont conservées pendant les durées suivantes :

• Données de compte actif : pendant toute la durée de la relation contractuelle + 3 ans après la dernière activité
• Données de prospects non convertis : 1 an à compter du dernier contact
• Données de logs de navigation : 13 mois maximum
• Données comptables : 10 ans (obligation légale)

À l'issue de ces délais, vos données sont supprimées ou anonymisées de manière sécurisée.`
                },
                {
                    title: '5. Destinataires des données',
                    content: `Vos données peuvent être partagées avec :

• Nos collaborateurs habilités (conseillers immobiliers, service client, équipe technique)
• Nos sous-traitants techniques : Vercel (hébergement), Supabase (base de données), Resend (emails), Google (authentification OAuth, analytics si activé)
• Les autorités compétentes, sur demande légale

Nous ne vendons jamais vos données à des tiers à des fins commerciales.`
                },
                {
                    title: '6. Transferts hors UE',
                    content: `Certains de nos prestataires (notamment Vercel et Google) transfèrent des données vers les États-Unis. Ces transferts sont encadrés par des clauses contractuelles types approuvées par la Commission Européenne et/ou l'adhésion au Data Privacy Framework, garantissant un niveau de protection adéquat.`
                },
                {
                    title: '7. Vos droits',
                    content: `Conformément au RGPD, vous disposez des droits suivants :

• Droit d'accès : obtenir une copie de vos données
• Droit de rectification : corriger des données inexactes
• Droit à l'effacement : demander la suppression de vos données ("droit à l'oubli")
• Droit à la portabilité : recevoir vos données dans un format structuré
• Droit d'opposition : vous opposer au traitement de vos données à des fins de marketing direct
• Droit à la limitation : limiter temporairement le traitement de vos données

Pour exercer ces droits, contactez notre DPO à dpo@sothebyrealty.fr en joignant une copie de votre pièce d'identité. Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).`
                },
                {
                    title: '8. Cookies',
                    content: `Nous utilisons des cookies et technologies similaires sur notre site. Pour en savoir plus, consultez notre Politique relative aux Cookies accessible dans le pied de page du site, ou gérez vos préférences en cliquant sur "Personnaliser" dans la bannière de consentement.`
                },
                {
                    title: '9. Sécurité',
                    content: `Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction : chiffrement TLS (HTTPS), hachage des mots de passe, contrôles d'accès stricts, journalisation des accès.`
                },
                {
                    title: '10. Modification de la politique',
                    content: `Nous nous réservons le droit de modifier la présente Politique à tout moment pour nous conformer à l'évolution de la réglementation ou de nos pratiques. La date de dernière mise à jour est indiquée en haut du document. Nous vous encourageons à la consulter régulièrement.`
                },
            ]
        },
        en: {
            title: 'Privacy Policy',
            lastUpdated: 'Last updated: February 22, 2026',
            intro: 'Sotheby Realty France places the utmost importance on the protection of your personal data. This Privacy Policy informs you how we collect, use and protect your information in full compliance with the General Data Protection Regulation (GDPR – EU Regulation 2016/679) and French data protection law.',
            sections: [
                {
                    title: '1. Data Controller',
                    content: `Sotheby Realty France SAS
8 Avenue Montaigne, 75008 Paris
RCS Paris 842 156 478
Data Protection Officer (DPO): dpo@sothebyrealty.fr`
                },
                {
                    title: '2. Data We Collect',
                    content: `We collect the following categories of personal data:

• Identification data: name, first name, email address, phone number
• Account data: login credentials, browsing history of viewed properties and favorites
• Browsing data: IP address, browser type, pages visited, visit duration (via analytical cookies, with your consent)
• Contact data: the content of messages you send via our forms

We do not collect or process sensitive data (health data, political or religious opinions, etc.).`
                },
                {
                    title: '3. Purposes and Legal Bases',
                    content: `Your data is processed for the following purposes:

• Managing your user account (legal basis: contract performance)
• Sending transactional communications related to your requests (legal basis: contract performance)
• Improving our services through statistical traffic analysis (legal basis: legitimate interest / consent)
• Sending marketing communications and newsletters (legal basis: consent)
• Legal obligations (retention of certain data) (legal basis: legal obligation)`
                },
                {
                    title: '4. Retention Period',
                    content: `Your personal data is retained for the following periods:

• Active account data: for the duration of the contractual relationship + 3 years after the last activity
• Non-converted prospect data: 1 year from last contact
• Navigation log data: maximum 13 months
• Accounting data: 10 years (legal obligation)

At the end of these periods, your data is securely deleted or anonymized.`
                },
                {
                    title: '5. Data Recipients',
                    content: `Your data may be shared with:

• Our authorized staff (real estate advisors, customer service, technical team)
• Our technical subcontractors: Vercel (hosting), Supabase (database), Resend (emails), Google (OAuth authentication, analytics if enabled)
• Competent authorities, upon legal request

We never sell your data to third parties for commercial purposes.`
                },
                {
                    title: '6. Transfers Outside the EU',
                    content: `Some of our service providers (notably Vercel and Google) transfer data to the United States. These transfers are governed by standard contractual clauses approved by the European Commission and/or adherence to the Data Privacy Framework, ensuring an adequate level of protection.`
                },
                {
                    title: '7. Your Rights',
                    content: `Under the GDPR, you have the following rights:

• Right of access: obtain a copy of your data
• Right of rectification: correct inaccurate data
• Right to erasure: request deletion of your data ("right to be forgotten")
• Right to portability: receive your data in a structured format
• Right to object: object to the processing of your data for direct marketing purposes
• Right to restriction: temporarily limit the processing of your data

To exercise these rights, contact our DPO at dpo@sothebyrealty.fr, enclosing a copy of your identity document. You also have the right to lodge a complaint with the CNIL (www.cnil.fr) or your local supervisory authority.`
                },
                {
                    title: '8. Cookies',
                    content: `We use cookies and similar technologies on our site. To learn more, please consult our Cookie Policy accessible in the website footer, or manage your preferences by clicking "Customize" in the consent banner.`
                },
                {
                    title: '9. Security',
                    content: `We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure or destruction: TLS encryption (HTTPS), password hashing, strict access controls, access logging.`
                },
                {
                    title: '10. Policy Changes',
                    content: `We reserve the right to modify this Policy at any time to comply with regulatory changes or our practices. The date of last update is indicated at the top of the document. We encourage you to consult it regularly.`
                },
            ]
        }
    }[lang] ?? { title: 'Politique de Confidentialité', lastUpdated: '', intro: '', sections: [] };

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
                    <p className="text-lg font-light leading-relaxed text-luxury-muted">{content.intro}</p>
                </div>

                <div className="space-y-12">
                    {content.sections.map((section, i) => (
                        <section key={i} className="border-b border-gray-100 pb-10 last:border-0">
                            <h2 className="font-serif text-2xl mb-5 text-luxury-black">{section.title}</h2>
                            <p className="text-base text-luxury-muted leading-relaxed whitespace-pre-line">{section.content}</p>
                        </section>
                    ))}
                </div>

                {/* Quick links to related legal pages */}
                <div className="mt-16 pt-10 border-t border-gray-100">
                    <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-luxury-muted mb-6">
                        {lang === 'fr' ? 'Documents juridiques connexes' : 'Related Legal Documents'}
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/cgu" className="text-sm font-medium text-luxury-black hover:text-champagne transition-colors flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-champagne" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M9 12h6M9 16h6M9 8h2M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /></svg>
                            {lang === 'fr' ? 'Conditions Générales' : 'Terms & Conditions'}
                        </Link>
                        <Link href="/cookies" className="text-sm font-medium text-luxury-black hover:text-champagne transition-colors flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-champagne" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" /></svg>
                            {lang === 'fr' ? 'Politique Cookies' : 'Cookie Policy'}
                        </Link>
                        <Link href="/mentions-legales" className="text-sm font-medium text-luxury-black hover:text-champagne transition-colors flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-champagne" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                            {lang === 'fr' ? 'Mentions Légales' : 'Legal Notice'}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
