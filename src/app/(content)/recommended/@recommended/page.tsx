'use client';

import SliderBooks from '@/app/components/slider-books';
import { getRecommended } from '@/lib/requests';
import { useQuery } from '@tanstack/react-query';
import Loading from './loading';
import { useEffect } from 'react';
import { queryClient } from '@/app/providers';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Recommended() {
  const router = useRouter();
  const { data, status, refetch } = useQuery({
    queryKey: ['recommend'],
    queryFn: () =>
      getRecommended({ title: '', author: '', page: 1, limit: 30 }),
    staleTime: 60 * 60 * 1000,
  });

  useEffect(() => {
    if (status === 'error') {
      toast.error('Error refreshing session, please sing in');
      queryClient.clear();
      router.push('/login');
    }
    if (!data) {
      refetch();
    }
  }, [data, refetch, router, status]);

  if (status === 'pending') {
    return <Loading />;
  }


  return (
    <section>
      {data && (
        <div className="rounded-[30px] bg-lightDark overflow-hidden px-5 py-10 mt-[10px] flex flex-col gap-5 md:px-10 xl:m-0 xl:h-full xl:px-10 xl:pt-10 xl:pb-7">
          <SliderBooks data={data.results} type="rec" title="Recommended" />
        </div>
      )}
    </section>
  );
}
