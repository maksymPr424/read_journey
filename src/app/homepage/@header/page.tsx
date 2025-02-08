'use client';

import Icon from '@/app/components/icon';
import Modal from '@/app/components/modal';
import TransButton from '@/app/components/trans-button';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const handleOpenMenu = () => {
    setIsOpen(true);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleLogOut = () => {
    console.log('Log out');
  };

  return (
    <header className="flex items-center justify-between p-5 bg-lightDark rounded-2xl">
      <Link href="/">
        <Icon id="icon-Logo" className="w-[42px] h-[17px]" />
      </Link>
      <div className="flex items-center gap-[10px]">
        <span className="w-[35px] h-[35px] rounded-full bg-gray border border-lightGray flex items-center justify-center text-base font-bolt ">
          I
        </span>
        <button onClick={handleOpenMenu}>
          <Icon id="icon-menu-close" className="w-7 h-7" />
        </button>
        <Modal
          show={isOpen}
          onClose={handleCloseMenu}
          className="flex justify-between flex-col ml-auto bg-gray h-full z-[1] pt-[34px] pb-10 px-10 w-[200px]"
        >
          <button onClick={handleCloseMenu} className="max-w-max ml-auto">
            <Icon id="icon-menu-open" className="w-7 h-7" />
          </button>
          <ul className="flex flex-col gap-5 max-w-max   mx-auto">
            <li>
              <Link
                href="/homepage"
                className={clsx(
                  'text-lightGray',
                  pathname.includes('homepage') &&
                    'text-foreground text-sm relative before:content-[""] before:absolute before:bottom-[-4] before:w-full before:h-[3px] before:bg-blue before:rounded-lg',
                )}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/my-library"
                className={clsx(
                  'text-lightGray',
                  pathname.includes('my-library') &&
                    'text-foreground text-sm relative before:content-[""] before:absolute before:bottom-[-4] before:w-full before:h-[3px] before:bg-blue before:rounded-lg',
                )}
              >
                My library
              </Link>
            </li>
          </ul>
          <TransButton onClick={handleLogOut}>Log out</TransButton>
        </Modal>
      </div>
    </header>
  );
}
