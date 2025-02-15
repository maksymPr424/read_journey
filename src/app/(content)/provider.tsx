import getQueryClient from '@/lib/queryClient';
import { getCurrent } from '@/lib/requests';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export interface ContentProviderProps {
  children: React.ReactNode;
}

const defPaths = ['/', '/login', '/register'];

export default async function ContentProvider({
  children,
}: ContentProviderProps) {
  const queryClient = getQueryClient();

  const headersList = await headers();
  // read the custom x-url header
  const currentPath = headersList.get('x-forwarded-port') || '';
  console.log(headersList);

  await queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: getCurrent,
    staleTime: Infinity,
  });

  const data = queryClient.getQueryData(['user']);
  console.log(!defPaths.includes(currentPath));

  // if (data === undefined && !defPaths.includes(currentPath)) {
  //   console.log('redirect to login!!!');
  //   console.log(defPaths.includes(currentPath));

  //   redirect('/login');
  // } else {
  //   console.log(data);
  // }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
