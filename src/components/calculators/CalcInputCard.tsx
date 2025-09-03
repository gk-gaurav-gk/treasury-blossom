interface CalcInputCardProps {
  title: string;
  children: React.ReactNode;
}

export const CalcInputCard = ({ title, children }: CalcInputCardProps) => {
  return (
    <div className="bg-card border border-border rounded-card p-6 shadow-md">
      <h3 className="text-lg font-semibold text-text mb-6">
        {title}
      </h3>
      {children}
    </div>
  );
};