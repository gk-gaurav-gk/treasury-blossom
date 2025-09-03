import { ArrowRight } from "lucide-react";

interface ArchitectureStep {
  title: string;
  description: string;
}

interface ArchitectureCardProps {
  steps: ArchitectureStep[];
}

export const ArchitectureCard = ({ steps }: ArchitectureCardProps) => {
  return (
    <div className="bg-card border border-border rounded-card p-8 shadow-md">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                <span className="text-lg font-bold text-primary">{index + 1}</span>
              </div>
              <h4 className="font-semibold text-text mb-1 text-sm">{step.title}</h4>
              <p className="text-xs text-muted max-w-20">{step.description}</p>
            </div>
            
            {index < steps.length - 1 && (
              <ArrowRight className="w-6 h-6 text-muted mx-4 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};