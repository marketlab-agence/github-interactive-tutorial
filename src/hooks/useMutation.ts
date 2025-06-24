import { useState, useCallback, useRef } from 'react';

// Types pour les options de mutation
interface MutationOptions<TData, TError, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void;
  onMutate?: (variables: TVariables) => Promise<any> | any;
  retry?: number | boolean;
  retryDelay?: number;
}

// État de la mutation
interface MutationState<TData, TError> {
  data: TData | undefined;
  error: TError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isIdle: boolean;
  failureCount: number;
  submittedAt: number;
}

// Résultat de la mutation
interface MutationResult<TData, TError, TVariables> extends MutationState<TData, TError> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  reset: () => void;
}

/**
 * Hook personnalisé pour gérer les mutations (POST, PUT, DELETE, etc.)
 * @param mutationFn - Fonction qui exécute la mutation
 * @param options - Options de configuration
 * @returns Résultat de la mutation avec état et méthodes
 */
export function useMutation<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: MutationOptions<TData, TError, TVariables> = {}
): MutationResult<TData, TError, TVariables> {
  const {
    onSuccess,
    onError,
    onSettled,
    onMutate,
    retry = 0,
    retryDelay = 1000
  } = options;

  // État de la mutation
  const [state, setState] = useState<MutationState<TData, TError>>({
    data: undefined,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    isIdle: true,
    failureCount: 0,
    submittedAt: 0
  });

  // Références pour éviter les re-renders inutiles
  const retryCountRef = useRef(0);
  const contextRef = useRef<any>(undefined);

  // Fonction pour exécuter la mutation
  const executeMutation = useCallback(async (variables: TVariables): Promise<TData> => {
    setState(prev => ({
      ...prev,
      isLoading: true,
      isError: false,
      isSuccess: false,
      isIdle: false,
      submittedAt: Date.now()
    }));

    try {
      // Callback onMutate pour optimistic updates
      if (onMutate) {
        contextRef.current = await onMutate(variables);
      }

      const data = await mutationFn(variables);

      setState(prev => ({
        ...prev,
        data,
        error: null,
        isLoading: false,
        isError: false,
        isSuccess: true,
        failureCount: 0
      }));

      // Réinitialiser le compteur de retry
      retryCountRef.current = 0;

      // Callback de succès
      if (onSuccess) {
        onSuccess(data, variables);
      }

      // Callback settled
      if (onSettled) {
        onSettled(data, null, variables);
      }

      return data;
    } catch (error) {
      const err = error as TError;

      // Logique de retry
      const shouldRetry = typeof retry === 'boolean' ? retry : retryCountRef.current < retry;
      
      if (shouldRetry) {
        retryCountRef.current++;
        
        setState(prev => ({
          ...prev,
          failureCount: prev.failureCount + 1
        }));
        
        // Attendre avant de retry
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        // Retry récursif
        return executeMutation(variables);
      }

      setState(prev => ({
        ...prev,
        error: err,
        isLoading: false,
        isError: true,
        isSuccess: false,
        failureCount: prev.failureCount + 1
      }));

      // Callback d'erreur
      if (onError) {
        onError(err, variables);
      }

      // Callback settled
      if (onSettled) {
        onSettled(undefined, err, variables);
      }

      throw err;
    }
  }, [mutationFn, onMutate, onSuccess, onError, onSettled, retry, retryDelay]);

  // Fonction mutate (fire and forget)
  const mutate = useCallback((variables: TVariables) => {
    executeMutation(variables).catch(() => {
      // Erreur déjà gérée dans executeMutation
    });
  }, [executeMutation]);

  // Fonction mutateAsync (retourne une Promise)
  const mutateAsync = useCallback((variables: TVariables): Promise<TData> => {
    return executeMutation(variables);
  }, [executeMutation]);

  // Fonction pour réinitialiser l'état
  const reset = useCallback(() => {
    setState({
      data: undefined,
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
      isIdle: true,
      failureCount: 0,
      submittedAt: 0
    });
    retryCountRef.current = 0;
    contextRef.current = undefined;
  }, []);

  return {
    ...state,
    mutate,
    mutateAsync,
    reset
  };
}

/**
 * Hook pour les mutations avec optimistic updates
 */
