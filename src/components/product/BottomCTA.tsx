import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export const BottomCTA = () => {
  const { openLoginModal } = useAuth();
  return (
    <section className="py-16 bg-surface">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="bg-gradient-brand p-1 rounded-card max-w-4xl mx-auto">
          <div className="bg-bg rounded-card p-8 text-center">
            <h2 className="text-2xl font-bold text-text mb-6 font-display">
              Ready to upgrade your treasury?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="solid" 
                size="lg"
                data-analytics="cta_demo"
              >
                Book a 20-min demo
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                data-analytics="cta_onboarding"
                onClick={openLoginModal}
              >
                Start onboarding
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};