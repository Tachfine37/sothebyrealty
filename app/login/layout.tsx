import type { Metadata } from 'next';

// Force dynamic rendering — login page uses useSearchParams() which
// requires Suspense on static export. This prevents the build error.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Connexion | Sotheby Realty France',
    description: 'Connectez-vous à votre espace Sotheby Realty France.',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return children;
}
