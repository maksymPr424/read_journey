'use client';

import { ErrorMessage, Form, Formik } from 'formik';
import InputField from './input-field';
import TransButton from './trans-button';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../providers';
import { useState } from 'react';
import {
  addToLibraryValidationSchema,
} from '@/utils/validationSchemas';
import { addBook, getRecommended, LibraryBookCredentials, RecommendCredentials } from '@/lib/requests';

const RecInitialValues = {
  title: '',
  author: '',
};
const LibInitialValues = {
  title: '',
  author: '',
  totalPages: 0,
};

const initRecommendedInfo = {
  totalPages: 1,
  page: 1,
  perPage: 9,
};

export interface SubmitValues {
  title: string;
  author: string;
  totalPages?: number;
}

export enum FiltersFormPropsType {
  RECOMMENDED = 'RECOMMENDED',
  LIBRARY = 'LIBRARY',
}

export interface FiltersFormProps {
  type: FiltersFormPropsType;
}

export default function FiltersForm({ type }: FiltersFormProps) {
  const [recommendedInfo, setRecommendedInfo] = useState(initRecommendedInfo);

  const initialValues =
    type === FiltersFormPropsType.RECOMMENDED
      ? RecInitialValues
      : LibInitialValues;

  const mutationRec = useMutation({
    mutationFn: getRecommended,
    onSuccess: (data: RecommendCredentials) => {
      
      queryClient.setQueryData(['recommend'], data);

      setRecommendedInfo({
        totalPages: data.totalPages,
        page: data.page + 1,
        perPage: data.perPage,
      });
    },
    onError: () => {
      alert('Error!');
    },
  });

  const mutationLib = useMutation({
    mutationFn: addBook,
    onSuccess: (data: LibraryBookCredentials) => {
      const currentBooks =
        queryClient.getQueryData<LibraryBookCredentials[]>(['books']) || [];

      const updatedBooks = [...currentBooks, data];
      queryClient.setQueryData(['books'], updatedBooks);

      console.log(
        queryClient.getQueryData<LibraryBookCredentials[]>(['books']),
      );
    },
    onError: () => {
      alert('Error!');
    },
  });

  const handleSubmitFilters = (values: SubmitValues) => {
    if (type === FiltersFormPropsType.RECOMMENDED) {
      console.log(123);

      mutationRec.mutate({
        ...values,
        page: recommendedInfo.page,
        limit: recommendedInfo.perPage,
      });
    } else {
      console.log(321);

      mutationLib.mutate({
        ...values,
      });
    }
  };

  return (
    <>
      <p className="text-xs ml-[14px] mb-2">Filters:</p>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitFilters}
        validationSchema={
          type === FiltersFormPropsType.LIBRARY && addToLibraryValidationSchema
        }
      >
        <Form className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <InputField
                label="Book title"
                id="title"
                name="title"
                validate={type === FiltersFormPropsType.LIBRARY ? true : false}
              />
              <ErrorMessage
                name="title"
                component="p"
                className="text-red-500 text-xs absolute bottom-[-16px] left-3.5"
              />
            </div>
            <div className="relative">
              <InputField
                label="The author"
                id="author"
                name="author"
                validate={type === FiltersFormPropsType.LIBRARY ? true : false}
              />
              <ErrorMessage
                name="author"
                component="p"
                className="text-red-500 text-xs absolute bottom-[-16px] left-3.5"
              />
            </div>
            {type === FiltersFormPropsType.LIBRARY && (
              <div className="relative">
                <InputField
                  label="Pages number"
                  id="totalPages"
                  name="totalPages"
                  type="number"
                  validate={true}
                />
                <ErrorMessage
                  name="totalPages"
                  component="p"
                  className="text-red-500 text-xs absolute bottom-[-16px] left-3.5"
                />
              </div>
            )}
          </div>
          <div className="max-w-max">
            <TransButton type="submit">To apply</TransButton>
          </div>
        </Form>
      </Formik>
    </>
  );
}
