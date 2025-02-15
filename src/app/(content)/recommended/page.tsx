'use client';

import FiltersForm, {
  FiltersFormPropsType,
} from '@/app/components/filters-form';
import SliderBooks from '@/app/components/slider-books';
import StartWorkout from '@/app/components/start-workout';
import { getRecommended } from '@/lib/requests';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function Recommended() {
  const { data } = useSuspenseQuery({
    queryKey: ['recommend'],
    queryFn: () =>
      getRecommended({ title: '', author: '', page: 1, limit: 10 }),
    staleTime: 60 * 60 * 1000,
  });

  return (
    <section>
      <div className="rounded-[30px] bg-lightDark overflow-hidden p-5 pb-10 flex flex-col gap-5">
        <FiltersForm type={FiltersFormPropsType.RECOMMENDED} />
        <StartWorkout />
      </div>
      {data && (
        <div className="rounded-[30px] bg-lightDark overflow-hidden px-5 py-10 mt-[10px] flex flex-col gap-5">
          <SliderBooks data={data.results} type="rec" title="Recommended" />
        </div>
      )}
    </section>
  );
}
