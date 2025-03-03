'use client';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import CustomIcon from './custom-icon';
import { queryClient } from '../providers';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface SelectorBooksProps {
  allOptions: string[];
  sendSelector: (selector: string) => void;
}

export default function SelectorBooks({
  allOptions,
  sendSelector,
}: SelectorBooksProps) {
  const { data } = useSuspenseQuery({
    queryKey: ['selector'],
    queryFn: () => allOptions[3],
    staleTime: 60 * 60 * 1000,
  });

  const [selected, setSelected] = useState(data);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleOpenSelect = () => {
    setIsOpen(true);
  };

  const handleCloseSelect = (selected: string) => {
    queryClient.setQueryData(['selector'], selected);
    sendSelector(selected);
    setIsOpen(false);
  };

  const checkDropClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    sendSelector(data);

    document.addEventListener('click', checkDropClick);
    return () => {
      document.removeEventListener('click', checkDropClick);
    };
  }, [data, sendSelector]);

  const handleChoice = (item: string) => {
    setSelected(item);
    handleCloseSelect(item);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="bg-transparent border border-lightGray rounded-xl px-[14px] py-3 cursor-pointer focus:outline-none flex justify-between items-center w-[140px]"
        onClick={handleOpenSelect}
      >
        {selected}
        <CustomIcon id="icon-chevron-down" className="w-4 h-4" />
      </div>
      {isOpen && (
        <ul className="absolute mt-2 rounded-xl shadow-md overflow-hidden bg-gray w-[140px] z-[1]">
          {allOptions.map((item, index) => (
            <li
              key={index}
              className={clsx(
                'px-4 py-2 cursor-pointer hover:text-foreground',
                selected === item ? 'text-foreground' : 'text-lightGray',
              )}
              onClick={() => handleChoice(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
