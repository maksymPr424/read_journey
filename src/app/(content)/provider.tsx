import getQueryClient from '@/lib/queryClient';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export interface ContentProviderProps {
  children: React.ReactNode;
}

export default async function ContentProvider({
  children,
}: ContentProviderProps) {
  const queryClient = getQueryClient();

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
