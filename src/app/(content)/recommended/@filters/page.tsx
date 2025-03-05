'use client';

import FiltersForm, {
  FiltersFormPropsType,
} from '@/app/components/filters-form';
import Quote from '@/app/components/quote';
import StartWorkout from '@/app/components/start-workout';

export default function Filters() {
  return (
    <section className="rounded-[30px] bg-lightDark overflow-hidden p-5 pb-10 flex flex-col gap-5 md:flex-row md:gap-8 xl:flex-col">
      <FiltersForm type={FiltersFormPropsType.RECOMMENDED} />
      <StartWorkout />
      <Quote />
    </section>
  );
}
