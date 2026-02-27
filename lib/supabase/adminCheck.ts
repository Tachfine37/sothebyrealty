/**
 * lib/supabase/adminCheck.ts
 * Reusable helper for API routes: reads the NextAuth session,
 * verifies the user is an admin, and returns the user or a 401 response.
 */
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export async function requireAdmin(request: NextRequest): Promise<
    { user: { id: string; email: string }; error: null } |
    { user: null; error: NextResponse }
> {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return { user: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
    }

    const role = (session.user as any).role;
    // Check for ADMIN (Prisma schema default) or admin
    if (role !== 'ADMIN' && role !== 'admin') {
        return { user: null, error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
    }

    return {
        user: {
            id: (session.user as any).id,
            email: session.user.email ?? ''
        },
        error: null
    };
}
