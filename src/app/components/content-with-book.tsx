export interface ContentWithBookProps {
  text: React.ReactNode;
  haveBack: boolean;
  className: string;
}

export default function ContentWithBook({
  text,
  haveBack,
  className,
}: ContentWithBookProps) {
  return (
    <div className={className}>
      <div>{haveBack}</div>
      {text}
    </div>
  );
}
