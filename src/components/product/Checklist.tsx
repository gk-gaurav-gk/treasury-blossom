import { Check } from "lucide-react";

interface ChecklistProps {
  items: string[];
}

export const Checklist = ({ items }: ChecklistProps) => {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
            <Check className="w-3 h-3 text-white" />
          </div>
          <span className="text-text">{item}</span>
        </div>
      ))}
    </div>
  );
};