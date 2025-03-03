'use client';

import CustomImage from './custom-image';
import Sun from '../../../public/images/sun.png';

export default function NoProgress() {
  return (
    <div className="md:max-w-[305px]">
      <h3 className="text-bolt text-lg mb-[14px] md:text-xl">Progress</h3>
      <p className="text-lightGray text-[13px] md:text-sm mb-5 md:mb-[50px]">
        Here you will see when and how much you read. To record, click on the
        red button above.
      </p>
      <div className="flex items-center justify-center p-6 md:px-6 md:py-5 bg-gray rounded-full max-w-max mx-auto">
        <CustomImage
          src={Sun}
          alt="Sun image"
          className="w-8 h-8 md:w-[70px] md:h-[70px]"
        />
      </div>
    </div>
  );
}
