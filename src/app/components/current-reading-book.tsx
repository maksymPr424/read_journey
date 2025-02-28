import clsx from 'clsx';
import CustomImage from './custom-image';

export interface CurrentReadingBookProps {
  imageUrl: string;
  title: string;
  author: string;
  status: string;
}

export default function CurrentReadingBook({
  imageUrl,
  title,
  author,
  status,
}: CurrentReadingBookProps) {
  return (
    <div>
      <h3 className="text-bolt text-xl text-left mb-10">My reading</h3>
      <div className="max-w-[146px] mx-auto text-center">
        <CustomImage
          src={imageUrl}
          alt="Book cover"
          width={137}
          height={208}
          className="w-[137px] h-[208px]"
        />
        <h4 className="text-bolt text-sm mt-[10px]">{title}</h4>
        <p className="text-[10px] mt-[5px] text-lightGray">{author}</p>
        <button
          className={clsx(
            'cursor-default relative mt-5 rounded-full border border-foreground w-10 h-10 before:content-[""] before:absolute before:bg-red-700 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
            status === 'active'
              ? 'before:w-[15px] before:h-[15px]'
              : 'before:w-[30px] before:h-[30px] before:rounded-full',
          )}
        ></button>
      </div>
    </div>
  );
}
