'use client';

import Link from 'next/link';
import StartWorkoutStep from './start-workout-step';
import CustomIcon from './custom-icon';

export default function StartWorkout() {
  return (
    <div className="rounded-[30px] bg-gray p-5 flex flex-col gap-5">
      <h2 className="text-bolt text-lg">Start your workout</h2>
      <StartWorkoutStep
        activeText="Create a personal library:"
        secondaryText="add the books you intend to read to it"
        number={1}
      />
      <StartWorkoutStep
        activeText="Create your first workout:"
        secondaryText="define a goal, choose a period, start training."
        number={2}
      />
      <div className="flex justify-between items-center">
        <Link href="/library" className="text-lightGray text-sm underline">
          My library
        </Link>
        <Link href="/library">
          <CustomIcon id="icon-log-in" className="w-6 h-6" />
        </Link>
      </div>
    </div>
  );
}
