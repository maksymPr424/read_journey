'use client';

import Link from 'next/link';
import StartWorkoutStep from './start-workout-step';
import CustomIcon from './custom-icon';

export default function StartWorkout() {
  return (
    <div className="rounded-[30px] bg-gray p-5 flex flex-col gap-5 md:gap-0 md:flex-grow">
      <h2 className="text-bolt text-lg md:text-xl md:mb-10">
        Start your workout
      </h2>
      <StartWorkoutStep
        activeText="Create a personal library:"
        secondaryText="add the books you intend to read to it"
        number={1}
        className="md:mb-5 md:max-w-[259px]"
      />
      <StartWorkoutStep
        activeText="Create your first workout:"
        secondaryText="define a goal, choose a period, start training."
        number={2}
        className="md:mb-5 md:max-w-[259px]"
      />
      <div className="flex justify-between items-center">
        <Link
          href="/library"
          className="text-lightGray text-sm underline hover:text-foreground"
        >
          My library
        </Link>
        <Link href="/library">
          <CustomIcon id="icon-log-in" className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
