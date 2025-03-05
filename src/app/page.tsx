'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // router.push('/login');
  }, [router]);

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <h1 className="text-3xl text-center max-w-[230px] md:max-w-full">
        Welcome to Read Journey
      </h1>
    </div>
  );
}
