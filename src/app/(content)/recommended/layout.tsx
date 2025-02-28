export interface LayoutProps {
  filters: React.ReactNode;
  children: React.ReactNode;
}

export default function Layout({ filters, children }: LayoutProps) {
  return (
    <section>
      {filters}
      {children}
    </section>
  );
}
