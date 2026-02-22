import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes safely
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format price as French locale string
 * e.g. 12500000 → "12 500 000 €"
 */
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(price);
}

/**
 * Format price per sqm
 * e.g. formatPricePerSqm(12500000, 680) → "18 382 € / m²"
 */
export function formatPricePerSqm(price: number, surface: number): string {
    const perSqm = Math.round(price / surface);
    return `${new Intl.NumberFormat('fr-FR').format(perSqm)} € / m²`;
}

/**
 * Slugify a string for URLs
 */
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

/**
 * Destination display names
 */
export const DESTINATION_LABELS: Record<string, string> = {
    'cote-dazur': "Côte d'Azur",
    'paris': 'Paris & Île-de-France',
    'alpes': 'Alpes & Savoie',
    'bordeaux': 'Bordeaux',
    'provence': 'Provence',
    'bretagne': 'Bretagne',
};

/**
 * Property type display labels (French)
 */
export const TYPE_LABELS: Record<string, string> = {
    VILLA: 'Villa',
    APPARTEMENT: 'Appartement',
    CHALET: 'Chalet',
    DOMAINE: 'Domaine',
    PENTHOUSE: 'Penthouse',
    MAISON: 'Maison',
    TERRAIN: 'Terrain',
};

/**
 * All available destinations for the filter UI
 */
export const DESTINATIONS = Object.entries(DESTINATION_LABELS).map(([value, label]) => ({ value, label }));

/**
 * All property types for the filter UI
 */
export const PROPERTY_TYPES = Object.entries(TYPE_LABELS).map(([value, label]) => ({ value, label }));

/**
 * Truncate text at word boundary
 */
export function truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, str.lastIndexOf(' ', maxLength)) + '…';
}

/**
 * Build absolute URL for metadata/OG tags
 */
export function absoluteUrl(path: string): string {
    return `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}${path}`;
}

/**
 * Parse amenities from the SQLite JSON string column back to a string array.
 * Falls back to [] on any parse error.
 */
export function parseAmenities(amenities: string | string[]): string[] {
    if (Array.isArray(amenities)) return amenities;
    try {
        const parsed = JSON.parse(amenities);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}
