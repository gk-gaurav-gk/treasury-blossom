import { Check } from "lucide-react";

interface JTBDListProps {
  items: string[];
}

export const JTBDList = ({ items }: JTBDListProps) => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-card border border-border rounded-card">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Check className="w-4 h-4 text-primary" />
            </div>
            <span className="text-text font-medium">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};