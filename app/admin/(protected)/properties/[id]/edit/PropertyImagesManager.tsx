'use client';

import { useState, useRef } from 'react';

interface PropertyImage {
    id: string;
    url: string;
    alt: string;
    order: number;
    propertyId: string;
    createdAt: Date;
}

interface Props {
    propertyId: string;
    initialImages: PropertyImage[];
}

export default function PropertyImagesManager({ propertyId, initialImages }: Props) {
    const [images, setImages] = useState<PropertyImage[]>(initialImages);
    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function uploadFiles(files: FileList | File[]) {
        const fileArr = Array.from(files);
        if (!fileArr.length) return;

        setUploading(true);
        setError('');

        for (const file of fileArr) {
            try {
                // 1. Upload file to /api/upload
                const formData = new FormData();
                formData.append('file', file);
                const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
                if (!uploadRes.ok) {
                    const d = await uploadRes.json();
                    throw new Error(d.error ?? 'Upload failed');
                }
                const { url } = await uploadRes.json();

                // 2. Register image in DB via /api/images/[propertyId]
                const imgRes = await fetch(`/api/images/${propertyId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url, alt: file.name.replace(/\.[^.]+$/, '') }),
                });
                if (!imgRes.ok) {
                    const d = await imgRes.json();
                    throw new Error(d.error ?? 'Failed to register image');
                }
                const newImage: PropertyImage = await imgRes.json();
                setImages((prev) => [...prev, newImage]);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Upload error');
            }
        }
        setUploading(false);
    }

    async function handleDelete(imageId: string) {
        if (!confirm('Supprimer cette photo ?')) return;
        const res = await fetch(`/api/images/${propertyId}?imageId=${imageId}`, { method: 'DELETE' });
        if (res.ok) {
            setImages((prev) => prev.filter((img) => img.id !== imageId));
        } else {
            setError('Erreur lors de la suppression');
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length) {
            uploadFiles(e.dataTransfer.files);
        }
    }

    return (
        <div className="admin-card flex flex-col gap-4">
            <h2 className="font-semibold text-luxury-black text-sm border-b border-gray-100 pb-3">
                Photos de l&apos;annonce
                <span className="ml-2 text-[11px] text-luxury-muted font-normal">({images.length} photo{images.length !== 1 ? 's' : ''})</span>
            </h2>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 rounded">
                    {error}
                </div>
            )}

            {/* Image grid */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                    {images.map((img, idx) => (
                        <div key={img.id} className="relative group aspect-video bg-luxury-cream overflow-hidden rounded-sm">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={img.url}
                                alt={img.alt}
                                className="w-full h-full object-cover"
                            />
                            {/* Labels */}
                            {idx === 0 && (
                                <span className="absolute top-2 left-2 bg-champagne text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5">
                                    Principale
                                </span>
                            )}
                            {/* Delete overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                <button
                                    type="button"
                                    onClick={() => handleDelete(img.id)}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center"
                                    title="Supprimer"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload zone */}
            <div
                className={`border-2 border-dashed transition-colors p-6 text-center cursor-pointer rounded-sm ${dragOver
                    ? 'border-champagne bg-champagne/5'
                    : 'border-gray-200 hover:border-champagne/60'
                    } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs text-luxury-muted">Upload en cours…</span>
                    </div>
                ) : (
                    <>
                        <svg className="w-8 h-8 text-luxury-light mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                        <p className="text-sm font-medium text-luxury-black mb-1">
                            Ajouter des photos
                        </p>
                        <p className="text-xs text-luxury-muted">
                            Glissez-déposez ou cliquez · JPEG, PNG, WebP · max 10 Mo par photo
                        </p>
                    </>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                multiple
                className="sr-only"
                onChange={(e) => e.target.files && uploadFiles(e.target.files)}
            />
        </div>
    );
}
