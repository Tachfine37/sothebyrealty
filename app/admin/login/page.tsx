'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') ?? '/admin';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const fd = new FormData(e.currentTarget);
        const result = await signIn('credentials', {
            email: fd.get('email') as string,
            password: fd.get('password') as string,
            redirect: false,
        });
        if (result?.error) {
            setError('Email ou mot de passe incorrect.');
            setLoading(false);
        } else {
            router.push(callbackUrl);
        }
    }

    return (
        <div className="min-h-screen bg-luxury-black flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <p className="font-serif text-2xl tracking-[0.2em] uppercase text-white mb-1">SOTHEBY REALTY</p>
                    <p className="text-[9px] font-medium tracking-[0.3em] uppercase text-white/30">Administration</p>
                    <div className="w-8 h-px bg-champagne mx-auto mt-5" />
                </div>

                <div className="bg-white/4 border border-white/8 p-8">
                    <h1 className="font-serif text-xl text-white mb-6 text-center">Connexion</h1>

                    {error && (
                        <div className="bg-red-900/30 border border-red-500/30 text-red-300 text-xs px-4 py-3 mb-5">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                placeholder="votre@email.com"
                                className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 placeholder-white/20 focus:outline-none focus:border-champagne/50 transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-2">Mot de passe</label>
                            <input
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 placeholder-white/20 focus:outline-none focus:border-champagne/50 transition-colors"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary justify-center mt-2 disabled:opacity-50"
                        >
                            {loading ? 'Connexion…' : 'Se Connecter'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-luxury-black" />}>
            <LoginForm />
        </Suspense>
    );
}
