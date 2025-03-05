'use client';

import {
  LibraryBookCredentials,
  RecommendCredentialsInnerData,
} from '@/lib/requests';
import MyLibraryItem from './my-library-item';

export interface MyLibraryListProps {
  data: Array<LibraryBookCredentials | RecommendCredentialsInnerData>;
}

export default function MyLibraryList({ data }: MyLibraryListProps) {
  return (
    <ul className="flex flex-wrap gap-4 justify-between md:justify-around max-h-[260px] md:max-h-[548px] xl:w-[770px] overflow-auto">
      {data.map((item) => (
        <li key={item._id} className="hover:bg-neutral-700 rounded-md">
          <MyLibraryItem data={item} />
        </li>
      ))}
    </ul>
  );
}
