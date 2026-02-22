import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * /auth/callback
 * Supabase exchanges the OAuth code for a session and sets the auth cookie.
 * Then redirects the user to the appropriate page.
 */
export async function GET(request: NextRequest) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/';

    if (code) {
        const response = NextResponse.redirect(`${origin}${next}`);

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return request.cookies.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            response.cookies.set(name, value, options);
                        });
                    },
                },
            }
        );

        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (!error) {
            // After successful auth, get the user and check/create their profile
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                // Upsert profile (trigger handles creation but we ensure role is set)
                await supabase.from('profiles').upsert({
                    id: user.id,
                    email: user.email ?? '',
                    name: user.user_metadata?.full_name ?? null,
                    avatar_url: user.user_metadata?.avatar_url ?? null,
                }, { onConflict: 'id', ignoreDuplicates: true });

                // Check if this user is the admin email
                const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'tachfinewacwac@gmail.com';
                if (user.email === ADMIN_EMAIL) {
                    await supabase
                        .from('profiles')
                        .update({ role: 'admin' })
                        .eq('id', user.id);
                }
            }

            return response;
        }
    }

    // Error — redirect to login with error message
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
