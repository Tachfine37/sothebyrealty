'use client';

import { useTranslations } from '@/lib/i18n/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { ARTICLES, FEATURED_ARTICLE } from '@/lib/blogData';

export default function BlogPage() {
    const { lang, t } = useTranslations();
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const content = {
        fr: {
            title: 'Blog & Magazine',
            subtitle: 'Actualités, tendances et art de vivre dans l\'immobilier de prestige.',
            readMore: 'Lire l\'article',
            downloadMag: 'Télécharger le magazine (PDF)',
            latestArticles: 'Derniers Articles',
            allCategories: 'Toutes les catégories',
        },
        en: {
            title: 'Blog & Magazine',
            subtitle: 'News, trends, and lifestyle in luxury real estate.',
            readMore: 'Read article',
            downloadMag: 'Download magazine (PDF)',
            latestArticles: 'Latest Articles',
            allCategories: 'All categories',
        }
    }[lang] ?? { title: 'Blog & Magazine', subtitle: '', readMore: 'Lire', downloadMag: '', latestArticles: '', allCategories: '' };

    return (
        <main className="min-h-screen bg-white pt-24 pb-24">
            {/* Header */}
            <header className="bg-luxury-black text-white py-16 md:py-24 px-6 lg:px-12 text-center">
                <div className="max-w-4xl mx-auto">
                    <span className="inline-block text-[10px] font-semibold tracking-[0.4em] uppercase text-champagne mb-4">
                        Sotheby Realty France
                    </span>
                    <h1 className="font-serif text-4xl md:text-6xl mb-6">{content.title}</h1>
                    <p className="text-base md:text-lg text-white/70 font-light max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                </div>
            </header>

            <div className="max-w-8xl mx-auto px-6 lg:px-12 -mt-8 relative z-10">
                {/* Featured / Magazine Release */}
                <Link href={`/blog/${FEATURED_ARTICLE.slug}`} className="block">
                    <article className="bg-white border border-gray-100 shadow-xl overflow-hidden flex flex-col lg:flex-row mb-24 cursor-pointer group hover:shadow-2xl transition-all duration-300">
                        <div className="lg:w-3/5 relative min-h-[400px] lg:min-h-auto overflow-hidden">
                            <img
                                src={FEATURED_ARTICLE.image}
                                alt={lang === 'en' ? FEATURED_ARTICLE.titleEn : FEATURED_ARTICLE.titleFr}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out absolute inset-0"
                            />
                            <div className="absolute top-6 left-6 bg-champagne text-white text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 z-10">
                                {lang === 'en' ? FEATURED_ARTICLE.categoryEn : FEATURED_ARTICLE.categoryFr}
                            </div>
                        </div>
                        <div className="lg:w-2/5 p-10 lg:p-14 flex flex-col justify-center bg-luxury-cream">
                            <div className="text-xs text-luxury-muted mb-4 uppercase tracking-widest">
                                {lang === 'en' ? FEATURED_ARTICLE.dateEn : FEATURED_ARTICLE.dateFr}
                            </div>
                            <h2 className="font-serif text-3xl md:text-4xl text-luxury-black mb-6 leading-tight group-hover:text-champagne transition-colors">
                                {lang === 'en' ? FEATURED_ARTICLE.titleEn : FEATURED_ARTICLE.titleFr}
                            </h2>
                            <p className="text-luxury-muted leading-relaxed mb-10">
                                {lang === 'en' ? FEATURED_ARTICLE.excerptEn : FEATURED_ARTICLE.excerptFr}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <span className="btn-primary inline-flex justify-center text-center">
                                    {content.readMore}
                                </span>
                            </div>
                        </div>
                    </article>
                </Link>

                {/* Filters & Grid */}
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 gap-4">
                    <h3 className="font-serif text-2xl text-luxury-black">{content.latestArticles}</h3>
                    <div className="flex gap-6 overflow-x-auto pb-2 md:pb-0 scrollbar-hide text-sm">
                        <span
                            onClick={() => setActiveCategory(null)}
                            className={`font-medium whitespace-nowrap pb-1 cursor-pointer transition-colors border-b-2 ${activeCategory === null ? 'text-champagne border-champagne' : 'text-luxury-muted border-transparent hover:border-gray-300 hover:text-luxury-black'}`}
                        >
                            {content.allCategories}
                        </span>
                        {Array.from(new Set(ARTICLES.map(a => lang === 'fr' ? a.categoryFr : a.categoryEn))).map(cat => (
                            <span
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap cursor-pointer transition-colors pb-1 border-b-2 ${activeCategory === cat ? 'text-champagne border-champagne font-medium' : 'text-luxury-muted border-transparent hover:border-gray-300 hover:text-luxury-black'}`}
                            >
                                {cat}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {ARTICLES.filter(a => activeCategory === null || (lang === 'fr' ? a.categoryFr : a.categoryEn) === activeCategory).map((article) => (
                        <Link key={article.id} href={`/blog/${article.slug}`} className="block h-full">
                            <article className="group cursor-pointer flex flex-col h-full">
                                <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden bg-gray-100">
                                    <img
                                        src={article.image}
                                        alt={lang === 'en' ? article.titleEn : article.titleFr}
                                        className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                </div>
                                <div className="flex items-center gap-3 text-xs uppercase tracking-wider mb-3">
                                    <span className="text-champagne font-bold">{lang === 'en' ? article.categoryEn : article.categoryFr}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                    <span className="text-luxury-muted">{lang === 'en' ? article.dateEn : article.dateFr}</span>
                                </div>
                                <h4 className="font-serif text-xl text-luxury-black mb-3 leading-snug group-hover:text-champagne transition-colors">
                                    {lang === 'en' ? article.titleEn : article.titleFr}
                                </h4>
                                <p className="text-sm text-luxury-muted leading-relaxed line-clamp-3 mb-6 flex-grow">
                                    {lang === 'en' ? article.excerptEn : article.excerptFr}
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <span className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.15em] text-luxury-black group-hover:text-champagne transition-colors">
                                        {content.readMore}
                                        <svg className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                    </span>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <button className="btn-outline">
                        {lang === 'fr' ? 'Charger plus d\'articles' : 'Load more articles'}
                    </button>
                </div>
            </div>
        </main>
    );
}
