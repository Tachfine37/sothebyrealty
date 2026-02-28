import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/supabase/adminCheck';
import { createClient } from '@supabase/supabase-js';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'];

// POST /api/upload — upload image (admin only)
export async function POST(request: NextRequest) {
    try {
        const { error: adminError } = await requireAdmin(request);
        if (adminError) return adminError;

        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
        }

        if (!ALLOWED_TYPES.includes(file.type)) {
            return NextResponse.json({ error: 'Invalid file type. Allowed: JPEG, PNG, WebP, AVIF' }, { status: 400 });
        }

        const ext = file.name.split('.').pop() ?? 'jpg';
        const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Use SERVICE_ROLE_KEY to bypass RLS for uploads (since we already verified admin)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { data, error } = await supabase.storage
            .from('Reviews')
            .upload(filename, buffer, {
                contentType: file.type,
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            return NextResponse.json({ error: 'Failed to upload to Supabase' }, { status: 500 });
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('Reviews')
            .getPublicUrl(data.path);

        return NextResponse.json({ url: urlData.publicUrl, filename });
    } catch (error) {
        console.error('[POST /api/upload]', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
