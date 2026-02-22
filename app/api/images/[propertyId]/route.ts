import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase/adminCheck';
import { prisma } from '@/lib/prisma';

// POST /api/images/[propertyId] — add an image to a property
export async function POST(
    request: NextRequest,
    { params }: { params: { propertyId: string } }
) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

        const { url, alt } = await request.json();
        if (!url) {
            return NextResponse.json({ error: 'url is required' }, { status: 400 });
        }

        // Get current max order for this property
        const maxOrderResult = await prisma.propertyImage.aggregate({
            where: { propertyId: params.propertyId },
            _max: { order: true },
        });
        const nextOrder = (maxOrderResult._max.order ?? -1) + 1;

        const image = await prisma.propertyImage.create({
            data: {
                propertyId: params.propertyId,
                url,
                alt: alt ?? '',
                order: nextOrder,
            },
        });

        return NextResponse.json(image, { status: 201 });
    } catch (error) {
        console.error('[POST /api/images]', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// DELETE /api/images/[propertyId]?imageId=xxx — delete a specific image
export async function DELETE(
    request: NextRequest,
    { params }: { params: { propertyId: string } }
) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

        const { searchParams } = new URL(request.url);
        const imageId = searchParams.get('imageId');
        if (!imageId) {
            return NextResponse.json({ error: 'imageId is required' }, { status: 400 });
        }

        await prisma.propertyImage.delete({
            where: { id: imageId, propertyId: params.propertyId },
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('[DELETE /api/images]', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// PATCH /api/images/[propertyId] — reorder images
export async function PATCH(
    request: NextRequest,
    { params }: { params: { propertyId: string } }
) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

        const { orderedIds } = await request.json() as { orderedIds: string[] };

        await Promise.all(
            orderedIds.map((id, index) =>
                prisma.propertyImage.update({
                    where: { id, propertyId: params.propertyId },
                    data: { order: index },
                })
            )
        );

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('[PATCH /api/images]', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
