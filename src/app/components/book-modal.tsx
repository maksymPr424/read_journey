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
  const [alreadyAdd, setAlreadyAdd] = useState(false);

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

      console.log(
        queryClient.getQueryData<LibraryBookCredentials[]>(['books']),
      );
    },
    onError: () => {
      alert('Error!');
    },
  });

  const handleAddToLibrary = () => {
    const isAlreadyAdd = data.find(
      (book: LibraryBookCredentials) => book._id === _id,
    );

    console.log(isAlreadyAdd);

    if (isAlreadyAdd !== undefined) {
      console.log('Це ж було вже');

      setAlreadyAdd(true);
      handleOpenInfoModal();
      return;
    }

    setAlreadyAdd(false);
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
      <Modal
        show={successAdd}
        onClose={handleCloseInfoModal}
        className="mx-auto max-[375px]:w-[280px] min-[375px]:w-[335px] bg-gray rounded-xl pt-4 px-3 pb-[60px]"
      >
        <button
          onClick={handleCloseInfoModal}
          className="max-w-max ml-auto mb-[2px] text-right block"
        >
          <CustomIcon id="icon-menu-open" className="w-7 h-7" />
        </button>
        <div className="mt-[22px] text-center mx-auto">
          <CustomImage
            src={LikeImg}
            alt="Success image"
            className="w-13 h-13"
          />
          <h3 className="text-bolt text-lg mb-[10px]  mt-5">Good job</h3>
          <p className="text-lightGray text-sm">
            Your book is now in{' '}
            <span className="text-foreground">the library!</span> The joy knows
            no bounds and now you can start your training
          </p>
        </div>
      </Modal>
    </>
  );
}
