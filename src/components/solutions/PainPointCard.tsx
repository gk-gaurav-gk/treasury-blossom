import { LucideIcon } from "lucide-react";

interface PainPointCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const PainPointCard = ({ icon: Icon, title, description }: PainPointCardProps) => {
  return (
    <div className="bg-card border border-border rounded-card p-6 shadow-md text-center">
      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-red-600" />
      </div>
      
      <h3 className="text-lg font-semibold text-text mb-2">
        {title}
      </h3>
      
      <p className="text-muted text-sm">
        {description}
      </p>
    </div>
  );
};