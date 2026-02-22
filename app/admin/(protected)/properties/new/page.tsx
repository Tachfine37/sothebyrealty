'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DESTINATIONS = [
    { value: 'cote-dazur', label: "Côte d'Azur" },
    { value: 'paris', label: 'Paris & Île-de-France' },
    { value: 'alpes', label: 'Alpes & Savoie' },
    { value: 'bordeaux', label: 'Bordeaux' },
    { value: 'provence', label: 'Provence' },
];

const TYPES = ['VILLA', 'APPARTEMENT', 'CHALET', 'DOMAINE', 'PENTHOUSE', 'MAISON', 'TERRAIN'];

export default function NewPropertyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const preview = URL.createObjectURL(file);
        setImagePreview(preview);
        const form = new FormData();
        form.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: form });
        if (res.ok) {
            const data = await res.json();
            setUploadedImageUrl(data.url);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');
        const form = e.currentTarget;
        const fd = new FormData(form);
        const amenitiesRaw = (fd.get('amenities') as string) ?? '';
        const amenities = amenitiesRaw.split('\n').map((a) => a.trim()).filter(Boolean);
        const body = {
            slug: fd.get('slug') as string,
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
            const res = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? 'Erreur lors de la création');
            }
            const property = await res.json();
            // If we uploaded an image, attach it
            if (uploadedImageUrl) {
                await fetch(`/api/properties/${property.slug}/images`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: uploadedImageUrl, alt: body.title, order: 0 }),
                });
            }
            router.push('/admin/properties');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => router.back()} className="text-luxury-muted hover:text-champagne transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <h1 className="font-serif text-3xl text-luxury-black">Nouvelle Annonce</h1>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main form */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="admin-card flex flex-col gap-5">
                        <h2 className="font-semibold text-luxury-black text-sm border-b border-gray-100 pb-3">Informations principales</h2>
                        <div>
                            <label className="form-label">Titre *</label>
                            <input name="title" required className="form-input" placeholder="Villa Prestige — Cap-Ferrat, Vue Mer" />
                        </div>
                        <div>
                            <label className="form-label">Slug (URL) *</label>
                            <input name="slug" required className="form-input" placeholder="villa-cap-ferrat-vue-mer" pattern="[a-z0-9-]+" title="Minuscules et tirets uniquement" />
                            <p className="text-[11px] text-luxury-muted mt-1">Ex: villa-cap-ferrat-vue-mer</p>
                        </div>
                        <div>
                            <label className="form-label">Description *</label>
                            <textarea name="description" required rows={8} className="form-input form-textarea" placeholder="Description détaillée de la propriété..." />
                        </div>
                        <div>
                            <label className="form-label">Prestations (une par ligne)</label>
                            <textarea name="amenities" rows={5} className="form-input form-textarea" placeholder="Piscine à débordement&#10;Vue mer panoramique&#10;Hammam & Sauna" />
                        </div>
                    </div>

                    <div className="admin-card flex flex-col gap-5">
                        <h2 className="font-semibold text-luxury-black text-sm border-b border-gray-100 pb-3">Caractéristiques</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Prix (€) *</label>
                                <input name="price" type="number" required min={1} className="form-input" placeholder="12500000" />
                            </div>
                            <div>
                                <label className="form-label">Surface (m²) *</label>
                                <input name="surface" type="number" required min={1} className="form-input" placeholder="680" />
                            </div>
                            <div>
                                <label className="form-label">Chambres</label>
                                <input name="bedrooms" type="number" required min={0} className="form-input" placeholder="7" />
                            </div>
                            <div>
                                <label className="form-label">Salles de bains</label>
                                <input name="bathrooms" type="number" required min={0} className="form-input" placeholder="6" />
                            </div>
                            <div>
                                <label className="form-label">Pièces totales</label>
                                <input name="rooms" type="number" required min={1} className="form-input" placeholder="10" />
                            </div>
                            <div>
                                <label className="form-label">DPE</label>
                                <select name="dpe" className="form-select">
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
                                <select name="destination" required className="form-select">
                                    {DESTINATIONS.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="form-label">Type de bien *</label>
                                <select name="type" required className="form-select">
                                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="form-label">Ville *</label>
                                <input name="city" required className="form-input" placeholder="Saint-Jean-Cap-Ferrat" />
                            </div>
                            <div>
                                <label className="form-label">Adresse</label>
                                <input name="address" className="form-input" placeholder="Chemin des Oliviers, Cap-Ferrat" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="flex flex-col gap-6">
                    <div className="admin-card flex flex-col gap-4">
                        <h2 className="font-semibold text-luxury-black text-sm border-b border-gray-100 pb-3">Publication</h2>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input name="published" type="checkbox" defaultChecked className="w-4 h-4 accent-champagne" />
                            <span className="text-sm text-luxury-black">Publier immédiatement</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input name="featured" type="checkbox" className="w-4 h-4 accent-champagne" />
                            <span className="text-sm text-luxury-black">Afficher en vedette</span>
                        </label>
                        <div>
                            <label className="form-label">Badge</label>
                            <input name="badge" className="form-input" placeholder="Exclusivité, Nouveau, Vue Mer…" />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary justify-center mt-2 disabled:opacity-50">
                            {loading ? 'Création en cours…' : 'Créer l\'annonce'}
                        </button>
                    </div>

                    {/* Image upload */}
                    <div className="admin-card flex flex-col gap-4">
                        <h2 className="font-semibold text-luxury-black text-sm border-b border-gray-100 pb-3">Photo principale</h2>
                        {imagePreview && (
                            <div className="relative w-full h-40 overflow-hidden bg-luxury-cream">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={imagePreview} alt="Aperçu" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <label className="border-2 border-dashed border-gray-200 hover:border-champagne transition-colors p-6 text-center cursor-pointer block">
                            <svg className="w-8 h-8 text-luxury-light mx-auto mb-2" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                            </svg>
                            <span className="text-xs text-luxury-muted">Cliquer pour choisir une image</span>
                            <input type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                        </label>
                        <p className="text-[11px] text-luxury-muted">JPEG, PNG, WebP. Max 10 MB.</p>
                    </div>
                </div>
            </form>
        </>
    );
}
