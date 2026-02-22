import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase/adminCheck';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
    title: z.string().min(5).optional(),
    description: z.string().min(20).optional(),
    price: z.number().positive().optional(),
    surface: z.number().positive().optional(),
    rooms: z.number().int().positive().optional(),
    bedrooms: z.number().int().positive().optional(),
    bathrooms: z.number().int().positive().optional(),
    type: z.string().min(2).optional(),
    destination: z.string().min(2).optional(),
    city: z.string().min(2).optional(),
    address: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    featured: z.boolean().optional(),
    published: z.boolean().optional(),
    badge: z.string().optional(),
    amenities: z.array(z.string()).optional(),
    dpe: z.string().optional(),
    charges: z.number().optional(),
    agentId: z.string().optional(),
});

// GET /api/properties/[slug]
export async function GET(
    _request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const property = await prisma.property.findUnique({
            where: { slug: params.slug },
            include: {
                images: { orderBy: { order: 'asc' } },
                agent: true,
            },
        });

        if (!property) {
            return NextResponse.json({ error: 'Property not found' }, { status: 404 });
        }

        return NextResponse.json(property);
    } catch (error) {
        console.error(`[GET /api/properties/${params.slug}]`, error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PUT /api/properties/[slug] — update (admin only)
export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

        const body = await request.json();
        const data = updateSchema.parse(body);

        const property = await prisma.property.update({
            where: { slug: params.slug },
            data: {
                ...data,
                amenities: data.amenities !== undefined ? JSON.stringify(data.amenities) : undefined,
            },
            include: { images: true, agent: true },
        });

        return NextResponse.json(property);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
        }
        console.error(`[PUT /api/properties/${params.slug}]`, error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/properties/[slug] — (admin only)
export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

        await prisma.property.delete({ where: { slug: params.slug } });

        return NextResponse.json({ message: 'Property deleted successfully' });
    } catch (error) {
        console.error(`[DELETE /api/properties/${params.slug}]`, error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
