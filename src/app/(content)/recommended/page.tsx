'use client';

import SliderBooks from '@/app/components/slider-books';
import { getRecommended } from '@/lib/requests';
import { useQuery } from '@tanstack/react-query';
import Loading from '../loading';

export default function Recommended() {
  const { data, status } = useQuery({
    queryKey: ['recommend'],
    queryFn: () =>
      getRecommended({ title: '', author: '', page: 1, limit: 10 }),
    staleTime: 60 * 60 * 1000,
  });

  if (status === 'pending') {
    return <Loading />;
  }
  
  console.log(data.results);

  return (
    <>
      {data && (
        <div className="rounded-[30px] bg-lightDark overflow-hidden px-5 py-10 mt-[10px] flex flex-col gap-5">
          <SliderBooks data={data.results} type="rec" title="Recommended" />
        </div>
      )}
    </>
  );
}
