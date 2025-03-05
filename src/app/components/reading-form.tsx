'use client';

import { ErrorMessage, Form, Formik, FormikValues } from 'formik';
import InputField from './input-field';
import { getReadingValidationSchema } from '@/utils/validationSchemas';
import TransButton from './trans-button';
import { useMutation } from '@tanstack/react-query';
import {
  finishReading,
  LibraryBookCredentials,
  startReading,
} from '@/lib/requests';
import { queryClient } from '../providers';
import { useEffect, useState } from 'react';
import Book from '../../../public/images/book.png';
import InformModal from './inform-modal';

export enum ReadingFormType {
  START = 'START',
  STOP = 'STOP',
}

export interface readingFormProps {
  type: ReadingFormType;
  id: string;
  currentPageNum: number;
  totalPageNum: number;
}

export default function ReadingForm({
  type,
  id,
  currentPageNum,
  totalPageNum,
}: readingFormProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const initialValues = {
    page: currentPage,
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    
    if (currentPageNum === totalPageNum) {
      handleOpenMenu();
    } else {
      handleCloseModal()
    }
    setCurrentPage(currentPageNum);
  }, [currentPageNum, totalPageNum]);

  const mutation = useMutation({
    mutationFn: type === ReadingFormType.START ? startReading : finishReading,
    onSuccess: (data: LibraryBookCredentials) => {
      queryClient.setQueryData(['book'], data);

      const currentOwnBooks: LibraryBookCredentials[] | undefined =
        queryClient.getQueryData(['own']);

      if (!currentOwnBooks) return;

      const updatedOwnBook = currentOwnBooks.map(
        (book: LibraryBookCredentials) => {
          if (book._id === data._id) {
            return data;
          }
          return book;
        },
      );

      queryClient.setQueryData(['own'], updatedOwnBook);
    },
  });

  const handleSubmit = (values: FormikValues) => {
    if (values.page === totalPageNum && type === ReadingFormType.STOP) {
      handleOpenMenu();
    }
    mutation.mutate({ page: values.page, id });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={getReadingValidationSchema({
          currentPage,
          totalPages: totalPageNum,
        })}
      >
        <Form className="mb-10">
          <div className="mb-5">
            <label htmlFor="page" className="text-[10px] md:text-sm ml-[14px] mb-2 ">
              {type === ReadingFormType.START ? 'Start page:' : 'Stop page:'}
            </label>
            <div className="relative">
              <InputField
                label="Page number"
                id="page"
                name="page"
                type="number"
                validate={currentPageNum === totalPageNum ? false : true}
              />
              {currentPageNum === totalPageNum ? null : (
                <ErrorMessage
                  name="page"
                  component="p"
                  className="text-red-500 text-xs absolute bottom-[-16px] left-3.5"
                />
              )}
            </div>
          </div>
          <TransButton
            type="submit"
            disabled={currentPageNum === totalPageNum ? true : false}
          >
            {type === ReadingFormType.START ? 'To start' : 'To stop'}
          </TransButton>
        </Form>
      </Formik>
      <InformModal
        isOpenInfoModal={isOpen}
        handleCloseInfoModal={handleCloseModal}
        Image={Book}
        Title="The book is read"
      >
        <>
          It was an <span className="text-foreground">exciting journey</span>,
          where each page revealed new horizons, and the characters became
          inseparable friends.
        </>
      </InformModal>
    </>
  );
}
