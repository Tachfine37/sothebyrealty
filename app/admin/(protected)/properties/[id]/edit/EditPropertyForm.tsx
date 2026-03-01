'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Property, PropertyImage } from '@prisma/client';
import { parseAmenities } from '@/lib/utils';
import PropertyImagesManager from './PropertyImagesManager';
import AmenitiesSelector from '@/components/admin/AmenitiesSelector';

const DESTINATIONS = [
    { value: 'courchevel', label: 'Courchevel' },
    { value: 'paris', label: 'Paris' },
    { value: 'st-moritz', label: 'St Moritz' },
    { value: 'verbier', label: 'Verbier' },
    { value: 'zermatt', label: 'Zermatt' },
];

const TYPES = ['VILLA', 'APPARTEMENT', 'CHALET', 'DOMAINE', 'PENTHOUSE', 'MAISON', 'TERRAIN'];

type PropertyWithImages = Property & { images: PropertyImage[] };

export default function EditPropertyForm({ property }: { property: PropertyWithImages }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const form = e.currentTarget;
        const fd = new FormData(form);
        const amenitiesRaw = (fd.get('amenities') as string) ?? '';
        const amenities = amenitiesRaw.split('\n').map((a) => a.trim()).filter(Boolean);

        const body = {
            title: fd.get('title') as string,
            description: fd.get('description') as string,
            price: parseInt(fd.get('price') as string),
            surface: parseInt(fd.get('surface') as string),
            rooms: parseInt(fd.get('rooms') as string),
            bedrooms: parseInt(fd.get('bedrooms') as string),
            bathrooms: parseInt(fd.get('bathrooms') as string),
            type: fd.get('type') as string,
            destination: fd.get('destination') as string,
            city: fd.get('city') as string,
            address: fd.get('address') as string,
            badge: fd.get('badge') as string,
            dpe: fd.get('dpe') as string,
            featured: fd.get('featured') === 'on',
            published: fd.get('published') === 'on',
            amenities,
        };

        try {
            const res = await fetch(`/api/properties/${property.slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? 'Erreur lors de la modification');
            }

            router.push('/admin/properties');
            router.refresh();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {error && (
                <div className="lg:col-span-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                    {error}
                </div>
            )}

            {/* Main form */}
            <div className="lg:col-span-2 flex flex-col gap-6">
                <div className="admin-card flex flex-col gap-5">
                    <h2 className="font-semibold text-luxury-black text-sm border-b border-gray-100 pb-3">Informations principales</h2>
                    <div>
                        <label className="form-label">Titre *</label>
                        <input name="title" required className="form-input" defaultValue={property.title} />
                    </div>
                    <div>
                        <label className="form-label">Slug (URL) - En lecture seule</label>
                        <input name="slug" className="form-input bg-gray-50 text-gray-500 cursor-not-allowed" defaultValue={property.slug} disabled />
                    </div>
                    <div>
                        <label className="form-label">Description *</label>
                        <textarea name="description" required rows={8} className="form-input form-textarea" defaultValue={property.description} />
                    </div>
                    <div>
                        <label className="form-label">Prestations</label>
                        <AmenitiesSelector initialAmenities={parseAmenities(property.amenities)} />
                    </div>
                </div>

                <div className="admin-card flex flex-col gap-5">
                    <h2 className="font-semibold text-luxury-black text-sm border-b border-gray-100 pb-3">Caractéristiques</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Prix (€) *</label>
                            <input name="price" type="number" required min={1} className="form-input" defaultValue={property.price} />
                        </div>
                        <div>
                            <label className="form-label">Surface (m²) *</label>
                            <input name="surface" type="number" required min={1} className="form-input" defaultValue={property.surface} />
                        </div>
                        <div>
                            <label className="form-label">Chambres</label>
                            <input name="bedrooms" type="number" required min={0} className="form-input" defaultValue={property.bedrooms} />
                        </div>
                        <div>
                            <label className="form-label">Capacité (Guests)</label>
                            <input name="guests" type="number" required min={0} className="form-input" defaultValue={property.guests ?? 0} />
                        </div>
                        <div>
                            <label className="form-label">Salles de bains</label>
                            <input name="bathrooms" type="number" required min={0} className="form-input" defaultValue={property.bathrooms} />
                        </div>
                        <div>
                            <label className="form-label">Pièces totales</label>
                            <input name="rooms" type="number" required min={1} className="form-input" defaultValue={property.rooms} />
                        </div>
                        <div>
                            <label className="form-label">DPE</label>
                            <select name="dpe" className="form-select" defaultValue={property.dpe ?? ''}>
                                <option value="">Sélectionner</option>
                                {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="admin-card flex flex-col gap-5">
                    <h2 className="font-semibold text-luxury-black text-sm border-b border-gray-100 pb-3">Localisation</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Destination *</label>
                            <select name="destination" required className="form-select" defaultValue={property.destination}>
                                {DESTINATIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Type de bien *</label>
                            <select name="type" required className="form-select" defaultValue={property.type}>
                                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Ville *</label>
                            <input name="city" required className="form-input" defaultValue={property.city} />
                        </div>
                        <div>
                            <label className="form-label">Adresse</label>
                            <input name="address" className="form-input" defaultValue={property.address ?? ''} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
                <div className="admin-card flex flex-col gap-4">
                    <h2 className="font-semibold text-luxury-black text-sm border-b border-gray-100 pb-3">Publication</h2>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input name="published" type="checkbox" defaultChecked={property.published} className="w-4 h-4 accent-champagne" />
                        <span className="text-sm text-luxury-black">Publier immédiatement</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input name="featured" type="checkbox" defaultChecked={property.featured} className="w-4 h-4 accent-champagne" />
                        <span className="text-sm text-luxury-black">Afficher en vedette</span>
                    </label>
                    <div>
                        <label className="form-label">Badge</label>
                        <input name="badge" className="form-input" defaultValue={property.badge ?? ''} />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary justify-center mt-2 disabled:opacity-50">
                        {loading ? 'Enregistrement…' : 'Enregistrer les modifications'}
                    </button>
                </div>

                {/* Images Manager */}
                <PropertyImagesManager propertyId={property.id} initialImages={property.images} />
            </div>
        </form>
    );
}
