'use client';

export default function DeleteButton({ id }: { id: string }) {
    return (
        <form
            action={`/api/properties/by-id/${id}`}
            method="post"
            onSubmit={(e) => {
                if (!confirm('Supprimer cette propriété ? Cette action est irréversible.')) {
                    e.preventDefault();
                }
            }}
        >
            <input type="hidden" name="_method" value="DELETE" />
            <button
                type="submit"
                className="text-[11px] text-red-400 hover:text-red-600 transition-colors px-2.5 py-1.5 border border-gray-200 hover:border-red-200"
            >
                Supprimer
            </button>
        </form>
    );
}
