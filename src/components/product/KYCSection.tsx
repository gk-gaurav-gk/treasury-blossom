import { Check } from "lucide-react";
import { BadgePill } from "@/components/BadgePill";
import { Checklist } from "./Checklist";
import { RolesMatrixTable } from "./RolesMatrixTable";

export const KYCSection = () => {
  const checklistItems = [
    "COI, MoA/AoA or LLP Deed",
    "Board Resolution / POA",
    "PAN & address proof for entity and UBOs",
    "Sanctions/PEP screening",
    "CKYC fetch (where applicable)",
  ];

  const badges = ["CIN", "PAN", "GSTIN", "UBO", "FATCA/CRS"];

  return (
    <section id="kyc" className="py-16 bg-surface scroll-mt-32">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-text mb-6 font-display">
                KYC built for entities
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                Support for Pvt Ltd, LLP, Partnership, Trust, and Proprietorship. Collect and validate CIN, PAN, GSTIN, registered address, bank details, UBO KYC, FATCA/CRS. Generate consent receipts and maintain purpose-limitation logs.
              </p>
            </div>

            <Checklist items={checklistItems} />

            <div className="space-y-4">
              <p className="text-sm font-medium text-text">Compliance badges:</p>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <BadgePill key={badge} variant="default">
                    {badge}
                  </BadgePill>
                ))}
              </div>
            </div>

            <div>
              <a
                href="/compliance"
                className="text-primary hover:text-primary-600 font-medium underline underline-offset-2"
              >
                Read our compliance approach →
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <RolesMatrixTable />
          </div>
        </div>
      </div>
    </section>
  );
};