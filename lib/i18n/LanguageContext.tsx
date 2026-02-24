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
    useEffect(() => {
        document.documentElement.lang = 'en';
    }, []);

    return (
        <LanguageContext.Provider value={{
            lang: 'en',
            t: en,
            setLang: () => { },
            toggle: () => { }
        }}>
            {children}
        </LanguageContext.Provider>
    );
}

/** Use this hook in any client component to get translations + language switcher */
export function useTranslations() {
    return useContext(LanguageContext);
}
