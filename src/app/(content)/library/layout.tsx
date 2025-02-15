export interface LayoutProps {
  children: React.ReactNode;
  addBook: React.ReactNode;
  recLib: React.ReactNode;
}

export default function Layout({ children, addBook, recLib }: LayoutProps) {
  return (
    <section>
      <div className="rounded-[30px] bg-lightDark overflow-hidden p-5 pb-10 flex flex-col gap-5">
        {addBook}
        {recLib}
      </div>
      {children}
    </section>
  );
}
