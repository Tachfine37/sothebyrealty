import { NextResponse, type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Guard: if Supabase env vars are missing, skip auth and continue
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        return NextResponse.next();
    }

    try {
        // Refresh Supabase session on every request
        const { supabaseResponse, user } = await updateSession(request);



        // ─── Protect /login: redirect authenticated users away ────────────────
        if (pathname === '/login' && user) {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return supabaseResponse;
    } catch (error) {
        // If middleware fails for any reason, pass the request through to avoid
        // a hard crash that blocks the entire site
        console.error('[middleware] error:', error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|uploads|api|auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
