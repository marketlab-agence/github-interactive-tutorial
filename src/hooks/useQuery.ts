import { useState, useEffect, useCallback, useRef } from 'react';

// Types pour les options de query
interface QueryOptions<T> {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchInterval?: number;
  staleTime?: number;
  cacheTime?: number;
  retry?: number | boolean;
  retryDelay?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  select?: (data: any) => T;
}

// État de la query
interface QueryState<T> {
  data: T | undefined;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  isStale: boolean;
  dataUpdatedAt: number;
  errorUpdatedAt: number;
}

// Résultat de la query
interface QueryResult<T> extends QueryState<T> {
  refetch: () => Promise<T>;
  remove: () => void;
}

// Cache global simple
const queryCache = new Map<string, {
  data: any;
  timestamp: number;
  error: Error | null;
}>();

/**
 * Hook personnalisé pour gérer les requêtes de données avec cache
 * @param queryKey - Clé unique pour identifier la query
 * @param queryFn - Fonction qui retourne une Promise avec les données
 * @param options - Options de configuration
 * @returns Résultat de la query avec état et méthodes
 */
export function useQuery<T = unknown>(
  queryKey: string | string[],
  queryFn: () => Promise<T>,
  options: QueryOptions<T> = {}
): QueryResult<T> {
  const {
    enabled = true,
    refetchOnWindowFocus = false,
    refetchInterval,
    staleTime = 0,
    cacheTime = 5 * 60 * 1000, // 5 minutes
    retry = 3,
    retryDelay = 1000,
    onSuccess,
    onError,
    select
  } = options;

  // Convertir la clé en string
  const key = Array.isArray(queryKey) ? queryKey.join('-') : queryKey;

  // État de la query
  const [state, setState] = useState<QueryState<T>>(() => {
    const cached = queryCache.get(key);
    const now = Date.now();
    
    if (cached && (now - cached.timestamp) < cacheTime) {
      return {
        data: select ? select(cached.data) : cached.data,
        error: cached.error,
        isLoading: false,
        isFetching: false,
        isError: !!cached.error,
        isSuccess: !cached.error && cached.data !== undefined,
        isStale: (now - cached.timestamp) > staleTime,
        dataUpdatedAt: cached.timestamp,
        errorUpdatedAt: cached.error ? cached.timestamp : 0
      };
    }

    return {
      data: undefined,
      error: null,
      isLoading: enabled,
      isFetching: enabled,
      isError: false,
      isSuccess: false,
      isStale: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0
    };
  });

  // Références pour éviter les re-renders inutiles
  const retryCountRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fonction pour exécuter la query
  const executeQuery = useCallback(async (isRefetch = false): Promise<T> => {
    // Annuler la requête précédente si elle existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Créer un nouveau AbortController
    abortControllerRef.current = new AbortController();

    setState(prev => ({
      ...prev,
      isFetching: true,
      isLoading: prev.data === undefined,
      ...(isRefetch && { isStale: false })
    }));

    try {
      const data = await queryFn();
      const processedData = select ? select(data) : data;
      const now = Date.now();

      // Mettre à jour le cache
      queryCache.set(key, {
        data,
        timestamp: now,
        error: null
      });

      setState({
        data: processedData,
        error: null,
        isLoading: false,
        isFetching: false,
        isError: false,
        isSuccess: true,
        isStale: false,
        dataUpdatedAt: now,
        errorUpdatedAt: 0
      });

      // Réinitialiser le compteur de retry
      retryCountRef.current = 0;

      // Callback de succès
      if (onSuccess) {
        onSuccess(processedData);
      }

      return processedData;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      const now = Date.now();

      // Logique de retry
      const shouldRetry = typeof retry === 'boolean' ? retry : retryCountRef.current < retry;
      
      if (shouldRetry && !abortControllerRef.current.signal.aborted) {
        retryCountRef.current++;
        
        // Attendre avant de retry
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        
        // Retry récursif
        return executeQuery(isRefetch);
      }

      // Mettre à jour le cache avec l'erreur
      queryCache.set(key, {
        data: undefined,
        timestamp: now,
        error: err
      });

      setState(prev => ({
        ...prev,
        error: err,
        isLoading: false,
        isFetching: false,
        isError: true,
        isSuccess: false,
        errorUpdatedAt: now
      }));

      // Callback d'erreur
      if (onError) {
        onError(err);
      }

      throw err;
    }
  }, [queryFn, key, select, retry, retryDelay, onSuccess, onError]);

  // Fonction de refetch
  const refetch = useCallback(() => {
    return executeQuery(true);
  }, [executeQuery]);

  // Fonction pour supprimer du cache
  const remove = useCallback(() => {
    queryCache.delete(key);
    setState({
      data: undefined,
      error: null,
      isLoading: false,
      isFetching: false,
      isError: false,
      isSuccess: false,
      isStale: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0
    });
  }, [key]);

  // Effet pour exécuter la query initiale
  useEffect(() => {
    if (enabled && state.data === undefined && !state.isFetching) {
      executeQuery();
    }
  }, [enabled, executeQuery, state.data, state.isFetching]);

  // Effet pour le refetch sur focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return;

    const handleFocus = () => {
      if (state.isStale && !state.isFetching) {
        refetch();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, state.isStale, state.isFetching, refetch]);

  // Effet pour le refetch interval
  useEffect(() => {
    if (!refetchInterval || !enabled) return;

    intervalRef.current = setInterval(() => {
      if (!state.isFetching) {
        refetch();
      }
    }, refetchInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [refetchInterval, enabled, state.isFetching, refetch]);

  // Effet pour marquer comme stale
  useEffect(() => {
    if (staleTime === 0 || !state.dataUpdatedAt) return;

    const timeoutId = setTimeout(() => {
      setState(prev => ({ ...prev, isStale: true }));
    }, staleTime);

    return () => clearTimeout(timeoutId);
  }, [staleTime, state.dataUpdatedAt]);

  // Nettoyage à la destruction
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    ...state,
    refetch,
    remove
  };
}

/**
 * Hook pour les queries infinies (pagination)
 */
export function useInfiniteQuery<T = unknown>(
  queryKey: string | string[],
  queryFn: ({ pageParam }: { pageParam: any }) => Promise<T>,
  options: QueryOptions<T> & {
    getNextPageParam?: (lastPage: T, allPages: T[]) => any;
    getPreviousPageParam?: (firstPage: T, allPages: T[]) => any;
  } = {}
) {
  const { getNextPageParam, getPreviousPageParam, ...queryOptions } = options;
  
  const [pages, setPages] = useState<T[]>([]);
  const [pageParams, setPageParams] = useState<any[]>([undefined]);
  
  const key = Array.isArray(queryKey) ? queryKey.join('-') : queryKey;
  
  const fetchPage = useCallback(async (pageParam: any) => {
    return queryFn({ pageParam });
  }, [queryFn]);

  const query = useQuery(
    `${key}-page-${pageParams.length - 1}`,
    () => fetchPage(pageParams[pageParams.length - 1]),
    {
      ...queryOptions,
      enabled: queryOptions.enabled && pageParams.length > 0,
      onSuccess: (data) => {
        setPages(prev => {
          const newPages = [...prev];
          newPages[pageParams.length - 1] = data;
          return newPages;
        });
        queryOptions.onSuccess?.(data);
      }
    }
  );

  const fetchNextPage = useCallback(() => {
    if (!getNextPageParam || pages.length === 0) return;
    
    const nextPageParam = getNextPageParam(pages[pages.length - 1], pages);
    if (nextPageParam !== undefined) {
      setPageParams(prev => [...prev, nextPageParam]);
    }
  }, [getNextPageParam, pages]);

  const fetchPreviousPage = useCallback(() => {
    if (!getPreviousPageParam || pages.length === 0) return;
    
    const previousPageParam = getPreviousPageParam(pages[0], pages);
    if (previousPageParam !== undefined) {
      setPageParams(prev => [previousPageParam, ...prev]);
    }
  }, [getPreviousPageParam, pages]);

  const hasNextPage = getNextPageParam && pages.length > 0 
    ? getNextPageParam(pages[pages.length - 1], pages) !== undefined 
    : false;

  const hasPreviousPage = getPreviousPageParam && pages.length > 0
    ? getPreviousPageParam(pages[0], pages) !== undefined
    : false;

  return {
    ...query,
    data: { pages, pageParams },
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage: query.isFetching && pageParams.length > pages.length,
    isFetchingPreviousPage: query.isFetching && pageParams.length > pages.length
  };
}

/**
 * Fonction utilitaire pour invalider les queries du cache
 */
export function invalidateQueries(queryKey?: string | string[]) {
  if (!queryKey) {
    // Invalider toutes les queries
    queryCache.clear();
    return;
  }

  const key = Array.isArray(queryKey) ? queryKey.join('-') : queryKey;
  
  // Invalider les queries qui correspondent à la clé
  for (const [cacheKey] of queryCache) {
    if (cacheKey.startsWith(key)) {
      queryCache.delete(cacheKey);
    }
  }
}

/**
 * Fonction utilitaire pour précharger une query
 */
export async function prefetchQuery<T>(
  queryKey: string | string[],
  queryFn: () => Promise<T>,
  options: { staleTime?: number; cacheTime?: number } = {}
) {
  const key = Array.isArray(queryKey) ? queryKey.join('-') : queryKey;
  const { staleTime = 0, cacheTime = 5 * 60 * 1000 } = options;
  
  const cached = queryCache.get(key);
  const now = Date.now();
  
  // Si les données sont fraîches, ne pas refetch
  if (cached && (now - cached.timestamp) < staleTime) {
    return cached.data;
  }
  
  try {
    const data = await queryFn();
    queryCache.set(key, {
      data,
      timestamp: now,
      error: null
    });
    return data;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    queryCache.set(key, {
      data: undefined,
      timestamp: now,
      error: err
    });
    throw err;
  }
}

export default useQuery;
