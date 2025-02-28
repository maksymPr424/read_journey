'use client';

import Modal from '@/app/components/modal';
import TransButton from '@/app/components/trans-button';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import CustomIcon from './components/custom-icon';
import RoundedContent from './components/rounded-content';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from './providers';
import { logOut } from '@/lib/auth';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const pathname = usePathname();

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const mutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      queryClient.clear();
      router.push('/login');
    },
    onError: () => {
      queryClient.clear();
      router.push('/login');
    },
  });

  const handleLogOut = () => {
    mutation.mutate();
  };

  return (
    <header className="flex items-center justify-between p-5 bg-lightDark rounded-2xl mb-[10px] max-w-[335px] mx-auto">
      <Link href="/">
        <button onClick={() => handleCloseMenu()}>
          <CustomIcon id="icon-Logo" className="w-[42px] h-[17px]" />
        </button>
      </Link>
      <div className="flex items-center gap-[10px]">
        <RoundedContent className="w-[35px] h-[35px] border-lightGray bg-gray text-base font-bolt">
          I
        </RoundedContent>
        <button onClick={handleOpenMenu}>
          <CustomIcon id="icon-menu-close" className="w-7 h-7" />
        </button>
        <Modal
          show={isOpen}
          onClose={handleCloseMenu}
          className="flex justify-between flex-col ml-auto bg-gray h-full z-[1] pt-[34px] pb-10 px-10 w-[200px]"
        >
          <button onClick={handleCloseMenu} className="max-w-max ml-auto">
            <CustomIcon id="icon-menu-open" className="w-7 h-7" />
          </button>
          <ul className="flex flex-col gap-5 max-w-max   mx-auto">
            <li>
              <Link
                href="/recommended"
                className={clsx(
                  'text-sm',
                  pathname.includes('recommended')
                    ? 'text-foreground'
                    : 'text-lightGray',
                  pathname.includes('recommended') &&
                    'relative before:content-[""] before:absolute before:bottom-[-4] before:w-full before:h-[3px] before:bg-blue before:rounded-lg',
                )}
              >
                <button onClick={() => handleCloseMenu()}>Home</button>
              </Link>
            </li>
            <li>
              <Link
                href="/library"
                className={clsx(
                  'text-sm',
                  pathname.includes('library')
                    ? 'text-foreground'
                    : 'text-lightGray',
                  pathname.includes('library') &&
                    'relative before:content-[""] before:absolute before:bottom-[-4] before:w-full before:h-[3px] before:bg-blue before:rounded-lg',
                )}
              >
                <button onClick={() => handleCloseMenu()}>My library</button>
              </Link>
            </li>
          </ul>
          <TransButton onClick={handleLogOut}>Log out</TransButton>
        </Modal>
      </div>
    </header>
  );
}
