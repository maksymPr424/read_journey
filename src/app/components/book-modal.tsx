'use client';

import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import CustomIcon from './custom-icon';
import CustomImage from './custom-image';
import Modal from './modal';
import TransButton from './trans-button';
import { queryClient } from '../providers';
import { useState } from 'react';
import LikeImg from '../../../public/images/like.png';
import {
  addBookById,
  getOwnBook,
  LibraryBookCredentials,
} from '@/lib/requests';
import InformModal from './inform-modal';
import { toast } from 'sonner';

export interface BookModalProps {
  isOpen: boolean;
  handleCloseMenu: () => void;
  imageUrl: string;
  title: string;
  author: string;
  totalPages: number;
  _id: string;
}

export default function BookModal({
  isOpen,
  handleCloseMenu,
  imageUrl,
  title,
  author,
  totalPages,
  _id,
}: BookModalProps) {
  const [successAdd, setSuccessAdd] = useState(false);

  const handleCloseInfoModal = () => {
    setSuccessAdd(false);
  };
  const handleOpenInfoModal = () => {
    setSuccessAdd(true);
  };

  const { data } = useSuspenseQuery({
    queryKey: ['own'],
    queryFn: getOwnBook,
    staleTime: 60 * 60 * 1000,
  });

  const mutationLib = useMutation({
    mutationFn: addBookById,
    onSuccess: (data: LibraryBookCredentials) => {
      const currentBooks =
        queryClient.getQueryData<LibraryBookCredentials[]>(['own']) || [];

      const updatedBooks = [...currentBooks, data];
      queryClient.setQueryData(['own'], updatedBooks);
      handleOpenInfoModal();
    },
    onError: () => {
      toast.error('Error adding book, please retry');
    },
  });

  const handleAddToLibrary = () => {
    toast.info('Adding a book...');

    const alreadyAdd = data.filter(
      (book: LibraryBookCredentials) =>
        book.title === title && book.author === author,
    );

    if (alreadyAdd.length !== 0) {
      console.log('Це ж було вже');

      handleCloseMenu();
      handleOpenInfoModal();
      return;
    }

    mutationLib.mutate({ _id });
    console.log(_id);
    handleCloseMenu();
  };

  return (
    <>
      <Modal
        show={isOpen}
        onClose={handleCloseMenu}
        className="mx-auto max-[375px]:w-[280px] min-[375px]:w-[335px] bg-gray rounded-xl pt-4 px-4 pb-10 z-[1]"
      >
        <button
          onClick={handleCloseMenu}
          className="max-w-max ml-auto mb-[2px] text-right block"
        >
          <CustomIcon id="icon-menu-open" className="w-7 h-7" />
        </button>
        <div className="text-center">
          <CustomImage
            src={imageUrl}
            alt="Book image"
            className="w-[138px] h-[208px] bg-cover bg-no-repeat rounded-lg mx-auto mb-4"
            width={140}
            height={213}
          />
          <h3 className="text-bolt text-sm mb-[2px]">{title}</h3>
          <p className="text-lightGray text-xs mt-1">{author}</p>
          <p className="text-[10px] mb-5">{totalPages}</p>
          <TransButton onClick={handleAddToLibrary}>Add to library</TransButton>
        </div>
      </Modal>
      <InformModal
        isOpenInfoModal={successAdd}
        handleCloseInfoModal={handleCloseInfoModal}
        Image={LikeImg}
        Title="Good job"
      >
        <>
          Your book is now in{' '}
          <span className="text-foreground">the library!</span> The joy knows no
          bounds and now you can start your training
        </>
      </InformModal>
    </>
  );
}
