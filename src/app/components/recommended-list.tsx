'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import RoundedContent from './rounded-content';
import CustomIcon from './custom-icon';
import RecommendedListItem from './recommended-list-item';
import { useSuspenseQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { FiltersFormPropsType } from './filters-form';
import { getRecommended, RecommendCredentialsInnerData } from '@/lib/requests';

export default function RecommendedList() {
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const { data } = useSuspenseQuery({
    queryKey: ['recommend'],
    queryFn: () =>
      getRecommended({ title: '', author: '', page: 1, limit: 10 }),
    staleTime: 60 * 60 * 1000,
  });

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

  return (
    <>
      <div className="flex justify-between items-start">
        <h3 className="text-bolt text-xl">Recommended</h3>
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
            {data.results.map((item: RecommendCredentialsInnerData) => (
              <li key={item._id}>
                <RecommendedListItem
                  data={item}
                  typeItem={FiltersFormPropsType.RECOMMENDED}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
