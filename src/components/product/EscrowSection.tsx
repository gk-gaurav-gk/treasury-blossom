import { FeatureCard } from "./FeatureCard";
import { ReconTableMock } from "./ReconTableMock";

export const EscrowSection = () => {
  const features = [
    {
      title: "Virtual accounts",
      description: "One account per entity with source tagging and audit trails.",
    },
    {
      title: "Automatic reconciliation",
      description: "Bank feeds match credits to orders; exceptions flagged.",
    },
    {
      title: "SIP/e-mandate",
      description: "Automate idle-cash deployment by policy.",
    },
  ];

  return (
    <section id="escrow" className="py-16 bg-bg scroll-mt-32">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-text mb-6 font-display">
              Escrow that reconciles itself
            </h2>
            <p className="text-muted max-w-3xl mx-auto leading-relaxed">
              Each client receives a virtual escrow account. Funds arrive via UPI/RTGS/NEFT with instant credit attribution. Penny-drop validation confirms bank ownership. e-mandate (e-NACH) supports recurring sweeps from operating accounts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text font-display">
              Reconciliation snapshot
            </h3>
            <ReconTableMock />
            <p className="text-sm text-muted">
              Escrow bank and auditor details appear on contract notes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};