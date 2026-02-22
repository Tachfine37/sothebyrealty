'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { useTranslations } from '@/lib/i18n/LanguageContext';

type Tab = 'login' | 'register';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [tab, setTab] = useState<Tab>((searchParams.get('tab') as Tab) ?? 'login');
    const { t } = useTranslations();

    // Form state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const supabase = createClient();

    // Redirect if already logged in
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) router.replace('/');
        });
    }, [router, supabase]);

    // Handle URL error params
    useEffect(() => {
        const e = searchParams.get('error');
        if (e === 'auth_failed') setError(t.auth.errors.authFailed);
        if (e === 'unauthorized') setError(t.auth.errors.unauthorized);
    }, [searchParams, t]);

    // ─── Google OAuth ────────────────────────────────────────────
    async function handleGoogle() {
        setGoogleLoading(true);
        setError('');
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                queryParams: { access_type: 'offline', prompt: 'consent' },
            },
        });
        if (error) { setError(error.message); setGoogleLoading(false); }
    }

    // ─── Email Login ─────────────────────────────────────────────
    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message === 'Invalid login credentials'
                ? t.auth.errors.invalidCredentials
                : error.message);
            setLoading(false);
        } else {
            router.push('/');
            router.refresh();
        }
    }

    // ─── Email Register ───────────────────────────────────────────
    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        if (password !== confirmPassword) {
            setError(t.auth.errors.passwordMismatch);
            return;
        }
        if (password.length < 8) {
            setError(t.auth.errors.passwordTooShort);
            return;
        }
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: name },
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(t.auth.registerSuccess);
            setLoading(false);
        }
    }

    function switchTab(t: Tab) {
        setTab(t);
        setError('');
        setSuccess('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
    }

    return (
        <div className="min-h-screen bg-luxury-cream flex flex-col">
            {/* Top bar */}
            <div className="px-8 py-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <span className="font-serif text-xl text-luxury-black tracking-widest">SOTHEBY REALTY</span>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-luxury-muted group-hover:text-champagne transition-colors">France</span>
                </Link>
                <Link href="/" className="text-xs text-luxury-muted hover:text-champagne transition-colors flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                    {t.auth.backToSite}
                </Link>
            </div>

            {/* Card */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">

                    <div className="bg-white border border-gray-100 shadow-sm">
                        {/* Tabs */}
                        <div className="flex border-b border-gray-100">
                            <button
                                onClick={() => switchTab('login')}
                                className={`flex-1 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors ${tab === 'login'
                                    ? 'text-luxury-black border-b-2 border-champagne -mb-px'
                                    : 'text-luxury-muted hover:text-luxury-black'
                                    }`}
                            >
                                {t.auth.loginTab}
                            </button>
                            <button
                                onClick={() => switchTab('register')}
                                className={`flex-1 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors ${tab === 'register'
                                    ? 'text-luxury-black border-b-2 border-champagne -mb-px'
                                    : 'text-luxury-muted hover:text-luxury-black'
                                    }`}
                            >
                                {t.auth.registerTab}
                            </button>
                        </div>

                        <div className="p-8">
                            <h1 className="font-serif text-2xl text-luxury-black mb-1">
                                {tab === 'login' ? t.auth.welcomeLogin : t.auth.welcomeRegister}
                            </h1>
                            <p className="text-sm text-luxury-muted mb-7">
                                {tab === 'login' ? t.auth.subtitleLogin : t.auth.subtitleRegister}
                            </p>

                            {/* Feedback messages */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 mb-5">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs px-4 py-3 mb-5">
                                    {success}
                                </div>
                            )}

                            {/* ── Google button ── */}
                            <button
                                onClick={handleGoogle}
                                disabled={googleLoading}
                                className="w-full flex items-center justify-center gap-3 border border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 transition-all px-5 py-3.5 text-sm font-medium text-gray-700 disabled:opacity-50"
                            >
                                {googleLoading ? (
                                    <span className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                                ) : (
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                )}
                                {googleLoading ? t.auth.redirecting : t.auth.continueWithGoogle}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4 my-6">
                                <div className="h-px flex-1 bg-gray-100" />
                                <span className="text-[10px] tracking-[0.2em] uppercase text-luxury-muted">{t.auth.or}</span>
                                <div className="h-px flex-1 bg-gray-100" />
                            </div>

                            {/* ── Email form ── */}
                            {tab === 'login' ? (
                                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-[11px] font-semibold tracking-wider uppercase text-luxury-muted mb-1.5">
                                            {t.auth.email}
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="votre@email.com"
                                            className="w-full border border-gray-200 focus:border-champagne focus:outline-none px-4 py-3 text-sm text-luxury-black placeholder:text-gray-300 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label className="text-[11px] font-semibold tracking-wider uppercase text-luxury-muted">
                                                {t.auth.password}
                                            </label>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    if (!email) { setError(t.auth.errors.enterEmail); return; }
                                                    setError('');
                                                    const { error } = await supabase.auth.resetPasswordForEmail(email, {
                                                        redirectTo: `${window.location.origin}/auth/callback`,
                                                    });
                                                    if (error) setError(error.message);
                                                    else setSuccess(t.auth.resetSent);
                                                }}
                                                className="text-[10px] text-luxury-muted hover:text-champagne transition-colors"
                                            >
                                                {t.auth.forgotPassword}
                                            </button>
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full border border-gray-200 focus:border-champagne focus:outline-none px-4 py-3 text-sm text-luxury-black placeholder:text-gray-300 transition-colors"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-luxury-black text-white text-[11px] font-semibold tracking-[0.2em] uppercase py-4 hover:bg-champagne transition-colors disabled:opacity-50 mt-1"
                                    >
                                        {loading ? t.auth.loginLoading : t.auth.loginBtn}
                                    </button>
                                    <p className="text-center text-xs text-luxury-muted">
                                        {t.auth.noAccount}{' '}
                                        <button type="button" onClick={() => switchTab('register')} className="text-champagne hover:underline font-medium">
                                            {t.auth.registerTab}
                                        </button>
                                    </p>
                                </form>
                            ) : (
                                <form onSubmit={handleRegister} className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-[11px] font-semibold tracking-wider uppercase text-luxury-muted mb-1.5">
                                            {t.auth.fullName}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            placeholder="Jean Dupont"
                                            className="w-full border border-gray-200 focus:border-champagne focus:outline-none px-4 py-3 text-sm text-luxury-black placeholder:text-gray-300 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold tracking-wider uppercase text-luxury-muted mb-1.5">
                                            {t.auth.email}
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            placeholder="votre@email.com"
                                            className="w-full border border-gray-200 focus:border-champagne focus:outline-none px-4 py-3 text-sm text-luxury-black placeholder:text-gray-300 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold tracking-wider uppercase text-luxury-muted mb-1.5">
                                            {t.auth.password} <span className="normal-case font-normal">{t.auth.minPassword}</span>
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            minLength={8}
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full border border-gray-200 focus:border-champagne focus:outline-none px-4 py-3 text-sm text-luxury-black placeholder:text-gray-300 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[11px] font-semibold tracking-wider uppercase text-luxury-muted mb-1.5">
                                            {t.auth.confirmPassword}
                                        </label>
                                        <input
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className={`w-full border focus:outline-none px-4 py-3 text-sm text-luxury-black placeholder:text-gray-300 transition-colors ${confirmPassword && confirmPassword !== password
                                                ? 'border-red-300 focus:border-red-400'
                                                : 'border-gray-200 focus:border-champagne'
                                                }`}
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-champagne text-white text-[11px] font-semibold tracking-[0.2em] uppercase py-4 hover:bg-champagne/80 transition-colors disabled:opacity-50 mt-1"
                                    >
                                        {loading ? t.auth.registerLoading : t.auth.registerBtn}
                                    </button>
                                    <p className="text-center text-xs text-luxury-muted">
                                        {t.auth.alreadyAccount}{' '}
                                        <button type="button" onClick={() => switchTab('login')} className="text-champagne hover:underline font-medium">
                                            {t.auth.loginTab}
                                        </button>
                                    </p>
                                </form>
                            )}

                            {/* Legal */}
                            <p className="text-[10px] text-luxury-muted text-center mt-7 leading-relaxed">
                                {t.auth.legal}{/* Keeping the links intact inside the translation is slightly annoying since they contain HTML. In fr.ts, auth.legal was purely text: "En continuant, vous acceptez nos mentions légales et notre politique de confidentialité." We can just render the text. */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
