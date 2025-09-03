import { Helmet } from "react-helmet-async";
import { TrendingDown, FileX, AlertTriangle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PainPointCard } from "@/components/solutions/PainPointCard";
import { JTBDList } from "@/components/solutions/JTBDList";
import { ArchitectureCard } from "@/components/solutions/ArchitectureCard";
import { ROICalcMini } from "@/components/solutions/ROICalcMini";
import { PolicyCard } from "@/components/solutions/PolicyCard";

const SMETreasury = () => {
  const painPoints = [
    {
      icon: TrendingDown,
      title: "Idle cash drag",
      description: "Cash earning below 4% while inflation runs higher"
    },
    {
      icon: FileX,
      title: "Manual reconciliations", 
      description: "Hours spent on spreadsheet-based treasury tracking"
    },
    {
      icon: AlertTriangle,
      title: "Approval risk",
      description: "Single-person treasury decisions without proper controls"
    },
    {
      icon: BarChart3,
      title: "Ad-hoc reporting",
      description: "No systematic board-level treasury reporting"
    }
  ];

  const jtbdItems = [
    "Segment operating/reserve/strategic cash buckets",
    "Set tenor and credit rating caps per policy",
    "Automate cash sweeps into laddered positions",
    "Generate board-pack reports every month",
    "Implement maker-checker for large transactions",
    "Track compliance with investment policy limits"
  ];

  const architectureSteps = [
    { title: "KYC & Roles", description: "Entity onboarding with role-based access" },
    { title: "Escrow", description: "Segregated client fund accounts" },
    { title: "Marketplace", description: "Compliant instrument selection" },
    { title: "Maker-Checker", description: "Approval workflows and controls" },
    { title: "Reporting", description: "Automated board packs and analytics" }
  ];

  const policies = [
    {
      title: "Conservative Policy",
      items: [
        "Min rating: Sovereign/AAA only",
        "Max tenor: 365 days",
        "Max concentration: 25% per issuer",
        "Liquidity buffer: 30% in <90 days"
      ]
    },
    {
      title: "Balanced Policy", 
      items: [
        "Min rating: AA+ and above",
        "Max tenor: 3 years",
        "Max concentration: 40% per issuer",
        "Liquidity buffer: 20% in <90 days"
      ]
    },
    {
      title: "Treasury Ladder Policy",
      items: [
        "Systematic laddering required",
        "Equal weight across tenors",
        "Monthly maturity scheduling",
        "Reinvestment at prevailing rates"
      ]
    }
  ];

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>SME Treasury Solutions - YourCo Treasury</title>
        <meta name="description" content="Policy-aligned cash ladders, maker-checker controls, and board-ready reporting for SME treasury management." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-display">
              SME Treasury
            </h1>
            <p className="text-xl text-muted mb-8">
              Policy-aligned cash ladders, maker-checker controls, and board-ready reporting.
            </p>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Common Treasury Challenges
            </h2>
            <p className="text-muted">Issues that drain value from your cash management</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((point, index) => (
              <PainPointCard key={index} {...point} />
            ))}
          </div>
        </div>
      </section>

      {/* Jobs to be Done */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              What You Need to Accomplish
            </h2>
            <p className="text-muted">Essential treasury management tasks for growing SMEs</p>
          </div>
          
          <JTBDList items={jtbdItems} />
        </div>
      </section>

      {/* Solution Architecture */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              How It Works
            </h2>
            <p className="text-muted">End-to-end treasury workflow with built-in controls</p>
          </div>
          
          <ArchitectureCard steps={architectureSteps} />
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Quick ROI Check
            </h2>
            <p className="text-muted">See if the yield advantage covers platform fees</p>
          </div>
          
          <ROICalcMini />
        </div>
      </section>

      {/* Policy Templates */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Policy Templates
            </h2>
            <p className="text-muted">Pre-configured investment policies to get started quickly</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <PolicyCard key={index} {...policy} />
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Proven Results
            </h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-card p-8 shadow-md">
              <h3 className="text-xl font-semibold text-text mb-4">
                Case Study: XYZ Pvt Ltd
              </h3>
              <p className="text-muted mb-4">
                Manufacturing company implemented systematic 60-day ladders for working capital reserves, achieving consistent 7.1% returns while maintaining required liquidity.
              </p>
              <Button variant="outline" asChild>
                <a href="/resources/xyz-60day-ladder-case">
                  Read full case study →
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-brand">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="bg-bg rounded-card p-8 text-center">
            <h2 className="text-2xl font-bold text-text mb-6 font-display">
              Ready to optimize your treasury?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="solid" 
                size="lg"
                data-analytics="solutions_sme_cta"
                data-action="demo"
                asChild
              >
                <a href="/contact">Book a 20-min demo</a>
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                data-analytics="solutions_sme_cta"
                data-action="boardpack"
              >
                Download sample board pack
              </Button>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "SME Treasury",
          "provider": {
            "@type": "Organization",
            "name": "YourCo Treasury"
          },
          "areaServed": {
            "@type": "AdministrativeArea",
            "name": "India"
          },
          "audience": {
            "@type": "BusinessAudience", 
            "name": "SMEs"
          },
          "description": "Policy-aligned cash ladders, maker-checker controls, and board-ready reporting for SME treasury management."
        })}
      </script>
    </main>
  );
};

export default SMETreasury;