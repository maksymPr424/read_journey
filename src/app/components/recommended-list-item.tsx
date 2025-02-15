import { ButtonHTMLAttributes, useState } from 'react';
import CustomImage from './custom-image';
import { FiltersFormPropsType } from './filters-form';
import clsx from 'clsx';
import BookModal from './book-modal';
import { LibraryBookCredentials, RecommendCredentialsInnerData } from '@/lib/requests';

export interface RecommendedListItemProps
  extends Partial<ButtonHTMLAttributes<HTMLButtonElement>> {
  data: RecommendCredentialsInnerData | LibraryBookCredentials;
  typeItem: FiltersFormPropsType;
}

export default function RecommendedListItem({
  data,
  typeItem,
}: RecommendedListItemProps) {
  const { _id, imageUrl, author, title, totalPages } = data;
  const [isOpen, setIsOpen] = useState(false);

  const isRec = typeItem === FiltersFormPropsType.RECOMMENDED;
  // const isLib = typeItem === FiltersFormPropsType.LIBRARY;

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const getTitle = () => {
    const lengthTitle = title.length;

    if (isRec) {
      if (lengthTitle > 23) {
        return title.slice(0, 20) + '...';
      }
      return title;
    } else {
      if (lengthTitle > 12) {
        return title.slice(0, 11) + '...';
      }
      return title;
    }
  };

  return (
    <>
      <button onClick={handleOpenMenu}>
        <div
          className={clsx(
            isRec ? 'w-[138px]' : 'w-[71px]',
            isRec ? 'h-[208px]' : 'h-[107px]',
          )}
        >
          <CustomImage
            src={imageUrl}
            alt="Book image"
            className={clsx(
              isRec ? 'w-[138px]' : 'w-[71px]',
              isRec ? 'h-[208px]' : 'h-[107px]',
              'bg-cover bg-no-repeat rounded-lg',
            )}
            width={isRec ? 138 : 71}
            height={isRec ? 208 : 107}
          />
          <div className="mt-2">
            <h3
              className={clsx('text-bolt', isRec ? 'text-sm' : 'text-[10px]')}
            >
              {getTitle()}
            </h3>
            <p
              className={clsx(
                'text-lightGray',
                isRec ? 'text-xs  mt-2' : 'text-[10px]  mt-[2px]',
              )}
            >
              {author}
            </p>
          </div>
        </div>
      </button>
      <BookModal
        isOpen={isOpen}
        handleCloseMenu={handleCloseMenu}
        imageUrl={imageUrl}
        title={title}
        author={author}
        totalPages={totalPages}
        _id={_id}
      />
    </>
  );
}
