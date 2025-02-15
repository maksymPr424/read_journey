'use client';

import FiltersForm, {
  FiltersFormPropsType,
} from '@/app/components/filters-form';

export default function AddBook() {
  return <FiltersForm type={FiltersFormPropsType.LIBRARY} />;
}
