import { LucideIcon } from "lucide-react";
import { Card } from "./Card";

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  step: string;
  index: number;
}

export const StepCard = ({ icon: Icon, title, description, link, step, index }: StepCardProps) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      {/* Step Number */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center">
        <span className="text-white text-sm font-semibold">{index}</span>
      </div>

      {/* Icon */}
      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>

      {/* Content */}
      <h3 className="font-semibold text-text mb-3 font-display">
        {title}
      </h3>
      
      <p className="text-sm text-muted mb-4 leading-relaxed">
        {description}
      </p>

      {/* Link */}
      <a
        href={link}
        className="text-sm font-medium text-primary hover:text-primary-600 underline underline-offset-2"
        data-analytics="howitworks_step"
        data-step={step}
      >
        Learn more →
      </a>
    </Card>
  );
};