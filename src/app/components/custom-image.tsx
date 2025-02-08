import Image from 'next/image';

export interface ImageProps {
  className?: string;
}

export default function CustomImage({
  className = 'w-10 h-10',
  ...rest
}: ImageProps) {
  return (
    <div>
      <Image {...rest} className={className} />
    </div>
  );
}
