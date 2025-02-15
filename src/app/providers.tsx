'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  persistQueryClient,
  Persister,
  PersistedClient,
} from '@tanstack/react-query-persist-client';
import localForage from 'localforage';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 60 * 1000,
      // cacheTime: 24 * 60 * 60 * 1000,
      // refetchOnWindowFocus: false,
    },
  },
});

const persister: Persister = {
  persistClient: async (client: PersistedClient) => {
    try {
      const serializedClient = JSON.parse(JSON.stringify(client));
      await localForage.setItem('react-query', serializedClient);
    } catch (error) {
      console.error('Error saving client to localForage:', error);
    }
  },
  restoreClient: async (): Promise<PersistedClient | undefined> => {
    try {
      const client = await localForage.getItem<PersistedClient>('react-query');
      if (!client) {
        console.warn('No client found in localForage');
        return undefined;
      }

      return client;
    } catch (error) {
      console.error('Error restoring client from localForage:', error);
      return undefined;
    }
  },
  removeClient: async () => {
    try {
      await localForage.removeItem('react-query');
    } catch (error) {
      console.error('Error removing client from localForage:', error);
    }
  },
};

persistQueryClient({
  queryClient,
  persister,
});

export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
