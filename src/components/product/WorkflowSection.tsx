import { ShieldCheck, Banknote, HandCoins, FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowStepper } from "./WorkflowStepper";

export const WorkflowSection = () => {
  const steps = [
    {
      icon: ShieldCheck,
      title: "KYC & Roles",
      description: "Entity KYC (CIN, PAN, GSTIN), UBO checks, e-sign, and role setup (Owner/Approver/Preparer/Auditor).",
    },
    {
      icon: Banknote,
      title: "Fund Escrow",
      description: "Virtual escrow account, penny-drop bank verify, UPI/RTGS/NEFT, e-mandate for recurring sweeps.",
    },
    {
      icon: HandCoins,
      title: "Invest (Maker-Checker)",
      description: "Browse T-Bills, G-Secs, high-grade debt; suitability gates; dual approval by thresholds.",
    },
    {
      icon: FileBarChart,
      title: "Report & Reconcile",
      description: "Contract notes, TDS & interest statements, board-pack PDFs, ERP-ready exports.",
    },
  ];

  return (
    <section id="workflow" className="py-16 bg-bg scroll-mt-32">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4 font-display">
            How it works
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            A compliant flow your finance team can audit end-to-end.
          </p>
        </div>

        <WorkflowStepper steps={steps} />

        <div className="text-center mt-8">
          <Button variant="ghost" asChild>
            <a href="/instruments">
              See instruments →
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};