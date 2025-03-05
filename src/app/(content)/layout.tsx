'use client';

import Header from '../header';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { queryClient } from '../providers';
import { setBearerToken } from '@/lib/api';
import { UserCredentials } from '@/lib/requests';
import Loading from './loading';
import { toast } from 'sonner';
import { refreshUser } from '@/lib/auth';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: refreshUser,
    onSuccess(data) {
      const user = queryClient.getQueryData(['user']);

      if (user && data?.token) {
        queryClient.setQueryData(['user'], {
          ...user,
          token: data.token,
          refreshToken: data.refreshToken,
        });

        setBearerToken(data.token);
      }

      toast.success('Success refresh session');
    },
    onError() {
      queryClient.clear();

      toast.error('Something went wrong');
      router.push('/login');
    },
  });

  const {
    data: user,
    status,
    dataUpdatedAt,
  } = useQuery<UserCredentials | null>({
    queryKey: ['user'],
    staleTime: 30 * 60 * 1000,
    queryFn: async () => queryClient.getQueryData(['user']) ?? Promise.reject(),
    // refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (status === 'error' && !user) {
      toast.error('Error refreshing session, please sing in');
      console.log('error');

      queryClient.clear();
      router.push('/login');
      return;
    }

    if (status !== 'success' || !user) return;

    setBearerToken(user.token);

    if (Date.now() - dataUpdatedAt >= 30 * 60 * 1000) {
      mutation.mutate();
    }
  }, [dataUpdatedAt, mutation, router, status, user]);

  if (status === 'pending') {
    return <Loading />;
  }

  return (
    <div className="p-5 md:p-8">
      <Header />
      <main className="max-w-[335px] mx-auto md:max-w-[704px] xl:max-w-[1216px]">
        {children}
      </main>
    </div>
  );
}
