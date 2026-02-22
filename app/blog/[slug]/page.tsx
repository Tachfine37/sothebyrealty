'use client';

import { useParams, notFound } from 'next/navigation';
import { useTranslations } from '@/lib/i18n/LanguageContext';
import { ARTICLES, FEATURED_ARTICLE } from '@/lib/blogData';
import Image from 'next/image';
import Link from 'next/link';

export default function ArticlePage() {
    const params = useParams();
    const slug = params.slug as string;
    const { lang, t } = useTranslations();

    // Find article in standard articles or featured
    let article = ARTICLES.find(a => a.slug === slug);
    if (!article && FEATURED_ARTICLE.slug === slug) {
        article = FEATURED_ARTICLE as any;
    }

    if (!article) {
        notFound();
    }

    const title = lang === 'en' ? article.titleEn : article.titleFr;
    const date = lang === 'en' ? article.dateEn : article.dateFr;
    const category = lang === 'en' ? article.categoryEn : article.categoryFr;
    const contentParagraphs = lang === 'en' ? article.contentEn : article.contentFr;

    const renderParagraph = (text: string, idx: number) => {
        // Simple Markdown-like bold formatting for headings within paragraphs
        if (text.startsWith('**') && text.includes('**\n')) {
            const [heading, ...rest] = text.split('\n');
            const cleanHeading = heading.replace(/\*\*/g, '');
            return (
                <div key={idx} className="mb-6">
                    <h3 className="font-serif text-2xl text-luxury-black mb-3 mt-8">{cleanHeading}</h3>
                    <p className="text-lg leading-relaxed text-luxury-muted font-light">{rest.join('\n')}</p>
                </div>
            );
        }

        return (
            <p key={idx} className="text-lg leading-relaxed text-luxury-muted font-light mb-6">
                {text}
            </p>
        );
    };

    return (
        <main className="min-h-screen bg-white pt-24 pb-24">
            {/* Minimalist Header */}
            <header className="max-w-4xl mx-auto px-6 lg:px-12 text-center pt-8 pb-12">
                <Link href="/blog" className="inline-flex items-center gap-2 text-xs text-luxury-muted hover:text-champagne transition-colors mb-8">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                    {lang === 'en' ? 'Back to Blog' : 'Retour au Blog'}
                </Link>

                <div className="flex items-center justify-center gap-3 text-xs uppercase tracking-wider mb-6">
                    <span className="text-champagne font-bold">{category}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-luxury-muted">{date}</span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-luxury-black leading-tight mb-8">
                    {title}
                </h1>

                <div className="w-16 h-px bg-champagne mx-auto" />
            </header>

            {/* Hero Image */}
            <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-16">
                <div className="relative aspect-[21/9] w-full bg-gray-100 overflow-hidden shadow-2xl">
                    <img
                        src={article.image}
                        alt={title}
                        className="w-full h-full object-cover absolute inset-0"
                    />
                </div>
            </div>

            {/* Content Body */}
            <article className="max-w-3xl mx-auto px-6 lg:px-12 text-luxury-black">
                {/* Intro Excerpt */}
                <p className="text-xl md:text-2xl font-serif leading-relaxed text-luxury-black border-l-2 border-champagne pl-6 mb-12">
                    {lang === 'en' ? article.excerptEn : article.excerptFr}
                </p>

                {/* Main Content */}
                <div className="space-y-4">
                    {contentParagraphs.map(renderParagraph)}
                </div>

                {/* Author / Share Footer */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-luxury-cream rounded-full flex items-center justify-center text-champagne font-serif text-lg">
                            SR
                        </div>
                        <div>
                            <p className="text-sm font-bold text-luxury-black">Sotheby Realty France</p>
                            <p className="text-xs text-luxury-muted uppercase tracking-wider">{lang === 'en' ? 'Editorial Team' : 'La Rédaction'}</p>
                        </div>
                    </div>

                    <button className="btn-outline text-xs py-2 px-4 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
                        {lang === 'en' ? 'Share Article' : 'Partager l\'article'}
                    </button>
                </div>
            </article>
        </main>
    );
}
