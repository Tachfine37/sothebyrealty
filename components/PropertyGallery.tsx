'use client';

import { useState } from 'react';
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
    const mainImage = images[0];

    return (
        <>
            {/* Loziara-style Grid Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[50vh] min-h-[400px] mb-12 rounded-2xl overflow-hidden relative">
                {/* Main large image */}
                <div
                    className="md:col-span-2 md:row-span-2 relative h-full cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
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
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Image src={img.url} alt={img.alt || ''} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="25vw" />
                    </div>
                ))}

                {/* Fill empty spots if less than 5 images */}
                {Array.from({ length: Math.max(0, 4 - images.slice(1).length) }).map((_, i) => (
                    <div key={`empty-${i}`} className="bg-gray-100 hidden md:block h-full"></div>
                ))}

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="absolute bottom-6 right-6 bg-white px-4 py-2 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 text-luxury-black transition-colors z-10"
                >
                    <svg className="w-4 h-4 border-[1.5px] border-black rounded-[2px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><circle cx="6" cy="6" r="1" /><circle cx="12" cy="6" r="1" /><circle cx="18" cy="6" r="1" /><circle cx="6" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="18" cy="12" r="1" /><circle cx="6" cy="18" r="1" /><circle cx="12" cy="18" r="1" /><circle cx="18" cy="18" r="1" /></svg>
                    Show all photos
                </button>
            </div>

            {/* Full Screen Modal Gallery */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-white overflow-y-auto w-full h-full flex flex-col">
                    {/* Modal Header */}
                    <div className="sticky top-0 bg-white/90 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-gray-100 z-10">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Share
                            </button>
                            <button className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:bg-gray-100 px-3 py-1.5 rounded-md transition-colors">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                Save
                            </button>
                        </div>
                    </div>

                    {/* Modal Content - Masonry Layout */}
                    <div className="p-6 md:p-12 lg:px-48 xl:px-80 mx-auto w-full flex-grow">
                        <div className="columns-1 md:columns-2 gap-4 space-y-4">
                            {images.map((img, idx) => (
                                <div key={img.id} className="relative w-full break-inside-avoid overflow-hidden rounded-lg">
                                    <Image
                                        src={img.url}
                                        alt={img.alt || `${title} photo ${idx + 1}`}
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto object-cover"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
