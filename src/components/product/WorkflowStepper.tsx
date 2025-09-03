import { LucideIcon } from "lucide-react";
import { Card } from "@/components/Card";

interface StepProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface WorkflowStepperProps {
  steps: StepProps[];
}

export const WorkflowStepper = ({ steps }: WorkflowStepperProps) => {
  return (
    <Card variant="elevated" className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="relative">
              {/* Connector line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-6 left-full w-8 h-0.5 bg-border transform translate-x-4 z-0" />
              )}
              
              <div className="relative z-10">
                {/* Step number and icon */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">{index + 1}</span>
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="font-semibold text-text mb-2 font-display">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};