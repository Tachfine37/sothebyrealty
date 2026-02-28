import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET — public by default (only published), or all if ?all=1 (admin)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const showAll = searchParams.get('all') === '1';

        const testimonials = await prisma.testimonial.findMany({
            where: showAll ? {} : { published: true },
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(testimonials);
    } catch {
        return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

// POST — admin only, create a new testimonial
export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, title = '', text, image, stars = 5, order = 0, published = true } = body;

        if (!name || !text) {
            return NextResponse.json({ error: 'Nom et texte requis' }, { status: 400 });
        }

        const testimonial = await prisma.testimonial.create({
            data: { name, title, text, image: image || null, stars, order, published },
        });

        return NextResponse.json(testimonial, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Erreur lors de la création' }, { status: 500 });
    }
}
