import { Card } from "@/components/Card";
import { FileText } from "lucide-react";

interface ReportCardProps {
  title: string;
  description: string;
}

export const ReportCard = ({ title, description }: ReportCardProps) => {
  return (
    <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
        <FileText className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-semibold text-text mb-3 font-display">
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed">
        {description}
      </p>
    </Card>
  );
};