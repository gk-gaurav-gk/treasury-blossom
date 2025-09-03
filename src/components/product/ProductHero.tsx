import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export const ProductHero = () => {
  const { openLoginModal } = useAuth();
  return (
    <section className="py-16 bg-bg">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="text-center space-y-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted">
            <a href="/" className="hover:text-text">Home</a>
            <span className="mx-2">/</span>
            <span>Product</span>
          </nav>
          
          <h1 className="text-4xl md:text-5xl font-bold text-text font-display">
            Platform overview
          </h1>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-muted font-display">
              KYC → Escrow → Invest → Reconcile
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Built for finance teams that need audit-ready controls and reports.
            </p>
          </div>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="solid" 
              size="lg"
              data-analytics="cta_demo"
            >
              Book a 20-min demo
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              data-analytics="cta_onboarding"
              onClick={openLoginModal}
            >
              Start onboarding
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};