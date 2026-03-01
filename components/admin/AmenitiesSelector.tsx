'use client';

import { useState } from 'react';

const STANDARD_AMENITIES = [
    'Piscine à débordement',
    'Piscine intérieure',
    'Piscine chauffée',
    'Hammam',
    'Sauna',
    'Jacuzzi',
    'Ski-in/Ski-out',
    'Salle de sport',
    'Salle de cinéma',
    'Cave à vin',
    'Cheminée',
    'Ascenseur',
    'Climatisation',
    'Vue panoramique',
    'Vue mer',
    'Jardin privatif',
    'Terrasse',
    'Parking privatif',
    'Garage fermé',
    'Système domotique',
    'Sécurité 24/7',
    'Héliport',
    'Personnel inclus'
];

interface Props {
    initialAmenities: string[];
}

export default function AmenitiesSelector({ initialAmenities }: Props) {
    const [selected, setSelected] = useState<string[]>(initialAmenities);
    const [customAmenity, setCustomAmenity] = useState('');

    const handleToggle = (amenity: string) => {
        if (selected.includes(amenity)) {
            setSelected(selected.filter((a) => a !== amenity));
        } else {
            setSelected([...selected, amenity]);
        }
    };

    const handleAddCustom = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.preventDefault();
        const value = customAmenity.trim();
        if (value && !selected.includes(value)) {
            setSelected([...selected, value]);
        }
        setCustomAmenity('');
    };

    // We combine standard amenities and any custom ones that are already selected,
    // so custom ones show up as easily-toggled checkboxes too.
    const displayAmenities = Array.from(new Set([...STANDARD_AMENITIES, ...selected]));

    return (
        <div className="flex flex-col gap-4">
            {/* Hidden input to pass data to the parent form seamlessly */}
            <input
                type="hidden"
                name="amenities"
                value={selected.join('\n')}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {displayAmenities.map((amenity) => {
                    const isSelected = selected.includes(amenity);
                    return (
                        <label
                            key={amenity}
                            className={`flex items-center gap-3 p-3 border rounded-sm cursor-pointer transition-colors ${isSelected
                                    ? 'border-champagne bg-champagne/5'
                                    : 'border-gray-200 hover:border-champagne/40 bg-white'
                                }`}
                        >
                            <input
                                type="checkbox"
                                className="w-4 h-4 accent-champagne cursor-pointer shrink-0"
                                checked={isSelected}
                                onChange={() => handleToggle(amenity)}
                            />
                            <span className={`text-sm ${isSelected ? 'text-luxury-black font-medium' : 'text-gray-600'}`}>
                                {amenity}
                            </span>
                        </label>
                    );
                })}
            </div>

            {/* Add custom amenity */}
            <div className="flex gap-2 mt-2">
                <input
                    type="text"
                    className="form-input flex-1"
                    placeholder="Autre prestation (ex: Chef privé)"
                    value={customAmenity}
                    onChange={(e) => setCustomAmenity(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAddCustom(e);
                        }
                    }}
                />
                <button
                    type="button"
                    onClick={handleAddCustom}
                    className="btn-secondary px-6 shrink-0"
                    disabled={!customAmenity.trim()}
                >
                    Ajouter
                </button>
            </div>
            {selected.length === 0 && (
                <p className="text-xs text-luxury-muted mt-1">Aucune prestation sélectionnée.</p>
            )}
        </div>
    );
}
