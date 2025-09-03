interface PartnerStep {
  title: string;
  description: string;
}

interface PartnerStepperProps {
  steps: PartnerStep[];
}

export const PartnerStepper = ({ steps }: PartnerStepperProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="text-center">
            <div className="relative">
              {/* Step Number */}
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">{index + 1}</span>
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-border transform translate-x-6"></div>
              )}
            </div>
            
            <h3 className="font-semibold text-text mb-2">
              {step.title}
            </h3>
            
            <p className="text-muted text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};