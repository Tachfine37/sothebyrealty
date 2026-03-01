'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [settings, setSettings] = useState({
        whatsappEnabled: false,
        whatsappNumber: '',
        whatsappMessage: '',
        whatsappPosition: 'right',
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings/whatsapp');
                if (res.ok) {
                    const data = await res.json();
                    setSettings({
                        whatsappEnabled: data.whatsappEnabled ?? false,
                        whatsappNumber: data.whatsappNumber ?? '',
                        whatsappMessage: data.whatsappMessage ?? '',
                        whatsappPosition: data.whatsappPosition ?? 'right',
                    });
                } else {
                    setErrorMsg('Failed to load settings.');
                }
            } catch (err) {
                setErrorMsg('An error occurred while loading settings.');
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as any;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setSettings((prev) => ({ ...prev, [name]: val }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrorMsg('');
        setSuccessMsg('');

        try {
            const res = await fetch('/api/settings/whatsapp', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                setSuccessMsg('Settings saved successfully.');
            } else {
                let errorDetails = '';
                try {
                    const data = await res.json();
                    errorDetails = data.error || JSON.stringify(data);
                } catch {
                    errorDetails = await res.text();
                }
                setErrorMsg(`Failed to save settings (Status ${res.status}): ${errorDetails}`);
            }
        } catch (err: any) {
            setErrorMsg(`An exact error occurred while saving: ${err.message || String(err)}`);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-900"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Site Settings</h1>
                <p className="mt-2 text-sm text-gray-500">Configure global website features and integrations.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl overflow-hidden">
                <div className="p-8 space-y-8">

                    {/* WhatsApp Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-100 pb-3 mb-6">WhatsApp Floating Button</h2>

                        <div className="space-y-6">
                            {/* Enable Toggle */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <label htmlFor="whatsappEnabled" className="text-sm font-medium text-gray-900">Enable WhatsApp Button</label>
                                    <p className="text-sm text-gray-500">Display the floating chat button on the website.</p>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="whatsappEnabled"
                                        name="whatsappEnabled"
                                        type="checkbox"
                                        checked={settings.whatsappEnabled}
                                        onChange={handleChange}
                                        className="h-5 w-5 rounded border-gray-300 text-primary-900 focus:ring-primary-900 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {settings.whatsappEnabled && (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4 p-6 bg-gray-50/50 rounded-lg border border-gray-100">
                                    {/* Phone Number */}
                                    <div className="sm:col-span-1">
                                        <label htmlFor="whatsappNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                            Phone Number (International)
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="whatsappNumber"
                                                id="whatsappNumber"
                                                value={settings.whatsappNumber}
                                                onChange={handleChange}
                                                placeholder="e.g. 33612345678"
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-900 sm:text-sm sm:leading-6 px-3"
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Do not include +, spaces or dashes.</p>
                                    </div>

                                    {/* Position */}
                                    <div className="sm:col-span-1">
                                        <label htmlFor="whatsappPosition" className="block text-sm font-medium leading-6 text-gray-900">
                                            Button Position
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="whatsappPosition"
                                                name="whatsappPosition"
                                                value={settings.whatsappPosition}
                                                onChange={handleChange}
                                                className="block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-900 sm:text-sm sm:leading-6 px-3 bg-white"
                                            >
                                                <option value="right">Bottom Right</option>
                                                <option value="left">Bottom Left</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Default Message */}
                                    <div className="col-span-full">
                                        <label htmlFor="whatsappMessage" className="block text-sm font-medium leading-6 text-gray-900">
                                            Default Message
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="whatsappMessage"
                                                name="whatsappMessage"
                                                rows={3}
                                                value={settings.whatsappMessage}
                                                onChange={handleChange}
                                                placeholder="Hello, I would like more information about your properties."
                                                className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-900 sm:text-sm sm:leading-6 px-3"
                                            />
                                        </div>
                                        <p className="mt-1 text-xs text-gray-500">Pre-filled text when the user opens the chat.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Feedback Messages */}
                    {errorMsg && <div className="rounded-md bg-red-50 p-4 border border-red-200"><p className="text-sm font-medium text-red-800">{errorMsg}</p></div>}
                    {successMsg && <div className="rounded-md bg-green-50 p-4 border border-green-200"><p className="text-sm font-medium text-green-800">{successMsg}</p></div>}
                </div>

                <div className="bg-gray-50 px-8 py-5 border-t border-gray-100 flex items-center justify-end gap-x-4">
                    <button
                        type="button"
                        onClick={() => router.refresh()}
                        className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-md bg-[#002247] px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#003366] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#002247] transition-colors disabled:opacity-50"
                    >
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}
