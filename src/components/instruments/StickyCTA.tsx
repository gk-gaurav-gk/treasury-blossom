import { Button } from "@/components/ui/button";
import type { Instrument } from "@/data/instruments";
import { useAuth } from "@/contexts/AuthContext";

interface StickyCTAProps {
  instrument: Instrument;
}

export const StickyCTA = ({ instrument }: StickyCTAProps) => {
  const { openLoginModal } = useAuth();
  return (
    <div className="lg:sticky lg:top-32">
      <div className="bg-bg rounded-card p-6 shadow-md border border-border">
        <h3 className="font-semibold text-text mb-4 font-display">
          Interested in {instrument.name}?
        </h3>
        
        <div className="space-y-3 mb-6">
          <Button 
            variant="solid" 
            size="lg" 
            className="w-full"
            data-analytics="instrument_cta"
            data-action="contact"
            asChild
          >
            <a href="/contact">Talk to us</a>
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg" 
            className="w-full"
            data-analytics="instrument_cta"
            data-action="onboarding"
            onClick={openLoginModal}
          >
            Start onboarding
          </Button>
        </div>
        
        <p className="text-xs text-muted text-center">
          Yields are indicative; availability at order time.
        </p>
      </div>
    </div>
  );
};