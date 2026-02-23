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
                            <>Don&apos;t have an account? <button onClick={() => setMode('register')} className="text-[#D4A373] hover:underline font-medium">Register</button></>
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
