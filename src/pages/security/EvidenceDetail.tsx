import { useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Download, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EvidenceItem {
  slug: string;
  name: string;
  version: string;
  date: string;
  sha256: string;
  access: "Public" | "Private";
  summary?: string;
  fileBlob?: string;
}

const EvidenceDetail = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const version = searchParams.get('v') || 'v1.0';
  const [evidence, setEvidence] = useState<EvidenceItem | null>(null);

  const seededData: EvidenceItem[] = [
    {
      slug: "soc2-roadmap",
      name: "SOC 2 Roadmap",
      version: "v0.3",
      date: new Date().toISOString().split('T')[0],
      sha256: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
      access: "Private",
      summary: "Our roadmap and timeline for achieving SOC 2 Type II compliance. This document outlines our current security posture, identified gaps, remediation timeline, and target completion dates for all required controls."
    },
    {
      slug: "iso27001-policy-index",
      name: "ISO 27001 Policy Index",
      version: "v0.1", 
      date: "2024-12-01",
      sha256: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1",
      access: "Private",
      summary: "Comprehensive index of information security policies aligned with ISO 27001 framework. Includes policy ownership, review schedules, and current implementation status across all domains."
    },
    {
      slug: "bcp-dr-overview",
      name: "BCP/DR Overview",
      version: "v0.2",
      date: "2024-11-15",
      sha256: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2",
      access: "Public",
      summary: "Business Continuity and Disaster Recovery planning overview and procedures. Details our incident response framework, backup strategies, recovery time objectives, and regular testing protocols."
    },
    {
      slug: "vapt-summary",
      name: "VAPT Summary",
      version: "v0.1",
      date: "2024-10-30",
      sha256: "d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2c3",
      access: "Private",
      summary: "Vulnerability Assessment and Penetration Testing summary report. Executive summary of findings, risk ratings, remediation status, and compliance with security frameworks."
    }
  ];

  useEffect(() => {
    // Find evidence item by slug and version
    let foundItem = seededData.find(item => item.slug === slug && item.version === version);
    
    if (!foundItem) {
      // Check localStorage for user-uploaded items
      const localData = localStorage.getItem('security_evidence_v1');
      if (localData) {
        const localItems = JSON.parse(localData);
        foundItem = localItems.find((item: EvidenceItem) => item.slug === slug && item.version === version);
      }
    }
    
    setEvidence(foundItem || null);
  }, [slug, version]);

  const handleAction = () => {
    if (!evidence) return;
    
    if (evidence.access === "Public") {
      if (evidence.fileBlob) {
        // Download uploaded file
        const link = document.createElement('a');
        link.href = evidence.fileBlob;
        link.download = `${evidence.name} ${evidence.version}.pdf`;
        link.click();
      } else {
        // Open print route for seeded public items
        window.open(`/security/evidence/print/${evidence.slug}`, '_blank');
      }
    } else {
      // Request access
      window.open(`/contact?subject=Security%20pack%20request`, '_blank');
    }
  };

  if (!evidence) {
    return (
      <main className="min-h-screen pt-24">
        <div className="container mx-auto px-6 max-w-screen-xl py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-text mb-4">Evidence Not Found</h1>
            <p className="text-muted mb-8">The requested evidence document could not be found.</p>
            <Button asChild>
              <a href="/security#evidence">← Back to Evidence Locker</a>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>{evidence.name} {evidence.version} - YourCo Treasury</title>
        <meta name="description" content={evidence.summary} />
      </Helmet>

      {/* Breadcrumb */}
      <section className="py-4 bg-surface border-b border-border">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <nav className="text-sm">
            <a href="/security" className="text-muted hover:text-text">Security</a>
            <span className="mx-2 text-muted">/</span>
            <a href="/security#evidence" className="text-muted hover:text-text">Evidence</a>
            <span className="mx-2 text-muted">/</span>
            <span className="text-text">{evidence.name}</span>
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-6 max-w-screen-xl py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded-card p-8 shadow-md">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-text mb-2 font-display">
                  {evidence.name}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted">
                  <span>Version: {evidence.version}</span>
                  <span>Date: {new Date(evidence.date).toLocaleDateString()}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    evidence.access === "Public" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {evidence.access}
                  </span>
                </div>
              </div>
              
              <Button
                onClick={handleAction}
                data-analytics={evidence.access === "Public" ? "evidence_download" : "evidence_request"}
                data-doc={evidence.slug}
              >
                {evidence.access === "Public" ? (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Request Access
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-text mb-2">SHA256 Hash</h3>
                <code className="block p-3 bg-surface rounded-card text-xs font-mono break-all">
                  {evidence.sha256}
                </code>
              </div>

              {evidence.summary && (
                <div>
                  <h3 className="text-lg font-semibold text-text mb-2">Summary</h3>
                  <p className="text-muted leading-relaxed">
                    {evidence.summary}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  onClick={handleAction}
                  data-analytics={evidence.access === "Public" ? "evidence_download" : "evidence_request"}
                  data-doc={evidence.slug}
                >
                  {evidence.access === "Public" ? (
                    <>
                      <Download className="w-4 h-4 mr-2" />
                      Download Document
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Request Access
                    </>
                  )}
                </Button>
                
                <Button variant="outline" asChild>
                  <a href="/security#evidence">← Back to Evidence Locker</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EvidenceDetail;