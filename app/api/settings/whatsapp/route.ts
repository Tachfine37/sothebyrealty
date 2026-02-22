import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

// Helper to get or create the singleton settings record
async function getSettings() {
    let settings = await prisma.siteSettings.findUnique({
        where: { id: 'singleton' },
    });

    if (!settings) {
        settings = await prisma.siteSettings.create({
            data: {
                id: 'singleton',
                whatsappEnabled: false,
                whatsappNumber: '',
                whatsappMessage: '',
                whatsappPosition: 'right',
            },
        });
    }

    return settings;
}

export async function GET() {
    try {
        const settings = await getSettings();
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        // Protect the API route: only authenticated users (admins) can update settings
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (!profile || profile.role !== 'admin') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { whatsappEnabled, whatsappNumber, whatsappMessage, whatsappPosition } = body;

        const updatedSettings = await prisma.siteSettings.upsert({
            where: { id: 'singleton' },
            create: {
                id: 'singleton',
                whatsappEnabled: whatsappEnabled ?? false,
                whatsappNumber: whatsappNumber ?? '',
                whatsappMessage: whatsappMessage ?? '',
                whatsappPosition: whatsappPosition ?? 'right',
            },
            update: {
                whatsappEnabled: whatsappEnabled ?? false,
                whatsappNumber: whatsappNumber ?? '',
                whatsappMessage: whatsappMessage ?? '',
                whatsappPosition: whatsappPosition ?? 'right',
            },
        });

        return NextResponse.json(updatedSettings);
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
