'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Language } from '@/types/game.types';

interface LanguageDropdownProps {
  selected: Language;
  onChange: (language: Language) => void;
  disabled?: boolean;
}

const LANGUAGES: Language[] = ['javascript', 'typescript', 'python', 'java', 'cpp', 'go', 'rust'];

const languageIcons: Record<Language, string> = {
  javascript: '🟨',
  typescript: '🔷',
  python: '🐍',
  java: '☕',
  cpp: '⚡',
  go: '🐹',
  rust: '🦀',
};

export default function LanguageDropdown({ 
  selected, 
  onChange,
  disabled = false 
}: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-2 bg-gray-800 rounded-lg
          border border-gray-700 hover:border-gray-600 transition-all
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span className="text-xl">{languageIcons[selected]}</span>
        <span className="font-medium capitalize">{selected}</span>
        <ChevronDown 
          size={18} 
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  onChange(lang);
                  setIsOpen(false);
                }}
                className={`
                  w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-700 transition-colors
                  ${selected === lang ? 'bg-gray-700' : ''}
                `}
              >
                <span className="text-xl">{languageIcons[lang]}</span>
                <span className="capitalize">{lang}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}