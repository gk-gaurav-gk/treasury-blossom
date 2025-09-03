import { LucideIcon } from "lucide-react";

interface SecurityPillarCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SecurityPillarCard = ({ icon: Icon, title, description }: SecurityPillarCardProps) => {
  return (
    <div className="bg-card border border-border rounded-card p-6 shadow-md">
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      
      <h3 className="text-lg font-semibold text-text mb-3">
        {title}
      </h3>
      
      <p className="text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
};