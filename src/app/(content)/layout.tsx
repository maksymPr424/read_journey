'use client';

import Header from '../header';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { queryClient } from '../providers';
import { setBearerToken } from '@/lib/api';
import { UserCredentials } from '@/lib/requests';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const { data: user, status } = useQuery<UserCredentials | null>({
    queryKey: ['user'],
    queryFn: async () => queryClient.getQueryData(['user']) ?? Promise.reject(),
    staleTime: 60 * 60 * 60 * 24,
    retry: 2,
  });

  useEffect(() => {
    console.log(user);
    console.log(status === 'error');

    if (status === 'success' && user !== undefined && user !== null) {
      setBearerToken(user.token);
    } else if (status === 'error') {
      queryClient.clear();
      router.push('/login');
    }
  }, [router, status, user]);

  if (status === 'pending') {
    console.log('Loading from content layout');

    return <div>Loading provider</div>;
  }

  return (
    <>
      <Header />
      <main className="max-w-[335px] mx-auto">{children}</main>
    </>
  );
}
