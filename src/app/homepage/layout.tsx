export interface LayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export default function Layout({ children, header }: LayoutProps) {
  return (
    <>
      {header}
      <main>{children}</main>
    </>
  );
}
