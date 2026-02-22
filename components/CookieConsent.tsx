'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/i18n/LanguageContext';

export default function CookieConsent() {
    const { lang } = useTranslations();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show if not already accepted/rejected
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setIsVisible(true);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleRejectAll = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        setIsVisible(false);
    };

    const handleCustomize = () => {
        localStorage.setItem('cookie-consent', 'customized');
        // A hypothetical routing or modal open
        window.location.href = '/cookies';
    };

    if (!isVisible) return null;

    const contentFr = {
        title: "Nous respectons votre vie privée",
        desc: "Les cookies nous aident à améliorer votre expérience, à proposer un contenu personnalisé et à analyser le trafic. Vous pouvez choisir quels cookies autoriser en cliquant sur Personnaliser. Cliquez sur Tout accepter pour consentir ou sur Tout refuser pour décliner les cookies non essentiels.",
        customize: "Personnaliser",
        reject: "Tout refuser",
        accept: "Tout accepter",
        poweredBy: "Propulsé par CookieAdmin"
    };

    const contentEn = {
        title: "We respect your privacy",
        desc: "Cookies help us improve your experience, deliver personalized content, and analyze traffic. You can choose which cookies to allow by clicking Customize. Click Accept All to consent or Reject All to decline non-essential cookies.",
        customize: "Customize",
        reject: "Reject All",
        accept: "Accept All",
        poweredBy: "Powered by CookieAdmin"
    };

    const content = lang === 'en' ? contentEn : contentFr;

    return (
        <div className="fixed bottom-6 left-6 z-[100] max-w-[420px] bg-white border border-gray-200 shadow-2xl p-6 rounded-sm animate-fade-in-up">
            <h3 className="font-sans font-bold text-gray-900 text-[15px] mb-2 leading-tight">
                {content.title}
            </h3>
            <p className="font-sans text-gray-700 text-[13px] leading-[1.6] mb-5">
                {content.desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 mb-5 font-sans">
                <button
                    onClick={handleCustomize}
                    className="flex-1 py-2 px-3 bg-white border border-gray-300 text-gray-800 text-[13px] hover:bg-gray-50 transition-colors rounded-[3px]"
                >
                    {content.customize}
                </button>
                <button
                    onClick={handleRejectAll}
                    className="flex-1 py-2 px-3 bg-white border border-gray-300 text-gray-800 text-[13px] hover:bg-gray-50 transition-colors rounded-[3px]"
                >
                    {content.reject}
                </button>
                <button
                    onClick={handleAcceptAll}
                    className="flex-1 py-2 px-3 bg-[#1D60D8] border border-[#1D60D8] text-white text-[13px] font-medium hover:bg-blue-700 hover:border-blue-700 transition-colors rounded-[3px]"
                >
                    {content.accept}
                </button>
            </div>

            <div className="flex justify-center items-center gap-1.5 font-sans">
                <span className="text-[10px] text-gray-500">{content.poweredBy.split('CookieAdmin')[0]}</span>
                {/* CookieAdmin logo recreation */}
                <div className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1A2A3A" />
                        <path d="M7.5 10C8.32843 10 9 9.32843 9 8.5C9 7.67157 8.32843 7 7.5 7C6.67157 7 6 7.67157 6 8.5C6 9.32843 6.67157 10 7.5 10Z" fill="#D49A4C" />
                        <path d="M12 15C12.8284 15 13.5 14.3284 13.5 13.5C13.5 12.6716 12.8284 12 12 12C11.1716 12 10.5 12.6716 10.5 13.5C10.5 14.3284 11.1716 15 12 15Z" fill="#D49A4C" />
                        <path d="M16.5 11C17.3284 11 18 10.3284 18 9.5C18 8.67157 17.3284 8 16.5 8C15.6716 8 15 8.67157 15 9.5C15 10.3284 15.6716 11 16.5 11Z" fill="#D49A4C" />
                        <path d="M8 17C8.55228 17 9 16.5523 9 16C9 15.4477 8.55228 15 8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17Z" fill="#D49A4C" />
                        <path d="M17 17C17.5523 17 18 16.5523 18 16C18 15.4477 17.5523 15 17 15C16.4477 15 16 15.4477 16 16C16 16.5523 16.4477 17 17 17Z" fill="#D49A4C" />
                    </svg>
                    <span className="font-bold text-[11px] text-[#1A2A3A] tracking-tight">Cookie<span className="text-[#C18536]">Admin</span></span>
                </div>
            </div>
        </div>
    );
}
