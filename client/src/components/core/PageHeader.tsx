interface PageHeaderProps {
  title: string;
  description: string;
}

export const PageHeader = ({ title, description }: PageHeaderProps) => (
  <>
    <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
    <h2 className="text-sm md:text-lg font-light text-muted-foreground">{description}</h2>
  </>
);
