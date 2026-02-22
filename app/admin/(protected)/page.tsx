import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function AdminDashboard() {
    const [totalProperties, publishedProperties, featuredProperties, totalMessages, unreadMessages, recentProperties] =
        await Promise.all([
            prisma.property.count(),
            prisma.property.count({ where: { published: true } }),
            prisma.property.count({ where: { featured: true } }),
            prisma.contactMessage.count(),
            prisma.contactMessage.count({ where: { read: false } }),
            prisma.property.findMany({
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { images: { take: 1, orderBy: { order: 'asc' } } },
            }),
        ]);

    const draftProperties = totalProperties - publishedProperties;

    return (
        <>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-serif text-3xl text-luxury-black">Tableau de Bord</h1>
                    <p className="text-sm text-luxury-muted mt-1">Bienvenue sur votre espace administration.</p>
                </div>
                <Link href="/admin/properties/new" className="btn-primary btn-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Nouvelle Annonce
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                    { label: 'Annonces totales', value: totalProperties, color: 'text-luxury-black', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
                    { label: 'Publiées', value: publishedProperties, color: 'text-green-600', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'En brouillon', value: draftProperties, color: 'text-orange-500', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
                    { label: 'Messages non lus', value: unreadMessages, color: unreadMessages > 0 ? 'text-red-500' : 'text-luxury-muted', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                ].map((stat) => (
                    <div key={stat.label} className="admin-card">
                        <div className="flex items-start justify-between mb-3">
                            <svg className="w-5 h-5 text-luxury-light" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                <path d={stat.icon} />
                            </svg>
                        </div>
                        <p className={`text-3xl font-semibold ${stat.color} mb-1`}>{stat.value}</p>
                        <p className="text-xs text-luxury-muted tracking-wide">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Properties */}
            <div className="admin-card">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-luxury-black">Dernières Annonces</h2>
                    <Link href="/admin/properties" className="text-xs text-champagne hover:text-champagne-dark transition-colors">
                        Voir tout →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100">
                                <th className="text-left pb-3 text-[11px] font-semibold tracking-wider uppercase text-luxury-muted">Titre</th>
                                <th className="text-left pb-3 text-[11px] font-semibold tracking-wider uppercase text-luxury-muted">Prix</th>
                                <th className="text-left pb-3 text-[11px] font-semibold tracking-wider uppercase text-luxury-muted">Statut</th>
                                <th className="text-right pb-3 text-[11px] font-semibold tracking-wider uppercase text-luxury-muted">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {recentProperties.map((prop) => (
                                <tr key={prop.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="py-3 pr-4">
                                        <p className="font-medium text-luxury-black truncate max-w-xs">{prop.title}</p>
                                        <p className="text-xs text-luxury-muted">{prop.city} · {prop.type}</p>
                                    </td>
                                    <td className="py-3 pr-4 text-sm font-semibold text-champagne whitespace-nowrap">
                                        {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(prop.price)}
                                    </td>
                                    <td className="py-3 pr-4">
                                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase px-2 py-1 ${prop.published ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-600'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${prop.published ? 'bg-green-500' : 'bg-orange-500'}`} />
                                            {prop.published ? 'Publié' : 'Brouillon'}
                                        </span>
                                    </td>
                                    <td className="py-3 text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            <Link href={`/annonces/${prop.slug}`} target="_blank"
                                                className="text-xs text-luxury-muted hover:text-champagne transition-colors px-2 py-1">
                                                Voir
                                            </Link>
                                            <Link href={`/admin/properties/${prop.id}/edit`}
                                                className="text-xs text-luxury-black hover:text-champagne transition-colors px-2 py-1 border border-gray-200 hover:border-champagne">
                                                Modifier
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
