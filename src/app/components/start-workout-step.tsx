import RoundedContent from './rounded-content';

export interface StartWorkoutStepProps {
  activeText: string;
  secondaryText: string;
  number: number;
}

export default function StartWorkoutStep({
  activeText,
  secondaryText,
  number,
}: StartWorkoutStepProps) {
  return (
    <div className="flex justify-between items-start">
      <RoundedContent className="bg-foreground text-background text-bolt text-lg w-10 h-10">
        {number}
      </RoundedContent>
      <h3 className="text-sm max-w-[200px] max-[375px]:max-w-[150px]">
        {activeText} <span className="text-lightGray">{secondaryText}</span>
      </h3>
    </div>
  );
}
