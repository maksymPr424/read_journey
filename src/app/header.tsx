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
import { toast } from 'sonner';

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
    onSettled() {
      toast.success(`Success logout`);
      queryClient.clear();
      router.push('/login');
    },
  });

  const handleLogOut = () => {
    mutation.mutate();
  };

  return (
    <header className="flex items-center justify-between p-5 bg-lightDark rounded-2xl mb-[10px] max-w-[335px] mx-auto md:max-w-[704px] md:p-4">
      <Link href="/">
        <button
          onClick={() => handleCloseMenu()}
          className="xl:flex xl:items-center xl:gap-1"
        >
          <CustomIcon id="icon-Logo" className="w-[42px] h-[17px]" />
          <p className="hidden xl:block uppercase text-lg">read journey</p>
        </button>
      </Link>
      <div className="hidden md:flex md:gap-[94px] md:items-center">
        <div className="md:flex md:gap-8 md:items-center">
          <Link
            href="/recommended"
            className={clsx(
              'text-sm md:text-base',
              pathname.includes('recommended')
                ? 'text-foreground'
                : 'text-lightGray',
              pathname.includes('recommended') &&
                'relative before:content-[""] before:absolute before:bottom-[-4] before:w-full before:h-[3px] before:bg-blue before:rounded-lg',
            )}
          >
            <button onClick={() => handleCloseMenu()}>Home</button>
          </Link>
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
        </div>
        <div className="flex gap-4 items-center">
          <RoundedContent className="w-[35px] h-[35px] border-lightGray bg-gray text-base font-bolt md:w-10 md:h-10">
            I
          </RoundedContent>
          <TransButton onClick={handleLogOut}>Log out</TransButton>
        </div>
      </div>

      <div className="flex items-center gap-[10px] md:hidden">
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
                  'text-sm relative transition-colors duration-200 ',
                  pathname.includes('recommended')
                    ? 'text-foreground'
                    : 'text-lightGray',
                  (pathname.includes('recommended') ||
                    'hover:text-foreground') &&
                    'before:content-[""] before:absolute before:bottom-[-4px] before:w-full before:h-[3px] before:rounded-lg',
                  pathname.includes('recommended')
                    ? 'before:bg-blue'
                    : 'before:bg-transparent hover:before:bg-blue before:transition-all before:duration-200',
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
