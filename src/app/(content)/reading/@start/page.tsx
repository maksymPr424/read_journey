'use client';

import ProgressReading from '@/app/components/progress-reading';
import ReadingForm, { ReadingFormType } from '@/app/components/reading-form';
import { queryClient } from '@/app/providers';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LibraryBookCredentials } from '@/lib/requests';
export default function Start() {
  const router = useRouter();
  const { data, status } = useQuery<LibraryBookCredentials | null>({
    queryKey: ['book'],
    queryFn: async () =>
      queryClient.getQueryData<LibraryBookCredentials>(['book']) ?? null,
    staleTime: 24 * 60 * 60 * 1000,
    retry: 3,
  });

  const [isStartedReading, setIsStartedReading] = useState(false);

  useEffect(() => {
    if (status === 'error' || !data) {
      router.push('/library');
      return;
    }

    const progressArr = data.progress || [];
    if (progressArr.length === 0) {
      setIsStartedReading(false);
      return;
    }

    setIsStartedReading(
      progressArr[progressArr.length - 1]?.status === 'active',
    );
  }, [data, router, status]);

  if (status === 'pending') {
    return <h2>Loading book...</h2>;
  }

  const currentPage =
    data?.progress?.[data.progress.length - 1]?.finishPage ||
    data?.progress?.[data.progress.length - 1]?.startPage ||
    1;

  return (
    <section className="bg-lightDark rounded-[30px] px-5 pt-5 pb-10">
      {isStartedReading ? (
        <ReadingForm
          type={ReadingFormType.STOP}
          id={data!._id}
          currentPageNum={currentPage}
          totalPageNum={data!.totalPages}
        />
      ) : (
        <ReadingForm
          type={ReadingFormType.START}
          id={data!._id}
          currentPageNum={currentPage}
          totalPageNum={data!.totalPages}
        />
      )}
      <ProgressReading totalPages={data!.totalPages} bookId={data!._id} />
    </section>
  );
}
