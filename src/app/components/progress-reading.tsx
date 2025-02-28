'use client';

import { LibraryBookCredentials, ProgressItem } from '@/lib/requests';
import CustomImage from './custom-image';
import Sun from '../../../public/images/sun.png';
import CustomIcon from './custom-icon';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import DiaryProgress from './diary-progress';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Statistics from './statistics';
import { queryClient } from '../providers';

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
      if (element.finishPage !== undefined) {
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
    console.log('Loading from progress-reading');

    return (
      <>
        <h3 className="text-bolt text-lg mb-[14px]">Progress</h3>
        <p className="text-lightGray text-[13px] mb-5">
          Here you will see when and how much you read. To record, click on the
          red button above.
        </p>
        <div className="flex items-center justify-center p-6 bg-gray rounded-full max-w-max mx-auto">
          <CustomImage
            src={Sun}
            alt="Sun image"
            width={32}
            height={32}
            className="w-8 h-8"
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-between mb-[22px]">
        <h2>{isStatistic ? 'Statistics' : 'Diary'}</h2>
        <div>
          <button onClick={handleSetDiary}>
            <CustomIcon
              id="icon-hourglass"
              className={clsx(
                'w-4 h-4 hover:stroke-foreground active:stroke-foreground focus:stroke-foreground',
                !isStatistic ? 'stroke-foreground' : 'stroke-lightGray',
              )}
            />
          </button>
          <button onClick={handleSetStatistic}>
            <CustomIcon
              id="icon-pie-chart"
              className={clsx(
                'w-4 h-4 hover:stroke-foreground active:stroke-foreground focus:stroke-foreground ml-2',
                isStatistic ? 'stroke-foreground' : 'stroke-lightGray',
              )}
            />
          </button>
        </div>
      </div>
      <div className="rounded-xl bg-gray p-4 pr-2">
        {isStatistic ? (
          <Statistics
            totalPages={totalPages}
            lastPage={
              getProgressToDiary()[getProgressToDiary().length - 1].finishPage ||
              0
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
    </>
  );
}
