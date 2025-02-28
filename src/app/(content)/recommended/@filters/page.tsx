'use client';

import FiltersForm, {
  FiltersFormPropsType,
} from '@/app/components/filters-form';
import StartWorkout from '@/app/components/start-workout';

export default function Filters() {
  return (
    <div className="rounded-[30px] bg-lightDark overflow-hidden p-5 pb-10 flex flex-col gap-5">
      <FiltersForm type={FiltersFormPropsType.RECOMMENDED} />
      <StartWorkout />
    </div>
  );
}
