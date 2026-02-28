import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, title, text, image, stars, order, published } = body;

        const testimonial = await prisma.testimonial.update({
            where: { id: params.id },
            data: {
                ...(name !== undefined && { name }),
                ...(title !== undefined && { title }),
                ...(text !== undefined && { text }),
                ...(image !== undefined && { image: image || null }),
                ...(stars !== undefined && { stars }),
                ...(order !== undefined && { order }),
                ...(published !== undefined && { published }),
            },
        });

        return NextResponse.json(testimonial);
    } catch {
        return NextResponse.json({ error: 'Testimonial non trouvé ou erreur serveur' }, { status: 500 });
    }
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        await prisma.testimonial.delete({ where: { id: params.id } });
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Testimonial non trouvé ou erreur serveur' }, { status: 500 });
    }
}
