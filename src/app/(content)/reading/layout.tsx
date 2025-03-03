export interface LayoutProps {
  start: React.ReactNode;
  current: React.ReactNode;
}

export default function Layout({ start, current }: LayoutProps) {
  return (
    <>
      <section className="mb-[10px]">{start}</section>
      <section>{current}</section>
    </>
  );
}
