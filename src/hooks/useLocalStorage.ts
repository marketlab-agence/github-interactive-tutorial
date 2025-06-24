import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer le localStorage avec React
 * @param key - Clé du localStorage
 * @param initialValue - Valeur initiale si aucune valeur n'existe
 * @returns [value, setValue] - Valeur actuelle et fonction pour la modifier
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // État pour stocker la valeur
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Récupérer la valeur du localStorage
      const item = window.localStorage.getItem(key);
      // Parser la valeur JSON stockée ou retourner la valeur initiale
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // En cas d'erreur, retourner la valeur initiale
      console.warn(`Erreur lors de la lecture du localStorage pour la clé "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permettre à la valeur d'être une fonction pour la même API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Sauvegarder l'état
      setStoredValue(valueToStore);
      
      // Sauvegarder dans le localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Déclencher un événement personnalisé pour synchroniser entre les onglets
      window.dispatchEvent(new CustomEvent('localStorageChange', {
        detail: { key, value: valueToStore }
      }));
    } catch (error) {
      console.error(`Erreur lors de l'écriture dans le localStorage pour la clé "${key}":`, error);
    }
  };

  // Écouter les changements du localStorage (pour la synchronisation entre onglets)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.warn(`Erreur lors du parsing de la nouvelle valeur pour la clé "${key}":`, error);
        }
      }
    };

    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value);
      }
    };

    // Écouter les événements de changement du localStorage
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleCustomStorageChange as EventListener);
    };
  }, [key]);

  return [storedValue, setValue];
}

/**
 * Hook pour supprimer une clé du localStorage
 * @param key - Clé à supprimer
 * @returns Fonction pour supprimer la clé
 */
export function useRemoveFromLocalStorage() {
  const removeItem = (key: string) => {
    try {
      window.localStorage.removeItem(key);
      window.dispatchEvent(new CustomEvent('localStorageChange', {
        detail: { key, value: null }
      }));
    } catch (error) {
      console.error(`Erreur lors de la suppression de la clé "${key}" du localStorage:`, error);
    }
  };

  return removeItem;
}

/**
 * Hook pour vider complètement le localStorage
 * @returns Fonction pour vider le localStorage
 */
export function useClearLocalStorage() {
  const clearStorage = () => {
    try {
      window.localStorage.clear();
      window.dispatchEvent(new CustomEvent('localStorageChange', {
        detail: { key: null, value: null }
      }));
    } catch (error) {
      console.error('Erreur lors du vidage du localStorage:', error);
    }
  };

  return clearStorage;
}

/**
 * Hook pour obtenir toutes les clés du localStorage
 * @returns Array des clés du localStorage
 */
export function useLocalStorageKeys(): string[] {
  const [keys, setKeys] = useState<string[]>(() => {
    try {
      return Object.keys(window.localStorage);
    } catch (error) {
      console.warn('Erreur lors de la récupération des clés du localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    const updateKeys = () => {
      try {
        setKeys(Object.keys(window.localStorage));
      } catch (error) {
        console.warn('Erreur lors de la mise à jour des clés du localStorage:', error);
      }
    };

    const handleStorageChange = () => {
      updateKeys();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, []);

  return keys;
}

/**
 * Hook pour vérifier si le localStorage est disponible
 * @returns boolean indiquant si le localStorage est disponible
 */
export function useIsLocalStorageAvailable(): boolean {
  const [isAvailable, setIsAvailable] = useState<boolean>(() => {
    try {
      const testKey = '__localStorage_test__';
      window.localStorage.setItem(testKey, 'test');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  });

  return isAvailable;
}

/**
 * Hook pour gérer un objet complexe dans le localStorage avec des méthodes utilitaires
 * @param key - Clé du localStorage
 * @param initialValue - Valeur initiale de l'objet
 * @returns Objet avec la valeur et des méthodes utilitaires
 */
export function useLocalStorageObject<T extends Record<string, any>>(
  key: string,
  initialValue: T
) {
  const [value, setValue] = useLocalStorage(key, initialValue);

  const updateProperty = (property: keyof T, newValue: T[keyof T]) => {
    setValue(prev => ({
      ...prev,
      [property]: newValue
    }));
  };

  const removeProperty = (property: keyof T) => {
    setValue(prev => {
      const newValue = { ...prev };
      delete newValue[property];
      return newValue;
    });
  };

  const reset = () => {
    setValue(initialValue);
  };

  const merge = (newData: Partial<T>) => {
    setValue(prev => ({
      ...prev,
      ...newData
    }));
  };

  return {
    value,
    setValue,
    updateProperty,
    removeProperty,
    reset,
    merge
  };
}

export default useLocalStorage;
