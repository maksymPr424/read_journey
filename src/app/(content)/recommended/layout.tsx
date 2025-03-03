export interface LayoutProps {
  filters: React.ReactNode;
  recommended: React.ReactNode;
}

export default function Layout({ filters, recommended }: LayoutProps) {
  return (
    <>
      {filters}
      {recommended}
    </>
  );
}
