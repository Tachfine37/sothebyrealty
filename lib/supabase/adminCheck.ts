/**
 * lib/supabase/adminCheck.ts
 * Reusable helper for API routes: reads the Supabase session from request cookies,
 * verifies the user is an admin, and returns the user or a 401 response.
 */
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

export async function requireAdmin(request: NextRequest): Promise<
    { user: { id: string; email: string }; error: null } |
    { user: null; error: NextResponse }
> {
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() { return request.cookies.getAll(); },
                setAll() { /* read-only in route handlers — session persists via middleware */ },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { user: null, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (!profile || profile.role !== 'admin') {
        return { user: null, error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
    }

    return { user: { id: user.id, email: user.email ?? '' }, error: null };
}
