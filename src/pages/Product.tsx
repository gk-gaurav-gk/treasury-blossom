import { Button } from "@/components/ui/button";

const Product = () => {
  return (
    <main className="min-h-screen pt-24">
      {/* Hero/Header */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center space-y-8">
            <h1 id="workflow" className="text-4xl md:text-5xl font-bold text-text font-display">
              Platform overview
            </h1>
            <h2 className="text-2xl font-semibold text-muted font-display">
              KYC → Escrow → Invest → Reconcile
            </h2>
            
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
              >
                Start onboarding
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor Sections */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl space-y-16">
          {/* KYC Section */}
          <div id="kyc" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">KYC & Roles</h2>
            <p className="text-muted">
              Complete entity onboarding with role-based access controls and compliance documentation.
            </p>
          </div>

          {/* Escrow Section */}
          <div id="escrow" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">Fund Escrow</h2>
            <p className="text-muted">
              Secure virtual escrow accounts with multiple funding options and verification processes.
            </p>
          </div>

          {/* Invest Section */}
          <div id="invest" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">Investment Management</h2>
            <p className="text-muted">
              Browse and invest in government securities and high-grade debt instruments with dual approvals.
            </p>
          </div>

          {/* Report Section */}
          <div id="report" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">Reports & Reconciliation</h2>
            <p className="text-muted">
              Comprehensive reporting suite with contract notes, tax documents, and audit trails.
            </p>
          </div>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="py-8 bg-bg border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} YourCo Treasury. 
            <a href="/legal" className="ml-2 hover:text-text underline">
              Legal
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Product;