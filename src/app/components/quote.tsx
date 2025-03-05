'use client';
import Book from '../../../public/images/book.png';
import CustomImage from './custom-image';

export default function Quote() {
  return (
    <div className="hidden xl:flex xl:gap-[14px] xl:px-5 xl:py-4 xl:bg-gray xl:rounded-xl xl:justify-between xl:items-center">
      <CustomImage src={Book} alt="Book icon" className="w-10 h-10 flex-grow" />
      <p className="text-lightGray xl:text-sm xl:max-w-[219px]">
        &quot;Books are <span className="text-foreground">windows</span> to the
        world, and reading is a journey into the unknown.&quot;
      </p>
    </div>
  );
}
