'use client';

import Link from 'next/link';
import CustomImage from '../components/custom-image';
import phone from '../../../public/images/phone.png';
import QueryProvider, { queryClient } from '../providers';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import CustomIcon from '../components/custom-icon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { refreshUser } from '@/lib/auth';
import { setBearerToken } from '@/lib/api';
import { UserCredentials } from '@/lib/requests';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const hasRedirected = useRef(false);

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

      if (!hasRedirected.current) {
        router.push('/recommended');
        hasRedirected.current = true;
      }
    },
    onError() {
      console.log('❌ Refresh failed, redirecting to login...');
      queryClient.clear();

      if (!hasRedirected.current) {
        router.push('/login');
        hasRedirected.current = true;
      }
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
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (status !== 'success' || !user) return;

    setBearerToken(user.token);

    if (Date.now() - dataUpdatedAt > 30 * 60 * 1000) {
      mutation.mutate();
    }

    if (!hasRedirected.current) {
      router.push('/recommended');
      hasRedirected.current = true;
    }
  }, [status, user, dataUpdatedAt, mutation, router]);

  return (
    <QueryProvider>
      <section className="m-auto m:max-w-[375px] p-5">
        <div className="rounded-[30px] bg-lightDark overflow-hidden p-5 pb-10 h-[470px] max-[375px]:h-[500px] flex flex-col">
          <Link href="/">
            <CustomIcon
              id="icon-Logo"
              className="w-[42px] h-[17px] mb-[40px]"
            />
          </Link>

          <h1 className="text-[32px] font-bold mb-[20px] mt-0 leading-8">
            Expand your mind, reading{' '}
            <span className="text-grayPercent">a book</span>
          </h1>
          {children}
        </div>
        <div className="mt-4 pt-5 px-10 rounded-[30px] bg-lightDark overflow-hidden">
          <CustomImage src={phone} alt="Recommended books" className="h-full" />
        </div>
      </section>
    </QueryProvider>
  );
}
