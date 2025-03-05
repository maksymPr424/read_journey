import React from 'react';

const CircularProgress = ({ progress }: { progress: number }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      className="w-32 h-32 xl:w-[189px] xl:h-[189px] transform -rotate-90"
      viewBox="0 0 120 120"
    >
      <circle
        className="stroke-lightDark"
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        strokeWidth="10"
      />

      <circle
        className="stroke-green transition-all duration-300"
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        strokeWidth="10"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />

      <text
        x="60"
        y="60"
        textAnchor="middle"
        dy="8"
        className="text-lg md:text-xl xl:text-sm font-bold fill-current text-foreground"
        transform="rotate(90 60 60)"
      >
        100%
      </text>
    </svg>
  );
};

export default CircularProgress;
