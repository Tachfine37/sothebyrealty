import { prisma } from '@/lib/prisma';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
    const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Messages</h1>
                <p className="mt-2 text-sm text-gray-500">Gérez les messages de contact reçus depuis le site.</p>
            </div>

            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
                {messages.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        Aucun message reçu pour le moment.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {messages.map((message) => (
                            <div key={message.id} className={`p-6 hover:bg-gray-50 transition-colors ${!message.read ? 'bg-blue-50/30' : ''}`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className={`text-base font-semibold ${!message.read ? 'text-gray-900' : 'text-gray-700'}`}>
                                                {message.subject}
                                            </h3>
                                            {!message.read && (
                                                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                    Nouveau
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span className="font-medium text-gray-900">{message.name}</span>
                                            <a href={`mailto:${message.email}`} className="hover:text-primary-900 transition-colors">{message.email}</a>
                                            {message.phone && <a href={`tel:${message.phone}`} className="hover:text-primary-900 transition-colors">{message.phone}</a>}
                                            {message.budget && <span className="text-luxury-muted">Budget: {message.budget}</span>}
                                        </div>
                                        <p className="mt-4 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                                            {message.message}
                                        </p>
                                    </div>
                                    <div className="text-xs text-gray-400 whitespace-nowrap">
                                        {format(new Date(message.createdAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
