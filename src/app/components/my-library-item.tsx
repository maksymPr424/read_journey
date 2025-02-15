'use client';

import { ButtonHTMLAttributes } from 'react';
import CustomImage from './custom-image';
import { useRouter } from 'next/navigation';
import CustomIcon from './custom-icon';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../providers';
import { delateBook, deleteResponseCred, LibraryBookCredentials, RecommendCredentialsInnerData } from '@/lib/requests';

export interface RecommendedListItemProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  data: RecommendCredentialsInnerData | LibraryBookCredentials;
}

export default function MyLibraryItem({ data }: RecommendedListItemProps) {
  const { _id, imageUrl, author, title } = data;
  const router = useRouter();

  const mutate = useMutation({
    mutationFn: delateBook,
    onSuccess: (data: deleteResponseCred) => {
      console.log(data);
      const previousBooks =
        (queryClient.getQueryData(['own']) as LibraryBookCredentials[]) || [];

      queryClient.setQueryData(
        ['own'],
        previousBooks.filter((book) => book._id !== data.id),
      );
    },
    onError: (error) => {
      console.error('Error deleting book:', error);
    },
  });

  const handleGoBook = () => {
    router.push('/reading');
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
    mutate.mutate({ _id });
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
            <CustomIcon id="icon-trash" className="w-[14px] h-[14px]" />
          </a>
        </div>
      </div>
    </button>
  );
}
