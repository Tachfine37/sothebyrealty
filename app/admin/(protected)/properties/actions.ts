'use server';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteProperty(id: string) {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        throw new Error('Unauthorized');
    }

    const role = (session.user as any).role;
    if (role !== 'ADMIN' && role !== 'admin') {
        throw new Error('Forbidden');
    }

    try {
        await prisma.property.delete({
            where: { id },
        });

        revalidatePath('/admin/properties');
        revalidatePath('/properties');
        revalidatePath('/');

        return { success: true };
    } catch (error) {
        console.error('Failed to delete property:', error);
        throw new Error('Failed to delete property');
    }
}
