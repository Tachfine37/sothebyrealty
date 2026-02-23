'use client';

import { useState } from 'react';
import LoginModal from '@/components/LoginModal';

export default function SaveButton() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 text-gray-700 hover:text-luxury-black transition-colors font-medium"
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Save
            </button>
            <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        </>
    );
}
