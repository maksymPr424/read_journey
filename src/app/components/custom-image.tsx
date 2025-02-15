import Image, { StaticImageData } from 'next/image';
import BaseBook from '../../../public/images/book.png';
import clsx from 'clsx';

export interface ImageProps {
  className?: string;
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
}

export default function CustomImage({
  className = 'w-10 h-10',
  src,
  alt,
  width,
  height,
  ...rest
}: ImageProps) {
  return (
    <div className={clsx(className, 'flex justify-center items-center')}>
      {src ? (
        <Image
          width={width}
          height={height}
          src={src}
          alt={alt}
          {...rest}
          className={className}
        />
      ) : (
        <div>
          <Image
            src={BaseBook}
            alt="Book icon"
            className='w-20 h-20'
          />
        </div>
      )}
    </div>
  );
}
