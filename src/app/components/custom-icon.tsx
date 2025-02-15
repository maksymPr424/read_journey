'use client';

export interface CustomIconProps {
  id: string;
  className?: string;
}

export default function CustomIcon({
  id,
  className = 'w-16 h-16',
}: CustomIconProps) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`/sprite.svg#${id}`}/>
    </svg>
  );
}
