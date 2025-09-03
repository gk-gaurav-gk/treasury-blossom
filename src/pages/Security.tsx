import { Helmet } from "react-helmet-async";
import { Shield, Lock, Server, Eye, Bug, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SecurityPillarCard } from "@/components/security/SecurityPillarCard";
import { EvidenceLocker } from "@/components/security/EvidenceLocker";

const Security = () => {
  const pillars = [
    {
      icon: Users,
      title: "Product Security",
      description: "2FA/TOTP, device binding, session limits, RBAC, maker-checker approvals."
    },
    {
      icon: Lock,
      title: "Data Protection", 
      description: "Encryption in transit (TLS 1.2+), at rest (AES-256), key management with a secrets vault."
    },
    {
      icon: Server,
      title: "Infrastructure",
      description: "Cloud isolation, hardened images, WAF/CDN, backups, disaster recovery & BCP."
    },
    {
      icon: Eye,
      title: "Monitoring",
      description: "SIEM, anomaly detection, immutable audit logs, alerting."
    },
    {
      icon: Bug,
      title: "Vulnerability Management",
      description: "Regular scans, coordinated disclosure."
    },
    {
      icon: Shield,
      title: "Access Governance",
      description: "Least privilege, quarterly reviews, SSO for enterprise."
    }
  ];

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>Security - YourCo Treasury</title>
        <meta name="description" content="Defense-in-depth security for SME treasury data with enterprise-grade controls and monitoring." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-display">
              Security
            </h1>
            <p className="text-xl text-muted">
              Defense-in-depth for SME treasury data.
            </p>
          </div>
        </div>
      </section>

      {/* Security Pillars */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <SecurityPillarCard
                key={index}
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Locker */}
      <section id="evidence" className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Evidence Locker
            </h2>
            <p className="text-muted">
              Versioned security and compliance documents. Some items may require a request.
            </p>
          </div>
          
          <EvidenceLocker />
        </div>
      </section>

      {/* Compliance & Certifications */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-6 font-display">
              Compliance & Certifications
            </h2>
            <p className="text-muted mb-8 max-w-2xl mx-auto">
              SOC 2 / ISO 27001 roadmap; vendor due-diligence pack available on request.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              data-analytics="security_request_pack"
              asChild
            >
              <a href="/contact">Request security pack</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Security Contact & Reporting */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-card p-8">
              <h3 className="text-xl font-semibold text-text mb-4">
                Security Contact & Reporting
              </h3>
              <div className="space-y-4">
                <p className="text-muted">
                  <strong>Email:</strong> security@yourco.example
                </p>
                <p className="text-muted">
                  <strong>Response time:</strong> 24–48h initial response
                </p>
                <p className="text-muted">
                  For coordinated disclosure details, see{" "}
                  <a href="/legal#security.txt" className="text-primary hover:underline">
                    /legal#security.txt
                  </a>
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-primary/10 rounded-card">
                <p className="text-sm text-text">
                  For broader compliance questions, visit our{" "}
                  <a href="/compliance" className="text-primary hover:underline font-medium">
                    compliance page
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer disclaimer */}
      <section className="py-8 bg-bg border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted text-sm">
            We continuously improve controls; details may evolve.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Security;