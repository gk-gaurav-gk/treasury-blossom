import { FileText } from "lucide-react";

interface PolicyCardProps {
  title: string;
  items: string[];
}

export const PolicyCard = ({ title, items }: PolicyCardProps) => {
  return (
    <div className="bg-card border border-border rounded-card p-6 shadow-md">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-text">
          {title}
        </h3>
      </div>
      
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-muted text-sm flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};