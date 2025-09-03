import { Card } from "@/components/Card";

interface FeatureCardProps {
  title: string;
  description: string;
}

export const FeatureCard = ({ title, description }: FeatureCardProps) => {
  return (
    <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <h3 className="font-semibold text-text mb-3 font-display">
        {title}
      </h3>
      <p className="text-muted text-sm leading-relaxed">
        {description}
      </p>
    </Card>
  );
};