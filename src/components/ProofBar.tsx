import { BadgePill } from "./BadgePill";
import { Shield, CheckCircle } from "lucide-react";

export const ProofBar = () => {
  const partnerLogos = [
    "HDFC Bank",
    "ICICI Securities", 
    "Axis Trustee",
    "KPMG India",
    "BSE",
  ];

  return (
    <section className="py-12 bg-surface">
      <div className="container mx-auto px-6">
        {/* Partner Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
          {partnerLogos.map((logo, index) => (
            <div 
              key={index}
              className="text-muted hover:text-text transition-colors font-medium text-sm opacity-60 hover:opacity-100"
            >
              {logo}
            </div>
          ))}
          
          {/* Compliance Badge */}
          <div className="flex items-center gap-2 ml-8 pl-8 border-l border-border">
            <BadgePill variant="default">
              <Shield className="w-3 h-3 mr-1" />
              Compliance-first; registration in progress
            </BadgePill>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <p className="text-xs text-muted mb-2">
            *not a solicitation; see{" "}
            <a href="/#disclaimer" className="underline hover:text-text">
              disclosures
            </a>
          </p>
          
          <a 
            href="/security" 
            className="inline-flex items-center text-sm text-primary hover:text-primary-600 font-medium underline underline-offset-4"
          >
            <CheckCircle className="w-3 h-3 mr-1" />
            Disaster-recovery & BCP
          </a>
        </div>
      </div>
    </section>
  );
};