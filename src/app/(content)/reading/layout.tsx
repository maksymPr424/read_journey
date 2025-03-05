export interface LayoutProps {
  start: React.ReactNode;
  current: React.ReactNode;
}

export default function Layout({ start, current }: LayoutProps) {
  return (
    <div className="xl:flex xl:gap-4">
      <section className="mb-[10px] xl:mb-0">{start}</section>
      <section className="xl:flex-grow">{current}</section>
    </div>
  );
}
