'use client';

import { useEffect, useState } from 'react';

interface WhatsAppSettings {
    whatsappEnabled: boolean;
    whatsappNumber: string;
    whatsappMessage: string;
    whatsappPosition: string;
}

export default function WhatsAppFloatingButton() {
    const [settings, setSettings] = useState<WhatsAppSettings | null>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetch('/api/settings/whatsapp')
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                if (data) {
                    setSettings(data);
                    // Small delay for a smooth slide-in animation
                    setTimeout(() => setVisible(true), 800);
                }
            })
            .catch(() => { });
    }, []);

    if (!settings || !settings.whatsappEnabled || !settings.whatsappNumber) {
        return null;
    }

    const formattedNumber = settings.whatsappNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(settings.whatsappMessage || '');
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;
    const positionClass = settings.whatsappPosition === 'left' ? 'left-6' : 'right-6';

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className={`fixed bottom-6 ${positionClass} z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-full shadow-2xl
                bg-[#25D366] text-white
                transition-all duration-500
                hover:scale-105 hover:shadow-green-400/40
                focus:outline-none focus:ring-4 focus:ring-[#25D366]/50
                ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ fontFamily: 'system-ui, sans-serif' }}
        >
            {/* Official WhatsApp SVG logo */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-7 h-7 flex-shrink-0"
                fill="white"
            >
                <path d="M4.868 43.303l2.694-9.835a18.976 18.976 0 0 1-2.542-9.498C5.022 13.002 13.898 4.129 24.873 4.129c5.325.002 10.324 2.076 14.089 5.843a19.791 19.791 0 0 1 5.833 14.09c-.004 10.975-8.881 19.847-19.854 19.847a19.86 19.86 0 0 1-9.489-2.412l-10.584 2.806zm10.944-6.321l.604.357a16.505 16.505 0 0 0 8.405 2.298c9.124 0 16.547-7.42 16.55-16.547.002-4.419-1.718-8.573-4.844-11.701a16.498 16.498 0 0 0-11.705-4.853c-9.131 0-16.554 7.42-16.557 16.546a16.532 16.532 0 0 0 2.534 8.894l.394.626-1.678 6.123 6.297-1.743z" />
                <path d="M19.268 16.045c-.355-.79-.729-.806-1.068-.82-.277-.012-.594-.012-.911-.012s-.83.124-1.265.619c-.435.495-1.661 1.622-1.661 3.956s1.7 4.59 1.938 4.907c.237.316 3.282 5.259 8.104 7.161 4.007 1.580 4.823 1.266 5.693 1.187.87-.079 2.807-1.147 3.202-2.255.395-1.108.395-2.057.277-2.255-.118-.198-.435-.316-.911-.554s-2.807-1.385-3.242-1.543c-.435-.158-.751-.237-1.068.238-.317.475-1.225 1.543-1.502 1.859-.277.317-.554.357-1.03.119-.476-.238-2.01-.741-3.829-2.364-1.415-1.263-2.37-2.822-2.648-3.297-.277-.476-.03-.733.208-.97.213-.213.476-.554.713-.831.238-.277.317-.476.476-.792.158-.317.079-.594-.04-.832-.119-.237-1.039-2.578-1.437-3.52z" />
            </svg>

            <span className="font-bold text-[15px] tracking-wide whitespace-nowrap">
                Chat on WhatsApp
            </span>
        </a>
    );
}
