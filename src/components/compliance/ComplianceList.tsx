import { FileText, Shield, AlertTriangle, Lock, Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ComplianceList = () => {
  const sections = [
    {
      icon: Users,
      title: "KYC / KYB",
      content: [
        "Entities supported: Pvt Ltd, LLP, Partnership, Trust, Proprietorship",
        "Documents: COI, MoA/AoA/LLP Deed, Board Resolution/POA, UBO KYC",
        "PAN & address proofs, FATCA/CRS",
        "CKYC where applicable"
      ]
    },
    {
      icon: Shield,
      title: "Suitability & Risk",
      content: [
        "Policy gates: min credit rating, tenor caps, concentration limits",
        "Maker-checker thresholds",
        "Risk profiling and assessment"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Disclosures",
      content: [
        "Indicative yields subject to market availability",
        "Credit, market, and liquidity risk disclosures",
        "Tax treatment caveats",
        "Order-time disclosures and contract notes"
      ]
    },
    {
      icon: Lock,
      title: "Data & Privacy",
      content: [
        "Purpose limitation for data collection and use",
        "Retention policies and deletion requests",
        "See full Privacy Policy for details"
      ]
    },
    {
      icon: FileText,
      title: "Grievance Redressal",
      content: [
        "Named officer: compliance@yourco.example",
        "Phone: +91-XXXX-XXXX-XX",
        "Initial acknowledgment: 48 hours",
        "Resolution: 15 working days",
        "SCORES escalation available"
      ]
    }
  ];

  const policies = [
    { name: "Risk Disclosure", format: "PDF" },
    { name: "Terms of Use", format: "PDF" },
    { name: "Privacy Policy", format: "PDF" }
  ];

  return (
    <div className="space-y-12">
      {/* Compliance Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        {sections.map((section, index) => (
          <div key={index} className="bg-card border border-border rounded-card p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text">
                {section.title}
              </h3>
            </div>
            
            <ul className="space-y-2">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex} className="text-muted text-sm leading-relaxed">
                  • {item}
                </li>
              ))}
            </ul>
            
            {section.title === "Data & Privacy" && (
              <div className="mt-4">
                <Button variant="outline" size="sm" asChild>
                  <a href="/legal/privacy">View Privacy Policy</a>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Policies Downloads */}
      <div className="bg-surface rounded-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <Download className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-semibold text-text">
            Policy Documents
          </h3>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-4">
          {policies.map((policy, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start"
              data-analytics="compliance_policy_download"
              data-policy={policy.name.toLowerCase().replace(/\s+/g, '_')}
            >
              <FileText className="w-4 h-4 mr-2" />
              {policy.name} ({policy.format})
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};