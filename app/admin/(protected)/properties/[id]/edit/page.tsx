import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditPropertyForm from './EditPropertyForm';

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
    const property = await prisma.property.findUnique({
        where: { id: params.id },
        include: { images: { orderBy: { order: 'asc' } } }
    });

    if (!property) notFound();

    return (
        <>
            <div className="flex items-center gap-4 mb-8">
                <a href="/admin/properties" className="text-luxury-muted hover:text-champagne transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6" /></svg>
                </a>
                <h1 className="font-serif text-3xl text-luxury-black">Modifier l&apos;annonce</h1>
            </div>

            <EditPropertyForm property={property} />
        </>
    );
}
