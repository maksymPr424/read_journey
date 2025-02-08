// 'use client';

import CustomImage from './components/custom-image';
import Icon from './components/icon';
import LogRegForm from './components/log-reg-form';
import phone from '../../public/images/phone.png';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="m-auto m:max-w-[375px] p-[20px]">
      <div className="rounded-[30px] bg-lightDark overflow-hidden p-5 pb-10 h-[411px] flex flex-col">
        <Link href="/">
          <Icon id="icon-Logo" className="w-[42px] h-[17px] mb-[40px] " />
        </Link>

        <h1 className="text-[32px] font-bold mb-[20px] mt-0 leading-8">
          Expand your mind, reading{' '}
          <span className="text-grayPercent">a book</span>
        </h1>
        <LogRegForm />
      </div>
      <div className="mt-4 pt-5 px-10 rounded-[30px] bg-lightDark overflow-hidden">
        <CustomImage src={phone} alt="Recommended books" className="h-full" />
      </div>
    </section>
  );
}
