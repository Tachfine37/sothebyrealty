'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { signOut } from 'next-auth/react';

export default function LogoutButton({ className }: { className?: string }) {
    const router = useRouter();

    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        await signOut({ callbackUrl: '/' }); // Next-Auth sign out
    }

    return (
        <button
            onClick={handleLogout}
            className={className ?? 'w-full flex items-center gap-3 px-4 py-3 text-sm text-luxury-muted hover:text-red-500 hover:bg-red-50 transition-colors'}
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
        </button>
    );
}
