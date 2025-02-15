import getQueryClient from '@/lib/queryClient';
import { getCurrent } from '@/lib/requests';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getCurrent,
    staleTime: 60 * 60 * 1000,
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
