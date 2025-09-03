import { ShieldCheck, Banknote, HandCoins, FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StepCard } from "./StepCard";

export const HowItWorksSection = () => {
  const steps = [
    {
      icon: ShieldCheck,
      title: "KYC & Roles",
      description: "Entity KYC (CIN, PAN, GSTIN) with Owner/Approver/Preparer/Auditor roles. e-sign and consent receipts built-in.",
      link: "/product#kyc",
      step: "kyc"
    },
    {
      icon: Banknote,
      title: "Fund Escrow",
      description: "Virtual escrow account. UPI/RTGS/NEFT instructions, penny-drop verification, SIP/e-mandate for sweeps.",
      link: "/product#escrow",
      step: "escrow"
    },
    {
      icon: HandCoins,
      title: "Invest (Maker-Checker)",
      description: "Browse T-Bills, G-Secs, high-grade debt. Suitability checks and dual approvals by threshold.",
      link: "/product#invest",
      step: "invest"
    },
    {
      icon: FileBarChart,
      title: "Report & Reconcile",
      description: "Contract notes, TDS, board-pack PDFs, ERP-ready exports, audit trail.",
      link: "/product#report",
      step: "report"
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-surface">
      <div className="container mx-auto px-6 max-w-screen-xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted mb-3 uppercase tracking-wide">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 font-display">
            From onboarding to board-ready reports
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A compliant flow your finance team can audit end-to-end.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <StepCard
              key={step.step}
              icon={step.icon}
              title={step.title}
              description={step.description}
              link={step.link}
              step={step.step}
              index={index + 1}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="ghost" asChild>
            <a href="/product#workflow">
              See full workflow →
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};