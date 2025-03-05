'use client';

import { LibraryBookCredentials, ProgressItem } from '@/lib/requests';
import CustomIcon from './custom-icon';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import DiaryProgress from './diary-progress';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Statistics from './statistics';
import { queryClient } from '../providers';
import NoProgress from './no-progress';

export interface ProgressReadingProps {
  totalPages: number;
  bookId: string;
}

export default function ProgressReading({
  totalPages,
  bookId,
}: ProgressReadingProps) {
  const router = useRouter();
  const [isStatistic, setIsStatistic] = useState(false);
  const {
    data,
    status,
  }: { data: LibraryBookCredentials | undefined; status: string } = useQuery({
    queryKey: ['book'],
    queryFn: async () => queryClient.getQueryData(['book']) ?? Promise.reject(),
    staleTime: 60 * 60 * 60 * 24,
    retry: 3,
  });

  const [progressData, setProgressData] = useState<ProgressItem[] | []>([]);

  const handleSetStatistic = () => {
    setIsStatistic(true);
  };

  const handleSetDiary = () => {
    setIsStatistic(false);
  };

  const getProgressToDiary = (): ProgressItem[] | [] => {
    const resArr = [];

    for (let i = 0; i < progressData.length; i++) {
      const element = progressData[i];
      if (element?.finishPage !== undefined) {
        resArr.push(element);
      }
    }

    return resArr;
  };

  useEffect(() => {
    if (status === 'error') {
      router.push('/library');
    }

    if (status === 'success') {
      setProgressData(data?.progress || []);
    }
  }, [data, router, status]);

  if (getProgressToDiary().length === 0 || status === 'pending') {
    return <NoProgress />;
  }

  return (
    <div className="xl:h-[440px]">
      <div className="flex justify-between mb-[22px]">
        <h2 className="md:text-xl">{isStatistic ? 'Statistics' : 'Diary'}</h2>
        <div>
          <button onClick={handleSetDiary}>
            <CustomIcon
              id="icon-hourglass"
              className={clsx(
                'w-4 h-4 md:w-5 md:h-5 hover:stroke-foreground active:stroke-foreground focus:stroke-foreground',
                !isStatistic ? 'stroke-foreground' : 'stroke-lightGray',
              )}
            />
          </button>
          <button onClick={handleSetStatistic}>
            <CustomIcon
              id="icon-pie-chart"
              className={clsx(
                'w-4 h-4 md:w-5 md:h-5 hover:stroke-foreground active:stroke-foreground focus:stroke-foreground ml-2',
                isStatistic ? 'stroke-foreground' : 'stroke-lightGray',
              )}
            />
          </button>
        </div>
      </div>
      {isStatistic && (
        <p className="hidden xl:block xl:text-lightGray xl:text-sm xl:mb-5 xl:max-w-[293px]">
          Each page, each chapter is a new round of knowledge, a new step
          towards understanding. By rewriting statistics, we create our own
          reading history.
        </p>
      )}
      <div className="rounded-xl bg-gray p-4 pr-2 md:w-[321px] xl:flex-grow">
        {isStatistic ? (
          <Statistics
            totalPages={totalPages}
            lastPage={
              getProgressToDiary()[getProgressToDiary().length - 1]
                .finishPage || 0
            }
          />
        ) : (
          <DiaryProgress
            progress={getProgressToDiary()}
            totalPages={totalPages}
            bookId={bookId}
          />
        )}
      </div>
    </div>
  );
}
