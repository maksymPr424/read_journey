export interface LayoutProps {
  library: React.ReactNode;
  addBook: React.ReactNode;
  recLib: React.ReactNode;
}

export default function Layout({ library, addBook, recLib }: LayoutProps) {
  return (
    <section className="xl:flex xl:gap-4">
      <div className="rounded-[30px] bg-lightDark overflow-hidden p-5 pb-10 flex flex-col gap-5 md:flex-row md:gap-8 xl:flex-col xl:gap-[78px] xl:pb-5">
        {addBook}
        {recLib}
      </div>
      {library}
    </section>
  );
}
