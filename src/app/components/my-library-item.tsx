'use client';

import { ButtonHTMLAttributes } from 'react';
import CustomImage from './custom-image';
import CustomIcon from './custom-icon';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../providers';
import {
  currentBook,
  delateBook,
  deleteResponseCred,
  LibraryBookCredentials,
  RecommendCredentialsInnerData,
} from '@/lib/requests';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export interface RecommendedListItemProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  data: RecommendCredentialsInnerData | LibraryBookCredentials;
}

export default function MyLibraryItem({ data }: RecommendedListItemProps) {
  const { _id, imageUrl, author, title } = data;
  const router = useRouter();

  const mutateDel = useMutation({
    mutationFn: delateBook,
    onSuccess(data: deleteResponseCred) {
      console.log(data);
      const previousBooks =
        (queryClient.getQueryData(['own']) as LibraryBookCredentials[]) || [];

      queryClient.setQueryData(
        ['own'],
        previousBooks.filter((book) => book._id !== data.id),
      );
      toast.success('Successful deleted book');
    },
    onError() {
      toast.error('Error deleting book, please retry');
    },
  });

  const mutateAdd = useMutation({
    mutationFn: currentBook,
    onSuccess(data: LibraryBookCredentials) {
      queryClient.setQueryData(['book'], data);
      router.push('/reading');
    },
    onError() {
      toast.error('Error getting a book, please retry');
    },
  });

  const handleGoBook = () => {
    toast.info('Go to reading...')
    mutateAdd.mutate({ id: _id });
  };

  const getTitle = () => {
    const lengthTitle = title.length;

    if (lengthTitle > 11) {
      return title.slice(0, 11) + '...';
    }
    return title;
  };

  const handleDelateBook = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutateDel.mutate({ _id });
  };

  return (
    <button onClick={handleGoBook} className="cursor-pointer relative z-[0]">
      <div className="max-w-[138px] min-h-[208px]">
        <CustomImage
          src={imageUrl}
          alt="Book image"
          className="w-[138px] h-[208px] bg-cover bg-no-repeat rounded-lg"
          width={138}
          height={208}
        />
        <div className="mt-2 flex items-center justify-between">
          <div>
            <h3 className="text-bolt text-sm text-left">{getTitle()}</h3>
            <p className="text-lightGray text-xs text-left mt-[2px]">
              {author}
            </p>
          </div>
          <a
            onClick={handleDelateBook}
            className="p-[7px] rounded-full border border-red-600/[55%] bg-red-700/[10%] flex items-center justify-center relative z-[1]"
          >
            <CustomIcon
              id="icon-trash"
              className="w-[14px] h-[14px] stroke-red-600"
            />
          </a>
        </div>
      </div>
    </button>
  );
}
