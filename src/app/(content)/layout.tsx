'use client';

import Header from '../header';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { queryClient } from '../providers';
import { setBearerToken } from '@/lib/api';
import { UserCredentials } from '@/lib/requests';
import Loading from './loading';
import { toast } from 'sonner';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const { data: user, status } = useQuery<UserCredentials | null>({
    queryKey: ['user'],
    queryFn: async () => queryClient.getQueryData(['user']) ?? Promise.reject(),
    staleTime: 60 * 60 * 60 * 24,
  });

  useEffect(() => {
    console.log(user);

    if (status === 'success' && user) {
      setBearerToken(user.token);
    } else if (status === 'error' || !user) {
      toast.error('Error refreshing session, please sing in');
      queryClient.clear();
      router.push('/login');
    }
  }, [router, status, user]);

  if (status === 'pending') {
    return <Loading />;
  }

  return (
    <div className="p-5 md:p-8">
      <Header />
      <main className="max-w-[335px] mx-auto md:max-w-[704px]">{children}</main>
    </div>
  );
}
