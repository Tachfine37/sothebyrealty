import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Contactez nos experts immobiliers. Paris, Nice, Bordeaux. Réponse garantie sous 2h. +33 1 44 77 88 99.',
};

const offices = [
    { city: 'Paris', address: '8 Avenue Montaigne, 75008 Paris', phone: '+33 1 44 77 88 99', email: 'paris@sothebyrealty.fr', primary: true },
    { city: 'Nice', address: '2 Promenade des Anglais, 06000 Nice', phone: '+33 4 93 22 44 55', email: 'nice@sothebyrealty.fr' },
    { city: 'Bordeaux', address: 'Allée de Tourny, 33000 Bordeaux', phone: '+33 5 57 87 65 43', email: 'bordeaux@sothebyrealty.fr' },
];

export default function ContactPage() {
    return (
        <>
            <Header />
            <div className="bg-luxury-black pt-32 pb-12">
                <div className="max-w-8xl mx-auto px-6 lg:px-12">
                    <span className="section-label text-champagne">Entrons en Contact</span>
                    <h1 className="font-serif text-4xl md:text-5xl text-white font-normal mt-2">Contactez-Nous</h1>
                </div>
            </div>
            <div className="max-w-8xl mx-auto px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <h2 className="font-serif text-2xl mb-8">Votre Projet</h2>
                        <form action="/api/contact" method="post" className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="form-label">Nom & Prénom *</label>
                                <input name="name" required className="form-input" placeholder="Jean Dupont" />
                            </div>
                            <div>
                                <label className="form-label">Email *</label>
                                <input name="email" type="email" required className="form-input" placeholder="jean@exemple.fr" />
                            </div>
                            <div>
                                <label className="form-label">Téléphone</label>
                                <input name="phone" type="tel" className="form-input" placeholder="+33 6 XX XX XX XX" />
                            </div>
                            <div>
                                <label className="form-label">Objet</label>
                                <select name="subject" className="form-select">
                                    <option>Achat d&apos;un bien</option>
                                    <option>Vente d&apos;un bien</option>
                                    <option>Estimation gratuite</option>
                                    <option>Investissement</option>
                                    <option>Autre</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="form-label">Budget</label>
                                <select name="budget" className="form-select">
                                    <option>Moins de 1 000 000 €</option>
                                    <option>1 000 000 € – 3 000 000 €</option>
                                    <option>3 000 000 € – 8 000 000 €</option>
                                    <option>8 000 000 € – 15 000 000 €</option>
                                    <option>Plus de 15 000 000 €</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="form-label">Message *</label>
                                <textarea name="message" required rows={6} className="form-input form-textarea"
                                    placeholder="Décrivez votre projet en quelques mots…" />
                            </div>
                            <div className="md:col-span-2">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input type="checkbox" required className="mt-1 w-4 h-4 accent-champagne" />
                                    <span className="text-xs text-luxury-muted">J&apos;accepte que mes données soient utilisées pour traiter ma demande, conformément à la <a href="/politique-confidentialite" className="text-champagne hover:underline">politique de confidentialité</a>.</span>
                                </label>
                            </div>
                            <div>
                                <button type="submit" className="btn-primary">
                                    Envoyer le Message
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Offices sidebar */}
                    <div>
                        <h2 className="font-serif text-2xl mb-8">Nos Bureaux</h2>
                        <div className="flex flex-col gap-6">
                            {offices.map((o) => (
                                <div key={o.city} className={`border p-6 ${o.primary ? 'border-champagne/40 bg-luxury-cream' : 'border-gray-100'}`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <p className="font-semibold text-luxury-black">{o.city}</p>
                                        {o.primary && <span className="text-[9px] bg-champagne text-white px-2 py-0.5 font-bold tracking-wider uppercase">Siège</span>}
                                    </div>
                                    <address className="not-italic text-sm text-luxury-muted leading-relaxed mb-3">{o.address}</address>
                                    <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="text-sm text-champagne hover:text-champagne-dark transition-colors block mb-1">{o.phone}</a>
                                    <a href={`mailto:${o.email}`} className="text-sm text-luxury-muted hover:text-champagne transition-colors">{o.email}</a>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 border border-gray-100 p-6 bg-luxury-black text-white text-center">
                            <p className="text-xs tracking-wider uppercase text-white/40 mb-2">Disponible 7j/7</p>
                            <p className="font-serif text-xl mb-1">Réponse sous 2h</p>
                            <p className="text-xs text-white/50">Pour toute urgence : <a href="tel:+33144778899" className="text-champagne hover:underline">+33 1 44 77 88 99</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
