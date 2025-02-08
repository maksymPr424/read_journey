export interface IconProps {
  id: string;
  className?: string;
}

export default function Icon({
  id,
  className = "w-16 h-16",
}: IconProps) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`/sprite.svg#${id}`} />
    </svg>
  );
}
