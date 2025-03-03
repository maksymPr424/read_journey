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
import { toast } from 'sonner';

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
        toast.success('Success refresh session');
        router.push('/recommended');
        hasRedirected.current = true;
      }
    },
    onError() {
      console.log('❌ Refresh failed, redirecting to login...');
      queryClient.clear();

      if (!hasRedirected.current) {
        toast.error('Something went wrong');
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
      <section className="m-auto p-5 m:max-w-[375px] md:flex md:flex-col md:h-[100vh] md:p-8">
        <div className="rounded-[30px] bg-lightDark overflow-hidden p-5 pb-10 h-[470px] max-[375px]:h-[500px] flex flex-col md:flex-grow md:pt-10 md:pl-16">
          <div className="mb-[40px] md:mb-[157px]">
            <Link
              href="/"
              className="md:flex md:items-center md:gap-1 max-w-max block"
            >
              <CustomIcon id="icon-Logo" className="w-[42px] h-[17px]" />
              <h2 className="hidden md:block uppercase text-lg">
                read journey
              </h2>
            </Link>
          </div>

          <div className="md:max-w-[472px] text-start md:max-h-[532px] md:h-[100%] flex flex-col">
            <h1 className="text-[32px] font-bold mb-5 mt-0 leading-8 md:text-6xl md:mb-10">
              Expand your mind, reading{' '}
              <span className="text-grayPercent">a book</span>
            </h1>
            {children}
          </div>
        </div>
        <div className="mt-4 pt-5 px-10 rounded-[30px] bg-lightDark overflow-hidden md:hidden">
          <CustomImage src={phone} alt="Recommended books" className="h-full" />
        </div>
      </section>
    </QueryProvider>
  );
}
