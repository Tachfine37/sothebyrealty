import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().min(2, 'Nom requis'),
    email: z.string().email('Email invalide'),
    phone: z.string().optional(),
    subject: z.string().default('Demande générale'),
    budget: z.string().optional(),
    message: z.string().min(10, 'Message trop court'),
    propertyRef: z.string().optional(),
});

// POST /api/contact
export async function POST(request: NextRequest) {
    try {
        const body = await request.json().catch(() => null);

        // Handle both JSON and FormData payloads from HTML form
        let data: Record<string, string> = {};
        if (body) {
            data = body;
        } else {
            const formData = await request.formData();
            formData.forEach((value, key) => {
                data[key] = String(value);
            });
        }

        const parsed = contactSchema.parse(data);

        const message = await prisma.contactMessage.create({
            data: {
                name: parsed.name,
                email: parsed.email,
                phone: parsed.phone,
                subject: parsed.propertyRef
                    ? `Demande de visite – Réf. ${parsed.propertyRef}`
                    : parsed.subject,
                budget: parsed.budget,
                message: parsed.message,
            },
        });

        return NextResponse.json({
            success: true,
            id: message.id,
            message: 'Votre message a bien été envoyé. Nous vous répondrons sous 2h.',
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
        }
        console.error('[POST /api/contact]', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
