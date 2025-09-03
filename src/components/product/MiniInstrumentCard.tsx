import { Card } from "@/components/Card";

interface MiniInstrumentCardProps {
  name: string;
  yieldValue: string;
  rating: string;
}

export const MiniInstrumentCard = ({ name, yieldValue, rating }: MiniInstrumentCardProps) => {
  return (
    <Card className="p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="space-y-2">
        <h3 className="font-semibold text-text text-sm">{name}</h3>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted">{rating}</span>
          <span className="text-sm font-medium text-primary">{yieldValue}</span>
        </div>
      </div>
    </Card>
  );
};