export function useOptimisticMutation<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: MutationOptions<TData, TError, TVariables> & {
    optimisticUpdate?: (variables: TVariables) => TData;
    rollback?: (context: any) => void;
  } = {}
) {
  const { optimisticUpdate, rollback, ...mutationOptions } = options;

  return useMutation(mutationFn, {
    ...mutationOptions,
    onMutate: async (variables) => {
      // Sauvegarder l'état actuel pour rollback
      const previousData = mutationOptions.onMutate 
        ? await mutationOptions.onMutate(variables)
        : undefined;

      // Appliquer l'optimistic update
      if (optimisticUpdate) {
        const optimisticData = optimisticUpdate(variables);
        // Ici, vous pourriez mettre à jour un cache global ou un état
        return { previousData, optimisticData };
      }

      return { previousData };
    },
    onError: (error, variables, context) => {
      // Rollback en cas d'erreur
      if (rollback && context) {
        rollback(context);
      }

      mutationOptions.onError?.(error, variables);
    }
  });
}

/**
 * Hook pour les mutations en série
 */
export function useSerialMutations<TData = unknown, TError = Error, TVariables = void>(
  mutations: Array<(variables: TVariables) => Promise<TData>>,
  options: MutationOptions<TData[], TError, TVariables> = {}
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<TData[]>([]);

  const executeMutations = useCallback(async (variables: TVariables): Promise<TData[]> => {
    const allResults: TData[] = [];
    
    for (let i = 0; i < mutations.length; i++) {
      setCurrentIndex(i);
      try {
        const result = await mutations[i](variables);
        allResults.push(result);
        setResults([...allResults]);
      } catch (error) {
        setCurrentIndex(0);
        setResults([]);
        throw error;
      }
    }
    
    setCurrentIndex(0);
    return allResults;
  }, [mutations]);

  const mutation = useMutation(executeMutations, options);

  return {
    ...mutation,
    currentIndex,
    results,
    progress: mutations.length > 0 ? (currentIndex / mutations.length) * 100 : 0
  };
}

/**
 * Hook pour les mutations avec debounce
 */
export function useDebouncedMutation<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  delay: number = 300,
  options: MutationOptions<TData, TError, TVariables> = {}
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mutation = useMutation(mutationFn, options);

  const debouncedMutate = useCallback((variables: TVariables) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      mutation.mutate(variables);
    }, delay);
  }, [mutation.mutate, delay]);

  const debouncedMutateAsync = useCallback((variables: TVariables): Promise<TData> => {
    return new Promise((resolve, reject) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        mutation.mutateAsync(variables).then(resolve).catch(reject);
      }, delay);
    });
  }, [mutation.mutateAsync, delay]);

  // Nettoyage à la destruction
  useState(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  });

  return {
    ...mutation,
    mutate: debouncedMutate,
    mutateAsync: debouncedMutateAsync
  };
}

/**
 * Hook pour les mutations avec queue
 */
export function useQueuedMutations<TData = unknown, TError = Error, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: MutationOptions<TData, TError, TVariables> & {
    maxConcurrent?: number;
  } = {}
) {
  const { maxConcurrent = 1, ...mutationOptions } = options;
  const [queue, setQueue] = useState<TVariables[]>([]);
  const [running, setRunning] = useState<TVariables[]>([]);
  const [completed, setCompleted] = useState<Array<{ variables: TVariables; result: TData }>>([]);
  const [failed, setFailed] = useState<Array<{ variables: TVariables; error: TError }>>([]);

  const mutation = useMutation(mutationFn, {
    ...mutationOptions,
    onSuccess: (data, variables) => {
      setRunning(prev => prev.filter(v => v !== variables));
      setCompleted(prev => [...prev, { variables, result: data }]);
      mutationOptions.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      setRunning(prev => prev.filter(v => v !== variables));
      setFailed(prev => [...prev, { variables, error }]);
      mutationOptions.onError?.(error, variables);
    }
  });

  const addToQueue = useCallback((variables: TVariables) => {
    setQueue(prev => [...prev, variables]);
  }, []);

  const processQueue = useCallback(() => {
    if (running.length >= maxConcurrent || queue.length === 0) {
      return;
    }

    const nextItem = queue[0];
    setQueue(prev => prev.slice(1));
    setRunning(prev => [...prev, nextItem]);
    mutation.mutate(nextItem);
  }, [queue, running.length, maxConcurrent, mutation.mutate]);

  // Traiter la queue automatiquement
  useState(() => {
    const interval = setInterval(processQueue, 100);
    return () => clearInterval(interval);
  });

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const clearCompleted = useCallback(() => {
    setCompleted([]);
  }, []);

  const clearFailed = useCallback(() => {
    setFailed([]);
  }, []);

  return {
    ...mutation,
    addToQueue,
    queue,
    running,
    completed,
    failed,
    queueLength: queue.length,
    runningCount: running.length,
    completedCount: completed.length,
    failedCount: failed.length,
    clearQueue,
    clearCompleted,
    clearFailed
  };
}

export default useMutation;
