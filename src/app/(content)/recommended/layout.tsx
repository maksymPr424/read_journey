export interface LayoutProps {
  filters: React.ReactNode;
  recommended: React.ReactNode;
}

export default function Layout({ filters, recommended }: LayoutProps) {
  return (
    <div className="xl:flex xl:gap-4">
      {filters}
      {recommended}
    </div>
  );
}
