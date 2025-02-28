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

export default function RecLib() {
  const router = useRouter();

  const { data, status } = useQuery({
    queryKey: ['recommend'],
    queryFn: () =>
      getRecommended({ title: '', author: '', page: 1, limit: 10 }),
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data === null) {
      console.log('Redirecting to login');
      queryClient.clear();
      router.push('/login');
    }
  }, [router, data]);

  if (status === 'pending') {
    return <Loading />;
  }

  console.log(data.results);

  return (
    <div className="rounded-[30px] bg-gray p-5">
      <h3 className="mb-[14px]">Recommended books</h3>
      <ul className="flex justify-between mb-[17px]">
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
        <Link href="/recommended" className="text-lightGray text-sm underline">
          Home
        </Link>
        <Link href="/recommended">
          <CustomIcon id="icon-log-in" className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
