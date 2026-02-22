'use client';

import { SessionProvider } from 'next-auth/react';
import type { Session } from 'next-auth';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';

export default function Providers({
    children,
    session,
}: {
    children: React.ReactNode;
    session?: Session | null;
}) {
    return (
        <SessionProvider session={session}>
            <LanguageProvider>
                {children}
            </LanguageProvider>
        </SessionProvider>
    );
}
