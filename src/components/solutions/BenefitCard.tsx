import { LucideIcon } from "lucide-react";

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const BenefitCard = ({ icon: Icon, title, description }: BenefitCardProps) => {
  return (
    <div className="bg-card border border-border rounded-card p-6 shadow-md text-center">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      
      <h3 className="text-lg font-semibold text-text mb-3">
        {title}
      </h3>
      
      <p className="text-muted">
        {description}
      </p>
    </div>
  );
};