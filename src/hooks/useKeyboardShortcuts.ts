import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const matchingShortcut = shortcuts.find(shortcut => {
        return (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          !!event.ctrlKey === !!shortcut.ctrlKey &&
          !!event.altKey === !!shortcut.altKey &&
          !!event.shiftKey === !!shortcut.shiftKey
        );
      });

      if (matchingShortcut) {
        event.preventDefault();
        matchingShortcut.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);

  return shortcuts;
};

// Raccourcis prédéfinis pour le tutoriel
export const useTutorialShortcuts = (callbacks: {
  onNext?: () => void;
  onPrevious?: () => void;
  onHome?: () => void;
  onHelp?: () => void;
  onSearch?: () => void;
}) => {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: 'ArrowRight',
      action: callbacks.onNext || (() => {}),
      description: 'Aller à la leçon suivante'
    },
    {
      key: 'ArrowLeft',
      action: callbacks.onPrevious || (() => {}),
      description: 'Aller à la leçon précédente'
    },
    {
      key: 'h',
      ctrlKey: true,
      action: callbacks.onHome || (() => {}),
      description: 'Retourner à l\'accueil'
    },
    {
      key: '?',
      shiftKey: true,
      action: callbacks.onHelp || (() => {}),
      description: 'Afficher l\'aide'
    },
    {
      key: 'k',
      ctrlKey: true,
      action: callbacks.onSearch || (() => {}),
      description: 'Rechercher'
    }
  ];

  return useKeyboardShortcuts(shortcuts);
};