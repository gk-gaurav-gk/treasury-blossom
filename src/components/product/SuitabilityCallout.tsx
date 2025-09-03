import { AlertCircle } from "lucide-react";

export const SuitabilityCallout = () => {
  return (
    <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-text mb-1">Suitability check</h4>
          <p className="text-sm text-muted">
            Orders must satisfy policy limits on issuer rating, tenor caps, and concentration.
          </p>
        </div>
      </div>
    </div>
  );
};