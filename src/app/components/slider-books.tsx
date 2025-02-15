'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import RoundedContent from './rounded-content';
import CustomIcon from './custom-icon';
import clsx from 'clsx';
import RecommendedListItem from './recommended-list-item';
import { FiltersFormPropsType } from './filters-form';
import MyLibraryItem from './my-library-item';
import { LibraryBookCredentials, RecommendCredentialsInnerData } from '@/lib/requests';

export interface SliderBooksProps {
  data: Array<LibraryBookCredentials | RecommendCredentialsInnerData>;
  type: string;
  title: string;
  libraryItem?: boolean;
}

export default function SliderBooks({
  data,
  type,
  title,
  libraryItem,
}: SliderBooksProps) {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [haveData, setHaveData] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ slidesToScroll: 2 });

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateButtons();

    emblaApi.on('select', updateButtons);
    emblaApi.on('reInit', updateButtons);

    return () => {
      emblaApi.off('select', updateButtons);
      emblaApi.off('reInit', updateButtons);
    };
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  useEffect(() => {
    if (!haveData) {
      setHaveData(false);
    }
    setHaveData(true);
  }, [data, haveData]);

  if (!haveData) {
    return (
      <div className="text-center">
        <h3 className="text-bolt text-xl">Do not have yet!</h3>
      </div>
    );
  }

  return (
    <div className={clsx(type === 'own' ? 'flex flex-col-reverse' : '')}>
      <div
        className={clsx(
          'flex items-start',
          type === 'own' ? 'justify-center mt-4' : 'justify-between mb-[22px]',
        )}
      >
        <h3 className={clsx(type === 'own' ? 'hidden' : 'text-bolt text-xl')}>
          {title}
        </h3>
        <div>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="mr-2"
          >
            <RoundedContent className="w-8 h-8 bg-transparent border-lightGray">
              <CustomIcon
                id="icon-chevron-left"
                className={clsx(
                  'w-4 h-4',
                  canScrollPrev ? 'stroke-foreground' : 'stroke-lightGray',
                )}
              />
            </RoundedContent>
          </button>
          <button onClick={scrollNext} disabled={!canScrollNext}>
            <RoundedContent className="w-8 h-8 bg-transparent border-lightGray">
              <CustomIcon
                id="icon-chevron-right"
                className={clsx(
                  'w-4 h-4',
                  canScrollNext ? 'stroke-foreground' : 'stroke-lightGray',
                )}
              />
            </RoundedContent>
          </button>
        </div>
      </div>
      <div className="max-w-[100%]">
        <div ref={emblaRef} className="overflow-hidden">
          <ul className="flex gap-5">
            {data.map(
              (
                item: LibraryBookCredentials | RecommendCredentialsInnerData,
              ) => (
                <li key={item._id}>
                  {libraryItem ? (
                    <MyLibraryItem data={item} />
                  ) : (
                    <RecommendedListItem
                      data={item}
                      typeItem={FiltersFormPropsType.RECOMMENDED}
                    />
                  )}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
