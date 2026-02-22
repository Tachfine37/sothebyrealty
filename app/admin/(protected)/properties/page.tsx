import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import DeleteButton from './DeleteButton';

export default async function AdminPropertiesPage() {
    const properties = await prisma.property.findMany({
        orderBy: { createdAt: 'desc' },
        include: { images: { take: 1, orderBy: { order: 'asc' } }, agent: { select: { name: true } } },
    });

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-serif text-3xl text-luxury-black">Toutes les Annonces</h1>
                    <p className="text-sm text-luxury-muted mt-1">{properties.length} propriété{properties.length > 1 ? 's' : ''} au total</p>
                </div>
                <Link href="/admin/properties/new" className="btn-primary btn-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Nouvelle Annonce
                </Link>
            </div>

            <div className="admin-card p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="text-left px-6 py-4 text-[11px] font-bold tracking-wider uppercase text-luxury-muted">Titre</th>
                                <th className="text-left px-4 py-4 text-[11px] font-bold tracking-wider uppercase text-luxury-muted">Type</th>
                                <th className="text-left px-4 py-4 text-[11px] font-bold tracking-wider uppercase text-luxury-muted">Prix</th>
                                <th className="text-left px-4 py-4 text-[11px] font-bold tracking-wider uppercase text-luxury-muted">Destination</th>
                                <th className="text-left px-4 py-4 text-[11px] font-bold tracking-wider uppercase text-luxury-muted">Statut</th>
                                <th className="text-right px-6 py-4 text-[11px] font-bold tracking-wider uppercase text-luxury-muted">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {properties.map((prop) => (
                                <tr key={prop.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-medium text-luxury-black line-clamp-1 max-w-xs">{prop.title}</p>
                                        <p className="text-[11px] text-luxury-muted mt-0.5">{prop.reference}</p>
                                    </td>
                                    <td className="px-4 py-4 text-xs text-luxury-muted">{prop.type}</td>
                                    <td className="px-4 py-4 text-sm font-semibold text-champagne whitespace-nowrap">{formatPrice(prop.price)}</td>
                                    <td className="px-4 py-4 text-xs text-luxury-muted">{prop.destination}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm ${prop.published ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-600'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${prop.published ? 'bg-green-500' : 'bg-orange-500'}`} />
                                            {prop.published ? 'Publié' : 'Brouillon'}
                                            {prop.featured && <span className="ml-1 text-champagne">⭐</span>}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 justify-end">
                                            <Link href={`/annonces/${prop.slug}`} target="_blank"
                                                className="text-[11px] text-luxury-muted hover:text-champagne transition-colors px-2.5 py-1.5 border border-gray-200 hover:border-champagne/40">
                                                Voir ↗
                                            </Link>
                                            <Link href={`/admin/properties/${prop.id}/edit`}
                                                className="text-[11px] text-luxury-black hover:text-champagne transition-colors px-2.5 py-1.5 border border-gray-200 hover:border-champagne/40">
                                                Modifier
                                            </Link>
                                            <DeleteButton id={prop.id} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {properties.length === 0 && (
                    <div className="text-center py-16 text-luxury-muted">
                        <p className="font-serif text-xl mb-2">Aucune annonce.</p>
                        <Link href="/admin/properties/new" className="btn-primary btn-sm">Créer la première</Link>
                    </div>
                )}
            </div>
        </>
    );
}

