import { createContext, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchContent, getImageUrl } from '../api/content';

const ContentContext = createContext(null);

const CONTENT_QUERY_KEY = ['content'];

export function ContentProvider({ children }) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: CONTENT_QUERY_KEY,
    queryFn: fetchContent,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    staleTime: 60_000, // 1 min - avoid refetch during rapid navigations
  });

  const value = useMemo(
    () => ({
      content: data || {},
      loading: isLoading,
      error: error?.message ?? null,
      getImageUrl,
      revalidate: refetch,
    }),
    [data, isLoading, error?.message, refetch]
  );

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
}
