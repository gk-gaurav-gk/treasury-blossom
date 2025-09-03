interface ResultCardProps {
  title: string;
  children: React.ReactNode;
}

export const ResultCard = ({ title, children }: ResultCardProps) => {
  return (
    <div className="bg-card border border-border rounded-card p-6 shadow-md">
      <h3 className="text-lg font-semibold text-text mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
};