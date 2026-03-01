'use client';

import { useState, useRef } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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

// ---------------------------------------------------------------------------
// SORTABLE ITEM COMPONENT
// ---------------------------------------------------------------------------
function SortableImageItem({
    img,
    idx,
    onDelete
}: {
    img: PropertyImage;
    idx: number;
    onDelete: (id: string) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: img.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 2 : 1,
        opacity: isDragging ? 0.8 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative group aspect-video bg-luxury-cream overflow-hidden rounded-sm cursor-grab ${isDragging ? 'shadow-xl cursor-grabbing ring-2 ring-champagne' : ''}`}
            {...attributes}
            {...listeners}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover pointer-events-none"
            />

            {/* Labels */}
            {idx === 0 && (
                <span className="absolute top-2 left-2 bg-champagne text-white text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 shadow-sm">
                    Principale
                </span>
            )}

            {/* Drag Handle Icon (visible on hover) */}
            <div className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>

            {/* Delete button wrapper (isolated from drag events) */}
            <div
                className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                onPointerDown={(e) => e.stopPropagation()} // Prevent drag start when clicking delete
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete(img.id);
                }}
            >
                <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md cursor-pointer"
                    title="Supprimer"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );
}


// ---------------------------------------------------------------------------
// MAIN COMPONENT
// ---------------------------------------------------------------------------
export default function PropertyImagesManager({ propertyId, initialImages }: Props) {
    // Sort initial images by order before setting initial state
    const sortedInitial = [...initialImages].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const [images, setImages] = useState<PropertyImage[]>(sortedInitial);

    const [uploading, setUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState('');
    const [isSavingOrder, setIsSavingOrder] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Setup DnD sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Requires minimum 5px movement before drag starts, allows clicks on elements
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Reorder API call
    async function saveImageOrder(newOrderedImages: PropertyImage[]) {
        setIsSavingOrder(true);
        setError('');

        try {
            const orderedIds = newOrderedImages.map(img => img.id);
            const res = await fetch(`/api/images/${propertyId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orderedIds }),
            });

            if (!res.ok) {
                throw new Error('Erreur lors de la sauvegarde de l\'ordre des images');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload error');
            // We don't revert state on failure to keep UI smooth, but ideally we should in a robust app
        } finally {
            setIsSavingOrder(false);
        }
    }

    // Handle drag end
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = images.findIndex((img) => img.id === active.id);
            const newIndex = images.findIndex((img) => img.id === over.id);

            const newOrder = arrayMove(images, oldIndex, newIndex);

            // Update local state immediately for snappy UI
            setImages(newOrder);

            // Save to database
            saveImageOrder(newOrder);
        }
    }

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
        if (!window.confirm('Supprimer cette photo ?')) return;
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
        <div className="admin-card flex flex-col gap-4 relative">

            {isSavingOrder && (
                <div className="absolute top-4 right-4 text-[10px] bg-black text-white px-2 py-1 rounded shadow animate-pulse">
                    Sauvegarde de l&apos;ordre...
                </div>
            )}

            <h2 className="font-semibold text-luxury-black text-sm border-b border-gray-100 pb-3 flex items-center justify-between">
                <span>
                    Photos de l&apos;annonce
                    <span className="ml-2 text-[11px] text-luxury-muted font-normal">({images.length} photo{images.length !== 1 ? 's' : ''})</span>
                </span>

                {images.length > 1 && (
                    <span className="text-[10px] text-gray-400 font-normal italic flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V7a5 5 0 0110 0v4m-10 0a2 2 0 00-2 2v1h14v-1a2 2 0 00-2-2m-10 0z" />
                        </svg>
                        Glissez-déposez pour réorganiser
                    </span>
                )}
            </h2>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 rounded">
                    {error}
                </div>
            )}

            {/* DndContext Wrapper for the Grid */}
            {images.length > 0 && (
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={images.map(img => img.id)}
                        strategy={rectSortingStrategy}
                    >
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                            {images.map((img, idx) => (
                                <SortableImageItem
                                    key={img.id}
                                    img={img}
                                    idx={idx}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>
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
