import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LogoutButton from '@/components/LogoutButton';

export const metadata: Metadata = { title: 'Admin | Sotheby Realty France' };

const sidebarLinks = [
    { label: 'Tableau de bord', href: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { label: 'Annonces', href: '/admin/properties', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    { label: 'Nouvelle Annonce', href: '/admin/properties/new', icon: 'M12 4v16m8-8H4' },
    { label: 'Avis Clients', href: '/admin/testimonials', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { label: 'Messages', href: '/admin/messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { label: 'Paramètres', href: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
];

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect('/admin/login');
    }

    const { user } = session;
    const role = (user as any).role;

    if (role !== 'ADMIN' && role !== 'admin') {
        redirect('/');
    }

    const displayName = user.name ?? user.email ?? 'Admin';
    const initial = displayName.charAt(0).toUpperCase();
    const avatarUrl = (user as any).image as string | null;

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-luxury-black flex flex-col flex-shrink-0">
                <div className="px-6 py-8 border-b border-white/8">
                    <Link href="/" className="block">
                        <span className="font-serif text-sm tracking-[0.2em] uppercase text-white">SOTHEBY REALTY</span>
                        <span className="block text-[9px] tracking-[0.25em] uppercase text-white/30 mt-1">Administration</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-1">
                    {sidebarLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="admin-nav-link">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d={link.icon} />
                            </svg>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* User info + logout */}
                <div className="p-4 border-t border-white/8">
                    <div className="flex items-center gap-3 px-4 py-3 mb-1">
                        {avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-champagne/20 flex items-center justify-center text-champagne text-sm font-semibold">
                                {initial}
                            </div>
                        )}
                        <div className="min-w-0">
                            <p className="text-xs font-medium text-white truncate">{displayName}</p>
                            <p className="text-[10px] text-white/30 truncate">{user.email}</p>
                        </div>
                    </div>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                <div className="max-w-6xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
