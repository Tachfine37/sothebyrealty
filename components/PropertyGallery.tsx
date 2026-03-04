'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface PropertyImage {
    id: string;
    url: string;
    alt?: string | null;
}

interface PropertyGalleryProps {
    images: PropertyImage[];
    title: string;
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const mainImage = images[0];

    // Navigation handlers
    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const handleClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        if (!isModalOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'Escape') handleClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen, handleNext, handlePrev, handleClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const handleOpenModal = (index: number) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
    };

    return (
        <>
            {/* Loziara-style Grid Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[50vh] min-h-[400px] mb-12 rounded-2xl overflow-hidden relative">
                {/* Main large image */}
                <div
                    className="md:col-span-2 md:row-span-2 relative h-full cursor-pointer"
                    onClick={() => handleOpenModal(0)}
                >
                    {mainImage ? (
                        <Image src={mainImage.url} alt={mainImage.alt || title} fill className="object-cover hover:scale-105 transition-transform duration-500" priority sizes="(max-width: 768px) 100vw, 50vw" />
                    ) : (
                        <div className="w-full h-full bg-gray-100" />
                    )}
                </div>
                {/* Secondary images (up to 4) */}
                {images.slice(1, 5).map((img, idx) => (
                    <div
                        key={img.id}
                        className="relative hidden md:block h-full overflow-hidden cursor-pointer"
                        onClick={() => handleOpenModal(idx + 1)}
                    >
                        <Image src={img.url} alt={img.alt || ''} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="25vw" />
                    </div>
                ))}

                {/* Fill empty spots if less than 5 images */}
                {Array.from({ length: Math.max(0, 4 - images.slice(1).length) }).map((_, i) => (
                    <div key={`empty-${i}`} className="bg-gray-100 hidden md:block h-full"></div>
                ))}

                <button
                    onClick={() => handleOpenModal(0)}
                    className="absolute bottom-6 right-6 bg-white px-4 py-2 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 text-luxury-black transition-colors z-10"
                >
                    <svg className="w-4 h-4 border-[1.5px] border-black rounded-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="6" cy="6" r="1" /><circle cx="12" cy="6" r="1" /><circle cx="18" cy="6" r="1" /><circle cx="6" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="18" cy="12" r="1" /><circle cx="6" cy="18" r="1" /><circle cx="12" cy="18" r="1" /><circle cx="18" cy="18" r="1" /></svg>
                    Show all photos
                </button>
            </div>

            {/* Full Screen Modal Gallery Slider */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-[#222222] text-white flex flex-col h-[100dvh]">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 z-10 bg-gradient-to-b from-black/50 to-transparent">
                        <button
                            onClick={handleClose}
                            className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-sm font-medium">
                            {currentIndex + 1} / {images.length}
                        </div>

                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 transition-colors tooltip tooltip-bottom" data-tip="Share">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                            </button>
                            <button className="flex items-center gap-2 p-2 rounded-full hover:bg-white/10 transition-colors tooltip tooltip-bottom" data-tip="Save">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Modal Content - Slider */}
                    <div className="relative flex-grow flex items-center justify-center overflow-hidden">
                        {/* Previous Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 text-white hover:text-gray-300 mix-blend-difference hover:scale-110 transition-transform"
                            aria-label="Previous image"
                        >
                            <svg className="w-10 h-10 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Current Image */}
                        <div className="w-full h-full max-w-7xl max-h-[85vh] p-4 flex items-center justify-center relative select-none">
                            {images[currentIndex] && (
                                <Image
                                    src={images[currentIndex].url}
                                    alt={images[currentIndex].alt || `${title} photo ${currentIndex + 1}`}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    priority
                                    quality={100}
                                />
                            )}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 text-white hover:text-gray-300 mix-blend-difference hover:scale-110 transition-transform"
                            aria-label="Next image"
                        >
                            <svg className="w-10 h-10 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Thumbnail Strip (Optional, for better UX) */}
                     <div className="h-24 pb-4 px-4 overflow-x-auto flex items-center justify-center gap-2 bg-gradient-to-t from-black/50 to-transparent flex-shrink-0 hide-scrollbar">
                        <div className="flex gap-2 mx-auto">
                            {images.map((img, idx) => (
                                <button
                                    key={img.id}
                                    onClick={() => setCurrentIndex(idx)}
                                    className={`relative h-16 w-24 flex-shrink-0 cursor-pointer overflow-hidden rounded-md transition-all ${
                                        currentIndex === idx ? 'ring-2 ring-white opacity-100 scale-105' : 'opacity-50 hover:opacity-100'
                                    }`}
                                >
                                    <Image
                                        src={img.url}
                                        alt={`Thumbnail ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
