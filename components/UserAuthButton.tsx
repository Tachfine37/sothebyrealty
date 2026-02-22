'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';
import { useTranslations } from '@/lib/i18n/LanguageContext';

interface Profile {
    name: string | null;
    avatar_url: string | null;
    role: string;
}

interface Props {
    isTransparent: boolean;
}

export default function UserAuthButton({ isTransparent }: Props) {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { t } = useTranslations();

    useEffect(() => {
        const supabase = createClient();

        async function loadUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }

            const { data } = await supabase
                .from('profiles')
                .select('name, avatar_url, role')
                .eq('id', user.id)
                .single();

            setProfile(data ?? { name: user.email, avatar_url: null, role: 'user' });
            setLoading(false);
        }

        loadUser();

        // Listen for auth state changes (login / logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            loadUser();
        });

        return () => subscription.unsubscribe();
    }, []);

    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        setProfile(null);
        setDropdownOpen(false);
        window.location.href = '/';
    }

    if (loading) {
        // Skeleton
        return <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />;
    }

    if (!profile) {
        // Not logged in → show login + register buttons
        return (
            <div className="flex items-center gap-3">
                <Link
                    href="/login"
                    className={cn(
                        'flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.15em] uppercase transition-colors',
                        isTransparent ? 'text-white/80 hover:text-white' : 'text-luxury-muted hover:text-champagne'
                    )}
                >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
                    </svg>
                    {t.nav.login}
                </Link>
                <Link
                    href="/login?tab=register"
                    className={cn(
                        'text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 transition-colors',
                        isTransparent
                            ? 'border border-white/50 text-white hover:bg-white hover:text-luxury-black'
                            : 'bg-champagne text-white hover:bg-champagne/80'
                    )}
                >
                    {t.nav.register}
                </Link>
            </div>
        );
    }

    // Logged in → show avatar + dropdown
    const displayName = profile.name ?? t.auth.privateSpace;
    const initial = displayName.charAt(0).toUpperCase();

    return (
        <div className="relative">
            <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 group"
                aria-label={t.auth.privateSpace}
            >
                {profile.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={profile.avatar_url}
                        alt={displayName}
                        className="w-8 h-8 rounded-full object-cover ring-2 ring-white/30 group-hover:ring-champagne transition-all"
                    />
                ) : (
                    <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ring-2 transition-all',
                        isTransparent
                            ? 'bg-white/20 text-white ring-white/30 group-hover:ring-white'
                            : 'bg-champagne/10 text-champagne ring-champagne/20 group-hover:ring-champagne'
                    )}>
                        {initial}
                    </div>
                )}
                <svg
                    className={cn(
                        'w-3 h-3 transition-transform',
                        dropdownOpen && 'rotate-180',
                        isTransparent ? 'text-white/60' : 'text-luxury-muted'
                    )}
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-3 w-52 bg-white border border-gray-100 shadow-xl z-50">
                        {/* User info */}
                        <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-xs font-semibold text-luxury-black truncate">{displayName}</p>
                            <p className="text-[10px] text-luxury-muted mt-0.5 capitalize">{profile.role}</p>
                        </div>

                        {/* Admin link */}
                        {profile.role === 'admin' && (
                            <Link
                                href="/admin"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-3 text-[11px] text-luxury-black hover:text-champagne hover:bg-luxury-cream transition-colors"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                {t.nav.admin}
                            </Link>
                        )}

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-3 text-[11px] text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            {t.nav.logout}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
