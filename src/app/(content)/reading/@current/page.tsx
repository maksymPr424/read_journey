'use client';

import CurrentReadingBook from '@/app/components/current-reading-book';
import { queryClient } from '@/app/providers';
import { LibraryBookCredentials } from '@/lib/requests';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loading from '../../loading';

export default function Current() {
  const router = useRouter();

  const { data, status } = useQuery<LibraryBookCredentials | null>({
    queryKey: ['book'],
    queryFn: async () =>
      queryClient.getQueryData<LibraryBookCredentials>(['book']) ?? null,
    staleTime: 24 * 60 * 60 * 1000,
    retry: 3,
  });

  useEffect(() => {
    if (status === 'error' || !data) {
      router.push('/library');
    }
  }, [router, status, data]);

  if (status === 'pending') {
    return <Loading />;
  }

  const getStatus = () => {
    if (!data?.progress || data.progress.length === 0) return 'inactive';

    const filteredProgress = data.progress.filter(
      ({ status }) => status === 'active',
    );
    return filteredProgress.length > 0 ? 'active' : 'inactive';
  };

  return (
    <section className="bg-lightDark rounded-[30px] px-5 py-10 xl:p-10 xl:pb-[53px] xl:h-full">
      <CurrentReadingBook
        imageUrl={data?.imageUrl || ''}
        title={data?.title || 'Unknown Title'}
        author={data?.author || 'Unknown Author'}
        status={getStatus()}
        timeLeftToRead={data?.timeLeftToRead}
      />
    </section>
  );
}
