'use client';

import { Language } from '@/types/game.types'; // Import from game.types
import { LANGUAGES } from '@/lib/constants'; // Import LANGUAGES from constants

interface LanguageSelectorProps {
  selected: Language;
  onChange: (language: Language) => void;
}

/**
 * Language selection component
 */
export default function LanguageSelector({ 
  selected, 
  onChange 
}: LanguageSelectorProps) {
  return (
    <div className="flex gap-2 justify-center flex-wrap">
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang as Language)}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all
            ${selected === lang
              ? 'bg-blue-600 text-white scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }
          `}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}