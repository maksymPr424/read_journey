export interface LayoutProps {
  children: React.ReactNode;
  start: React.ReactNode;
  current: React.ReactNode;
}

export default function Layout({ children, start, current }: LayoutProps) {
  return (
    <>
      {children}
      <div className="mb-[10px]">{start}</div>
      <div>{current}</div>
    </>
  );
}
