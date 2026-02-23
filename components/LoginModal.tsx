'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialMode?: Mode;
}

type Mode = 'login' | 'register';

export default function LoginModal({ isOpen, onClose, initialMode = 'login' }: LoginModalProps) {
    const [mode, setMode] = useState<Mode>(initialMode);

    // Sync mode when initialMode prop changes (e.g. clicking Sign In vs Sign Up)
    useEffect(() => {
        if (isOpen) {
            setMode(initialMode);
        }
    }, [initialMode, isOpen]);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoginError, setIsLoginError] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
            <div className={`bg-white w-full max-w-[800px] ${mode === 'register' ? 'h-[750px] max-h-[90vh]' : 'h-[500px]'} rounded-lg overflow-hidden flex shadow-2xl relative transition-all duration-300`}>

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors pointer-events-auto z-10"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Left Pane: Image */}
                <div className="w-1/2 relative hidden md:block">
                    <Image
                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Luxury Home"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col justify-center p-10">
                        {mode === 'login' ? (
                            <>
                                <h2 className="text-white text-4xl font-light mb-2">Welcome back</h2>
                                <h2 className="text-white text-4xl font-light">Please log in</h2>
                            </>
                        ) : (
                            <h2 className="text-white text-4xl font-light">Create an account</h2>
                        )}
                    </div>
                </div>

                {/* Right Pane: Form */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col items-center overflow-y-auto custom-scrollbar">

                    <div className="w-full mb-6">
                        <h3 className="text-xl font-bold text-gray-800 capitalize">{mode}</h3>
                    </div>

                    {mode === 'login' && isLoginError && (
                        <div className="w-full mb-4">
                            <p className="text-[#F87171] text-[15px] leading-snug">
                                Please check your credentials or contact the admin.
                            </p>
                        </div>
                    )}

                    {mode === 'register' && isRegistering && (
                        <div className="w-full mb-6">
                            <p className="text-[#8DC63F] font-semibold text-lg">Sending user info, please wait...</p>
                        </div>
                    )}

                    <div className="w-full flex flex-col gap-3 mb-6">
                        <button className="w-full flex items-center justify-center gap-2 border border-[#4267B2] rounded py-2.5 text-[#4267B2] hover:bg-blue-50 transition-colors text-sm font-semibold">
                            <span className="font-serif font-bold text-lg">f</span>
                            Login with Facebook
                        </button>
                        <button className="w-full flex items-center justify-center gap-2 bg-[#F1F5F9] hover:bg-[#E2E8F0] rounded py-2.5 text-gray-700 transition-colors text-sm font-semibold">
                            <svg className="w-4 h-4" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                <path fill="none" d="M1 1h22v22H1z" />
                            </svg>
                            Sign in with Google
                        </button>
                    </div>

                    <div className="w-full text-center font-semibold text-gray-700 mb-6">
                        {mode === 'login' ? 'Log in' : 'Register with your email'}
                    </div>

                    {mode === 'login' ? (
                        <form className="w-full flex flex-col gap-0" onSubmit={(e) => { e.preventDefault(); setIsLoginError(true); }}>
                            <div className="border border-gray-300 rounded overflow-hidden">
                                <input type="text" placeholder="Username or Email" className="w-full p-3 outline-none text-sm text-gray-800 border-b border-gray-300" />
                                <input type="password" placeholder="Password" className="w-full p-3 outline-none text-sm text-gray-800" />
                            </div>

                            <div className="flex justify-between items-center mt-3 mb-6 text-sm text-gray-600">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#CD9B65] focus:ring-[#CD9B65]" />
                                    Remember me
                                </label>
                                <a href="#" className="hover:underline">Forgot password?</a>
                            </div>

                            <button type="submit" className="w-full bg-[#D4A373] hover:bg-[#c29161] text-white font-bold py-3 rounded transition-colors">
                                Log In
                            </button>
                        </form>
                    ) : (
                        <form className="w-full flex flex-col gap-0" onSubmit={(e) => { e.preventDefault(); setIsRegistering(true); }}>
                            <div className="border border-gray-300 rounded overflow-hidden mb-4 flex flex-col">
                                <input type="text" placeholder="Username" className="w-full p-3 outline-none text-sm text-gray-800 border-b border-gray-300" />
                                <input type="text" placeholder="First Name" className="w-full p-3 outline-none text-sm text-gray-800 border-b border-gray-300" />
                                <input type="text" placeholder="Last Name" className="w-full p-3 outline-none text-sm text-gray-800" />
                            </div>

                            <div className="flex gap-2 mb-4">
                                <div className="border border-gray-300 rounded overflow-hidden flex items-center bg-white px-2">
                                    <span className="text-lg">🇺🇸</span>
                                    <svg className="w-4 h-4 text-gray-500 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                                <div className="border border-gray-300 rounded overflow-hidden flex-1">
                                    <input type="tel" placeholder="Phone Number" className="w-full p-3 outline-none text-sm text-gray-800" />
                                </div>
                            </div>

                            <div className="border border-gray-300 rounded overflow-hidden mb-4 flex flex-col">
                                <input type="email" placeholder="Email" className="w-full p-3 outline-none text-sm text-gray-800 border-b border-gray-300" />
                                <input type="password" placeholder="Password" className="w-full p-3 outline-none text-sm text-gray-800 border-b border-gray-300" />
                                <input type="password" placeholder="" className="w-full p-3 outline-none text-sm text-gray-800" />
                            </div>

                            <div className="border border-gray-300 rounded overflow-hidden mb-6">
                                <select className="w-full p-3 outline-none text-sm text-gray-500 bg-transparent appearance-none">
                                    <option>Select</option>
                                    <option>I want to book</option>
                                    <option>I want to host</option>
                                </select>
                            </div>

                            <div className="flex items-start gap-2 mb-6 text-sm text-gray-600">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#0066FF] focus:ring-[#0066FF] mt-0.5" />
                                <span>I agree with your Terms & Conditions and OPP Terms & Policies</span>
                            </div>

                            <button type="submit" className="w-full bg-[#D4A373] hover:bg-[#c29161] text-white font-bold py-3 rounded transition-colors">
                                Register
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-sm text-gray-600 pb-4">
                        {mode === 'login' ? (
                            <>Don't have an account? <button onClick={() => setMode('register')} className="text-[#D4A373] hover:underline font-medium">Register</button></>
                        ) : (
                            <>Do you already have an account? <button onClick={() => setMode('login')} className="text-[#D4A373] hover:underline font-medium">Log In</button></>
                        )}
                    </div>
                </div>
            </div>
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #E2E8F0; border-radius: 20px; }
            `}</style>
        </div>
    );
}
