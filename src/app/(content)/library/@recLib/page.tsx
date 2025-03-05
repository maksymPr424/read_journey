'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/app/providers';
import RecommendedListItem from '@/app/components/recommended-list-item';
import { FiltersFormPropsType } from '@/app/components/filters-form';
import CustomIcon from '@/app/components/custom-icon';
import { useEffect } from 'react';
import { getRecommended, RecommendCredentialsInnerData } from '@/lib/requests';
import Loading from '../../loading';
import { toast } from 'sonner';

export default function RecLib() {
  const router = useRouter();

  const { data, status } = useQuery({
    queryKey: ['recommend'],
    queryFn: () =>
      getRecommended({ title: '', author: '', page: 1, limit: 30 }),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (status === 'error') {
      toast.error('Error refreshing session, please sing in');
      queryClient.clear();
      router.push('/login');
    }
  }, [router, status]);

  if (status === 'pending') {
    return <Loading />;
  }

  return (
    <div className="rounded-[30px] bg-gray p-5 md:pt[26px] md:pb-[27px] md:px-5 md:w-[313px]">
      <h3 className="mb-[14px] md:text-bolt md:text-xl ">
        Recommended books
      </h3>
      <ul className="flex justify-between mb-[17px] pr-5">
        {data.results.map(
          (item: RecommendCredentialsInnerData, index: number) => {
            if (index > 2) return null;

            return (
              <li key={item._id}>
                <RecommendedListItem
                  data={item}
                  typeItem={FiltersFormPropsType.LIBRARY}
                />
              </li>
            );
          },
        )}
      </ul>
      <div className="flex justify-between items-center">
        <Link
          href="/recommended"
          className="text-lightGray text-sm underline hover:text-foreground"
        >
          Home
        </Link>
        <Link href="/recommended">
          <CustomIcon id="icon-log-in" className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
