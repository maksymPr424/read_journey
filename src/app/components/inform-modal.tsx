'use client';

import CustomIcon from './custom-icon';
import CustomImage from './custom-image';
import Modal from './modal';
import { StaticImageData } from 'next/image';

export interface InformModalProps {
  isOpenInfoModal: boolean;
  handleCloseInfoModal: () => void;
  Image: string | StaticImageData;
  Title: string;
  children: React.ReactNode;
}

export default function InformModal({
  isOpenInfoModal,
  handleCloseInfoModal,
  Image,
  Title,
  children,
}: InformModalProps) {
  return (
    <>
      <Modal
        show={isOpenInfoModal}
        onClose={handleCloseInfoModal}
        className="mx-auto max-[375px]:w-[280px] min-[375px]:w-[335px] bg-gray rounded-xl pt-4 px-3 pb-[60px]"
      >
        <button
          onClick={handleCloseInfoModal}
          className="max-w-max ml-auto mb-[2px] text-right block"
        >
          <CustomIcon id="icon-menu-open" className="w-7 h-7" />
        </button>
        <div className="mt-[22px] text-center mx-auto w-[242px]">
            <CustomImage
              src={Image}
              alt="Info modal image"
              className="w-[50px] h-[50px] mx-auto"
            />
          <h3 className="text-bolt text-lg mb-[10px]  mt-5">{Title}</h3>
          <p className="text-lightGray text-sm">{children}</p>
        </div>
      </Modal>
    </>
  );
}
