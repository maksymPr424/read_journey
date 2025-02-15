'use client';

import SelectorBooks from '@/app/components/selector-books';
import SliderBooks from '@/app/components/slider-books';
import { getOwnBook } from '@/lib/requests';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

export const allFilterOptions = ['Unread', 'In progress', 'Done', 'All books'];

export default function Library() {
  const [selector, setSelector] = useState(allFilterOptions[3]);

  const getSelector = (selected: string) => {
    setSelector(selected);
  };

  const stringToFilter = (str: string) => {
    return str.slice(0, 1).toUpperCase().concat(str.slice(1)).replace('-', ' ');
  };

  const { data } = useSuspenseQuery({
    queryKey: ['own'],
    queryFn: getOwnBook,
  });

  const filteredData = () => {
    if (!data) return [];
    if (selector === allFilterOptions[3]) return data;

    return data.filter(
      ({ status }: { status: string }) => stringToFilter(status) === selector,
    );
  };

  return (
    <div className="mt-[10px] rounded-[30px] bg-gray px-5 pt-10 pb-[65px]">
      <div className="flex justify-between">
        <h3 className="text-bolt text-xl">My library</h3>
        <SelectorBooks
          allOptions={allFilterOptions}
          sendSelector={getSelector}
        />
      </div>
      <div className="mt-[14px] min-h-[320px]">
        <SliderBooks
          data={filteredData()}
          type="own"
          title="Recommended"
          libraryItem={true}
        />
      </div>
    </div>
  );
}
