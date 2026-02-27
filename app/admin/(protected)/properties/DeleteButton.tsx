'use client';

import { deleteProperty } from './actions';
import { useTransition } from 'react';

export default function DeleteButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        if (!confirm('Supprimer cette propriété ? Cette action est irréversible.')) {
            return;
        }

        startTransition(async () => {
            try {
                await deleteProperty(id);
            } catch (error) {
                alert('Erreur lors de la suppression de la propriété.');
            }
        });
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="text-[11px] text-red-400 hover:text-red-600 transition-colors px-2.5 py-1.5 border border-gray-200 hover:border-red-200 disabled:opacity-50"
        >
            {isPending ? 'Suppression...' : 'Supprimer'}
        </button>
    );
}
