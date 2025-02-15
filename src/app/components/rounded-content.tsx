import clsx from 'clsx';

export interface RoundedContentProps {
  className: string;
  children: React.ReactNode | string;
}

export default function RoundedContent({
  className,
  children,
}: RoundedContentProps) {
  return (
    <span
      className={clsx(
        'rounded-full border flex items-center justify-center',
        className,
      )}
    >
      {children}
    </span>
  );
}

//TODO: In className wonna be a border/background color, width, height and font size/weight
