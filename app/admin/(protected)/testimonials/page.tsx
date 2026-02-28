'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

type Testimonial = {
    id: string;
    name: string;
    title: string;
    text: string;
    image: string | null;
    stars: number;
    order: number;
    published: boolean;
};

const empty: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'> = {
    name: '',
    title: '',
    text: '',
    image: null,
    stars: 5,
    order: 0,
    published: true,
};

function StarSelector({ value, onChange }: { value: number; onChange: (v: number) => void }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    className={`text-2xl transition-colors ${star <= value ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | 'new' | null>(null);
    const [form, setForm] = useState<typeof empty>({ ...empty });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [uploadingImage, setUploadingImage] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    async function fetchTestimonials() {
        try {
            const res = await fetch('/api/testimonials?all=1');
            if (res.ok) {
                const data = await res.json();
                setTestimonials(data);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { fetchTestimonials(); }, []);

    function startNew() {
        setForm({ ...empty, order: testimonials.length });
        setEditingId('new');
        setError('');
    }

    function startEdit(t: Testimonial) {
        setForm({ name: t.name, title: t.title, text: t.text, image: t.image, stars: t.stars, order: t.order, published: t.published });
        setEditingId(t.id);
        setError('');
    }

    function cancelEdit() {
        setEditingId(null);
        setForm({ ...empty });
        setError('');
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingImage(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            if (res.ok) {
                const data = await res.json();
                setForm(f => ({ ...f, image: data.url }));
            }
        } finally {
            setUploadingImage(false);
        }
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            if (editingId === 'new') {
                const res = await fetch('/api/testimonials', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
                if (!res.ok) {
                    const d = await res.json();
                    throw new Error(d.error ?? 'Erreur lors de la création');
                }
            } else {
                const res = await fetch(`/api/testimonials/${editingId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form),
                });
                if (!res.ok) {
                    const d = await res.json();
                    throw new Error(d.error ?? 'Erreur lors de la modification');
                }
            }
            await fetchTestimonials();
            cancelEdit();
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Une erreur est survenue');
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Supprimer cet avis ?')) return;
        try {
            await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
            await fetchTestimonials();
        } catch {
            //
        }
    }

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-serif text-3xl text-luxury-black">Avis Clients</h1>
                    <p className="text-sm text-luxury-muted mt-1">Gérez les témoignages affichés sur la page d&apos;accueil.</p>
                </div>
                {editingId === null && (
                    <button onClick={startNew} className="btn-primary btn-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        Nouvel Avis
                    </button>
                )}
            </div>

            {/* FORM — new or edit */}
            {editingId !== null && (
                <div className="admin-card mb-8">
                    <h2 className="font-semibold text-luxury-black text-sm border-b border-gray-100 pb-3 mb-5">
                        {editingId === 'new' ? 'Nouvel avis' : 'Modifier l\'avis'}
                    </h2>
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm mb-5">{error}</div>
                    )}
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Left column */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="form-label">Nom *</label>
                                <input
                                    required
                                    className="form-input"
                                    value={form.name}
                                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                    placeholder="Jean Dupont"
                                />
                            </div>
                            <div>
                                <label className="form-label">Titre / Rôle</label>
                                <input
                                    className="form-input"
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    placeholder="CEO, Paris"
                                />
                            </div>
                            <div>
                                <label className="form-label">Texte de l&apos;avis *</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="form-input form-textarea"
                                    value={form.text}
                                    onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                                    placeholder="Un séjour inoubliable..."
                                />
                            </div>
                            <div>
                                <label className="form-label">Étoiles</label>
                                <StarSelector value={form.stars} onChange={v => setForm(f => ({ ...f, stars: v }))} />
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="form-label">Photo du client</label>
                                {form.image && (
                                    <div className="mb-3 flex items-center gap-3">
                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={form.image} alt="Aperçu" className="w-full h-full object-cover" />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setForm(f => ({ ...f, image: null }))}
                                            className="text-xs text-red-500 hover:text-red-700"
                                        >
                                            Supprimer la photo
                                        </button>
                                    </div>
                                )}
                                <label className={`border-2 border-dashed border-gray-200 hover:border-champagne transition-colors p-4 text-center cursor-pointer block ${uploadingImage ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <svg className="w-6 h-6 text-luxury-light mx-auto mb-1" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                                    </svg>
                                    <span className="text-xs text-luxury-muted">{uploadingImage ? 'Upload...' : 'Choisir une photo'}</span>
                                    <input ref={fileRef} type="file" className="sr-only" accept="image/*" onChange={handleImageUpload} />
                                </label>
                            </div>
                            <div>
                                <label className="form-label">Ordre d&apos;affichage</label>
                                <input
                                    type="number"
                                    min={0}
                                    className="form-input"
                                    value={form.order}
                                    onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    id="published-toggle"
                                    type="checkbox"
                                    className="w-4 h-4 accent-champagne"
                                    checked={form.published}
                                    onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                                />
                                <label htmlFor="published-toggle" className="text-sm text-luxury-black cursor-pointer">Publié</label>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-2 flex gap-3 pt-2 border-t border-gray-100">
                            <button type="submit" disabled={saving} className="btn-primary justify-center disabled:opacity-50">
                                {saving ? 'Enregistrement...' : editingId === 'new' ? 'Créer l\'avis' : 'Sauvegarder'}
                            </button>
                            <button type="button" onClick={cancelEdit} className="px-4 py-2 border border-gray-200 text-sm text-luxury-muted hover:border-champagne hover:text-champagne transition-colors">
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* LIST */}
            {loading ? (
                <div className="admin-card text-center py-12 text-luxury-muted text-sm">Chargement...</div>
            ) : testimonials.length === 0 ? (
                <div className="admin-card text-center py-16">
                    <svg className="w-10 h-10 text-luxury-light mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p className="text-luxury-muted text-sm">Aucun avis. Ajoutez le premier !</p>
                </div>
            ) : (
                <div className="admin-card overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left pb-3 text-[11px] font-semibold tracking-wider uppercase text-luxury-muted">Photo</th>
                                <th className="text-left pb-3 text-[11px] font-semibold tracking-wider uppercase text-luxury-muted">Nom</th>
                                <th className="text-left pb-3 text-[11px] font-semibold tracking-wider uppercase text-luxury-muted">Texte</th>
                                <th className="text-left pb-3 text-[11px] font-semibold tracking-wider uppercase text-luxury-muted">Étoiles</th>
                                <th className="text-left pb-3 text-[11px] font-semibold tracking-wider uppercase text-luxury-muted">Statut</th>
                                <th className="text-right pb-3 text-[11px] font-semibold tracking-wider uppercase text-luxury-muted">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {testimonials.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 pr-4">
                                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                            {t.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-champagne/20 flex items-center justify-center text-champagne text-sm font-semibold">
                                                    {t.name.charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <p className="font-medium text-luxury-black">{t.name}</p>
                                        {t.title && <p className="text-xs text-luxury-muted">{t.title}</p>}
                                    </td>
                                    <td className="py-3 pr-4 max-w-xs">
                                        <p className="text-xs text-luxury-muted line-clamp-2">{t.text}</p>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className="text-yellow-400 text-sm">{'★'.repeat(t.stars)}<span className="text-gray-200">{'★'.repeat(5 - t.stars)}</span></span>
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-1 ${t.published ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-600'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${t.published ? 'bg-green-500' : 'bg-orange-500'}`} />
                                            {t.published ? 'Publié' : 'Brouillon'}
                                        </span>
                                    </td>
                                    <td className="py-3 text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button
                                                onClick={() => startEdit(t)}
                                                className="text-xs text-luxury-black hover:text-champagne transition-colors px-2 py-1 border border-gray-200 hover:border-champagne"
                                            >
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(t.id)}
                                                className="text-xs text-red-400 hover:text-red-600 transition-colors px-2 py-1 border border-red-100 hover:border-red-300"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    );
}
