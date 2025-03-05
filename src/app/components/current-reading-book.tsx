'use client';

import clsx from 'clsx';
import CustomImage from './custom-image';
import { TimeLeftToReadObject } from '@/lib/requests';

export interface CurrentReadingBookProps {
  imageUrl: string;
  title: string;
  author: string;
  status: string;
  timeLeftToRead?: TimeLeftToReadObject;
}

export default function CurrentReadingBook({
  imageUrl,
  title,
  author,
  status,
  timeLeftToRead,
}: CurrentReadingBookProps) {
  return (
    <div className="h-full">
      <div className="flex justify-between items-center mb-10 xl:mb-11">
        <h3 className="text-bolt text-xl text-left xl:text-3xl">My reading</h3>
        {timeLeftToRead && (
          <p className="text-xs text-lightGray">
            {timeLeftToRead.hours} hours and {timeLeftToRead.minutes} minutes
            left
          </p>
        )}
      </div>
      <div className="max-w-[146px] md:max-w-[400px] mx-auto text-center">
        <CustomImage
          src={imageUrl}
          alt="Book cover"
          width={137}
          height={208}
          className="w-[137px] h-[208px] xl:w-[224px] xl:h-[310px] mx-auto rounded-md"
        />
        <h4 className="text-bolt text-sm xl:text-xl mt-[10px] md:mt-6">
          {title}
        </h4>
        <p className="text-[10px] md:text-sm mt-1 text-lightGray">{author}</p>
        <button
          className={clsx(
            'cursor-default relative mt-5 md:mt-4 rounded-full border border-foreground w-10 h-10 md:w-[50px] md:h-[50px] before:content-[""] before:absolute before:bg-red-700 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
            status === 'active'
              ? 'before:w-[15px] before:h-[15px] md:before:w-[20px] md:before:h-[20px] '
              : 'before:w-[30px] before:h-[30px]  md:before:w-[40px] md:before:h-[40px] before:rounded-full',
          )}
        ></button>
      </div>
    </div>
  );
}
