
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: ['Backspace'], action: 'Delete character' },
    { keys: ['Shift', 'Backspace'], action: 'Delete word' },
    { keys: ['Ctrl/Cmd', 'Backspace'], action: 'Delete word' },
    { keys: ['Delete'], action: 'Delete forward' },
    { keys: ['Ctrl/Cmd', 'Delete'], action: 'Delete word forward' },
    { keys: ['Ctrl/Cmd', '←'], action: 'Move word left' },
    { keys: ['Ctrl/Cmd', '→'], action: 'Move word right' },
    { keys: ['Home'], action: 'Move to line start' },
    { keys: ['End'], action: 'Move to line end' },
    { keys: ['Ctrl/Cmd', 'Home'], action: 'Move to start' },
    { keys: ['Ctrl/Cmd', 'End'], action: 'Move to end' },
    { keys: ['Tab'], action: 'Insert tab/spaces' },
    { keys: ['Shift', 'Enter'], action: 'New race' },
    { keys: ['Esc'], action: 'Pit stop (reset)' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors"
      >
        ⌨️ Shortcuts
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-16 left-4 bg-gray-900 border border-gray-800 rounded-lg p-4 max-w-sm"
          >
            <h3 className="font-bold mb-3 text-yellow-400">🏎️ Racing Controls</h3>
            <div className="space-y-2 text-sm">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    {shortcut.keys.map((key, i) => (
                      <span key={i}>
                        <kbd className="px-2 py-1 bg-gray-800 rounded text-xs">
                          {key}
                        </kbd>
                        {i < shortcut.keys.length - 1 && ' + '}
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-400 ml-4">{shortcut.action}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}