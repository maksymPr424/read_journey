'use client';

import {
  QueryClient,
  QueryClientProvider,
  QueryClientConfig,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import localForage from 'localforage';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60 * 24,
      refetchOnWindowFocus: false,
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);

if (typeof window !== 'undefined') {
  localForage.config({
    name: 'myApp',
    storeName: 'reactQueryCache',
    driver: [localForage.INDEXEDDB, localForage.LOCALSTORAGE],
  });

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: localForage,
  });

  persistQueryClient({
    queryClient: queryClient as unknown as QueryClient,
    persister: asyncStoragePersister,
  });
}

// QueryProvider component
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
