'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Header from '../header';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  // const { data: user } = useSuspenseQuery({
  //   queryKey: ['user'],
  //   queryFn: getCurrent,
  //   staleTime: 60 * 60 * 1000,
  // });

  // useEffect(() => {
  //   if (Object.keys(user).length === 0) {
  //     router.push('/login');
  //   }
  // }, [user, router]);

  return (
    <>
      <Header />
      <main className="max-w-[335px] mx-auto">{children}</main>
    </>
  );
}
