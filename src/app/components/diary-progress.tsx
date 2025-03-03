'use client';

import clsx from 'clsx';
import CustomIcon from './custom-icon';
import { useMutation } from '@tanstack/react-query';
import { delateReadingSession, ProgressItem } from '@/lib/requests';
import { queryClient } from '../providers';
import { useState } from 'react';
import { LibraryBookCredentials } from '@/lib/requests';
import { toast } from 'sonner';
import NoProgress from './no-progress';

export interface DiaryProgressProps {
  progress: ProgressItem[];
  totalPages: number;
  bookId: string;
}

export default function DiaryProgress({
  progress,
  totalPages,
  bookId,
}: DiaryProgressProps) {
  const [progressData, setProgressData] = useState<ProgressItem[]>(progress);

  const delateReading = useMutation({
    mutationFn: delateReadingSession,
    onSuccess(data: LibraryBookCredentials) {
      queryClient.setQueryData(['book'], data);
      setProgressData(data.progress);
      toast.success('Successful deleted reading session');
    },
    onError() {
      toast.error('Error delate reading session, please retry');
    },
  });

  const getDate = (isoString: string) => {
    const date = new Date(isoString);

    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getDateDifference = (isoDate1: string, isoDate2: string) => {
    const date1 = new Date(isoDate1);
    const date2 = new Date(isoDate2);

    const diffInMs = date2.getTime() - date1.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    return diffInMinutes;
  };

  const handleDelateSession = (id: string) => {
    toast.info('Deleting reading session...');

    if (progressData[progressData.length - 1].finishPage === totalPages) {
      return;
    }
    delateReading.mutate({ bookId, readingId: id });
  };

  const getReadPages = (finish: number, start: number) => {
    return finish - start;
  };

  if (progressData.length === 0) {
    return <NoProgress />;
  }

  return (
    <ul className="flex flex-col-reverse max-h-[211px] overflow-auto custom-scrollbar pr-2">
      {progress.map((session, index) => {
        if (session.status === 'active') {
          return null;
        }

        return (
          <li
            key={session.startReading}
            className="flex items-baseline gap-[9px] mb-[17px] relative before:content-[''] before:absolute before:top-0 before:left-[7px] before:w-[2px] before:h-[calc(100%+17px)] before:bg-lightDark"
          >
            <span
              className={clsx(
                'relative bg-foreground rounded-sm w-4 h-4 md:w-5 md:h-5',
                progress.length - 1 === index
                  ? 'bg-foreground'
                  : 'bg-lightGray',
              )}
            >
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-xs w-2 h-2 md:w-3 md:h-3"></span>
            </span>
            <div className="flex justify-between items-baseline flex-1">
              <div>
                <p className="md:text-base text-bolt">
                  {getDate(session.finishReading ?? session.startReading)}
                </p>
                <p className="text-sm mt-4 md:text-xl">
                  {((100 / totalPages) * (session.finishPage || 0)).toFixed(1)}%
                </p>
                <p className="text-lightGray text-[10px] mt-1 md:text-xs">
                  <span>
                    {session.finishReading && session.startReading
                      ? getDateDifference(
                          session.startReading,
                          session.finishReading,
                        )
                      : 0}
                  </span>{' '}
                  minutes
                </p>
              </div>
              <div className="text-right flex items-center">
                <div className="mr-[6px]">
                  <p className="text-xs md:text-sm text-lightGray">
                    <span>
                      {session.finishPage && session.startPage
                        ? getReadPages(session.finishPage, session.startPage)
                        : 0}
                    </span>{' '}
                    pages
                  </p>
                  <div className="mt-4 flex justify-end ">
                    <CustomIcon
                      id="icon-block"
                      className="w-[43px] h-[18px] md:w-[59px] md:h-6"
                    />
                  </div>
                  <p className="mt-[7px] text-[10px] md:text-xs text-lightGray md:max-w-[59px]">
                    <span>{session.speed || 0}</span> pages per hour
                  </p>
                </div>
                <button
                  disabled={
                    progressData[progressData.length - 1]?.finishPage ===
                    totalPages
                      ? true
                      : false
                  }
                  onClick={() => handleDelateSession(session._id)}
                >
                  <CustomIcon
                    id="icon-trash"
                    className={clsx(
                      'w-[14px] h-[14px] stroke-lightGray ',
                      progressData[progressData.length - 1].finishPage ===
                        totalPages
                        ? ''
                        : 'hover:stroke-red-600 focus:stroke-red-600',
                    )}
                  />
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
