'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { fr } from './fr';
import { en } from './en';
import type { Translations } from './fr';

export type Lang = 'fr' | 'en';

interface LanguageContextValue {
    lang: Lang;
    t: Translations;
    setLang: (lang: Lang) => void;
    toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
    lang: 'fr',
    t: fr,
    setLang: () => { },
    toggle: () => { },
});

const LOCALSTORAGE_KEY = 'sotheby-lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>('fr');

    // Hydrate from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(LOCALSTORAGE_KEY) as Lang | null;
        if (saved === 'en' || saved === 'fr') {
            setLangState(saved);
        }
    }, []);

    function setLang(l: Lang) {
        setLangState(l);
        localStorage.setItem(LOCALSTORAGE_KEY, l);
        // Update html lang attribute for accessibility + SEO
        document.documentElement.lang = l;
    }

    function toggle() { console.log("TOGGLE CLICKED", lang);
        setLang(lang === 'fr' ? 'en' : 'fr');
    }

    const t = lang === 'en' ? en : fr;

    return (
        <LanguageContext.Provider value={{ lang, t, setLang, toggle }}>
            {children}
        </LanguageContext.Provider>
    );
}

/** Use this hook in any client component to get translations + language switcher */
export function useTranslations() {
    return useContext(LanguageContext);
}
