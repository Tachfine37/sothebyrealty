import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center px-6">
                    <p className="font-serif text-9xl text-gray-100 font-normal">404</p>
                    <h1 className="font-serif text-3xl text-luxury-black mb-4 -mt-8 relative z-10">Page Introuvable</h1>
                    <p className="text-sm text-luxury-muted mb-8 max-w-md mx-auto">La page que vous recherchez n&rsquo;existe pas ou a été déplacée.</p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/" className="btn-primary">Retour à l&rsquo;Accueil</Link>
                        <Link href="/annonces" className="btn-outline">Voir les Annonces</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
