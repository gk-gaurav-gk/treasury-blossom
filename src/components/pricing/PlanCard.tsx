import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PlanCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  transactionFee: string;
  buttonText: string;
  buttonVariant: "default" | "outline" | "solid";
  isPopular?: boolean;
  onButtonClick: () => void;
  planType: "starter" | "growth" | "enterprise";
}

export const PlanCard = ({
  name,
  price,
  period,
  description,
  features,
  transactionFee,
  buttonText,
  buttonVariant,
  isPopular = false,
  onButtonClick,
  planType
}: PlanCardProps) => {
  return (
    <div className={cn(
      "relative bg-card border border-border rounded-card p-8 shadow-md",
      isPopular && "border-primary shadow-lg"
    )}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-text mb-2">{name}</h3>
        <div className="mb-2">
          <span className="text-3xl font-bold text-text">{price}</span>
          <span className="text-muted">{period}</span>
        </div>
        <p className="text-muted text-sm">{description}</p>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-muted mb-2">Transaction fee:</p>
        <p className="font-semibold text-text">{transactionFee}</p>
      </div>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="text-text text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        variant={buttonVariant}
        size="lg"
        className="w-full"
        onClick={onButtonClick}
        data-analytics="pricing_plan_click"
        data-plan={planType}
      >
        {buttonText}
      </Button>
    </div>
  );
};