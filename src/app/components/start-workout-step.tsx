import clsx from 'clsx';
import RoundedContent from './rounded-content';

export interface StartWorkoutStepProps {
  activeText: string;
  secondaryText: string;
  number: number;
  className?: string;
}

export default function StartWorkoutStep({
  activeText,
  secondaryText,
  number,
  className,
}: StartWorkoutStepProps) {
  return (
    <div className={clsx('flex justify-between items-start', className)}>
      <RoundedContent className="bg-foreground text-background text-bolt text-lg md:text-xl w-10 h-10 md:w-11 md:h-11">
        {number}
      </RoundedContent>
      <h3 className="text-sm max-w-[200px] max-[375px]:max-w-[150px] md:max-w-[203px] md:tracking-tight">
        {activeText} <span className="text-lightGray">{secondaryText}</span>
      </h3>
    </div>
  );
}
