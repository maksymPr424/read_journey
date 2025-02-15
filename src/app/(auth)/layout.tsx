'use client';

import Link from 'next/link';
import CustomImage from '../components/custom-image';
import phone from '../../../public/images/phone.png';
import QueryProvider, { queryClient } from '../providers';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import CustomIcon from '../components/custom-icon';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  useEffect(() => {
    console.log(queryClient.getQueryData(['user']));

    if (queryClient.getQueryData(['user']) !== undefined) {
      router.push('/recommended');
    }
  }, [router]);

  return (
    <QueryProvider>
      <section className="m-auto m:max-w-[375px] p-5">
        <div className="rounded-[30px] bg-lightDark overflow-hidden p-5 pb-10 h-[470px] max-[375px]:h-[500px] flex flex-col">
          <Link href="/">
            <CustomIcon
              id="icon-Logo"
              className="w-[42px] h-[17px] mb-[40px] "
            />
          </Link>

          <h1 className="text-[32px] font-bold mb-[20px] mt-0 leading-8">
            Expand your mind, reading{' '}
            <span className="text-grayPercent">a book</span>
          </h1>
          {children}
        </div>
        <div className="mt-4 pt-5 px-10 rounded-[30px] bg-lightDark overflow-hidden">
          <CustomImage src={phone} alt="Recommended books" className="h-full" />
        </div>
      </section>
    </QueryProvider>
  );
}
