import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase/adminCheck';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const propertySchema = z.object({
    slug: z.string().min(3),
    title: z.string().min(5),
    description: z.string().min(20),
    price: z.number().positive(),
    surface: z.number().positive(),
    rooms: z.number().int().positive(),
    bedrooms: z.number().int().positive(),
    bathrooms: z.number().int().positive(),
    type: z.string().min(2),
    destination: z.string().min(2),
    city: z.string().min(2),
    address: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    featured: z.boolean().default(false),
    published: z.boolean().default(true),
    badge: z.string().optional(),
    amenities: z.array(z.string()).default([]),
    dpe: z.string().optional(),
    charges: z.number().optional(),
    agentId: z.string().optional(),
});

// GET /api/properties — list with optional filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const destination = searchParams.get('destination');
        const type = searchParams.get('type');
        const maxPrice = searchParams.get('maxPrice');
        const minPrice = searchParams.get('minPrice');
        const featured = searchParams.get('featured');
        const page = parseInt(searchParams.get('page') ?? '1', 10);
        const limit = parseInt(searchParams.get('limit') ?? '12', 10);

        const where = {
            published: true,
            ...(destination && { destination }),
            ...(type && { type }),
            ...(maxPrice && { price: { lte: parseInt(maxPrice) } }),
            ...(minPrice && { price: { gte: parseInt(minPrice) } }),
            ...(featured === 'true' && { featured: true }),
        };

        const [properties, total] = await Promise.all([
            prisma.property.findMany({
                where,
                include: {
                    images: { orderBy: { order: 'asc' }, take: 1 },
                    agent: { select: { name: true, phone: true, email: true } },
                },
                orderBy: { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.property.count({ where }),
        ]);

        return NextResponse.json({
            properties,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('[GET /api/properties]', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST /api/properties — create property (admin only)
export async function POST(request: NextRequest) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

        const body = await request.json();
        const data = propertySchema.parse(body);

        const property = await prisma.property.create({
            data: {
                ...data,
                amenities: JSON.stringify(data.amenities),
                reference: `SRF-${Date.now()}`,
            },
            include: { images: true, agent: true },
        });

        return NextResponse.json(property, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
        }
        console.error('[POST /api/properties]', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
