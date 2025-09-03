interface Maturity {
  tenor: number;
  amount: number;
  interest: number;
  total: number;
  maturityDate: string;
}

interface MaturityListProps {
  maturities: Maturity[];
}

export const MaturityList = ({ maturities }: MaturityListProps) => {
  return (
    <div className="space-y-3">
      {maturities.map((maturity, index) => (
        <div key={index} className="flex justify-between items-center p-3 bg-surface rounded-md border border-border">
          <div>
            <p className="font-medium text-text">Day {maturity.tenor}</p>
            <p className="text-sm text-muted">{maturity.maturityDate}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-text">₹{maturity.total.toLocaleString()}</p>
            <p className="text-sm text-muted">
              ₹{maturity.amount.toLocaleString()} + ₹{maturity.interest.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};