import { useState, useEffect } from "react";
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

export const EvidenceLocker = () => {
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);

  const seededData: EvidenceItem[] = [
    {
      slug: "soc2-roadmap",
      name: "SOC 2 Roadmap",
      version: "v0.3",
      date: new Date().toISOString().split('T')[0],
      sha256: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
      access: "Private",
      summary: "Our roadmap and timeline for achieving SOC 2 Type II compliance."
    },
    {
      slug: "iso27001-policy-index",
      name: "ISO 27001 Policy Index",
      version: "v0.1", 
      date: "2024-12-01",
      sha256: "b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1",
      access: "Private",
      summary: "Index of information security policies aligned with ISO 27001 framework."
    },
    {
      slug: "bcp-dr-overview",
      name: "BCP/DR Overview",
      version: "v0.2",
      date: "2024-11-15",
      sha256: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2",
      access: "Public",
      summary: "Business Continuity and Disaster Recovery planning overview and procedures."
    },
    {
      slug: "vapt-summary",
      name: "VAPT Summary",
      version: "v0.1",
      date: "2024-10-30",
      sha256: "d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2c3",
      access: "Private",
      summary: "Vulnerability Assessment and Penetration Testing summary report."
    }
  ];

  useEffect(() => {
    // Merge seeded data with localStorage
    const localData = localStorage.getItem('security_evidence_v1');
    let merged = [...seededData];
    
    if (localData) {
      const localItems = JSON.parse(localData);
      // Local items override by slug+version
      localItems.forEach((localItem: EvidenceItem) => {
        const existingIndex = merged.findIndex(
          item => item.slug === localItem.slug && item.version === localItem.version
        );
        if (existingIndex >= 0) {
          merged[existingIndex] = localItem;
        } else {
          merged.push(localItem);
        }
      });
    }
    
    setEvidence(merged);
  }, []);

  const handleAction = (item: EvidenceItem) => {
    if (item.access === "Public") {
      if (item.fileBlob) {
        // Download uploaded file
        const link = document.createElement('a');
        link.href = item.fileBlob;
        link.download = `${item.name} ${item.version}.pdf`;
        link.click();
      } else {
        // Open print route for seeded public items
        window.open(`/security/evidence/print/${item.slug}`, '_blank');
      }
    } else {
      // Request access
      window.open(`/contact?subject=Security%20pack%20request`, '_blank');
    }
  };

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
  };

  return (
    <div className="bg-card border border-border rounded-card shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="text-left p-4 font-semibold text-text">Document</th>
              <th className="text-left p-4 font-semibold text-text">Version</th>
              <th className="text-left p-4 font-semibold text-text">Date</th>
              <th className="text-left p-4 font-semibold text-text">SHA256</th>
              <th className="text-center p-4 font-semibold text-text">Access</th>
              <th className="text-center p-4 font-semibold text-text">Action</th>
            </tr>
          </thead>
          <tbody>
            {evidence.map((item, index) => (
              <tr key={`${item.slug}-${item.version}`} className="border-t border-border">
                <td className="p-4">
                  <a 
                    href={`/security/evidence/${item.slug}?v=${item.version}`}
                    className="text-text font-medium hover:text-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </td>
                <td className="p-4 text-muted font-mono text-sm">{item.version}</td>
                <td className="p-4 text-muted">{new Date(item.date).toLocaleDateString()}</td>
                <td className="p-4 text-muted font-mono text-xs">{truncateHash(item.sha256)}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.access === "Public" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {item.access}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAction(item)}
                    data-analytics="evidence_download"
                    data-doc={item.slug}
                  >
                    {item.access === "Public" ? (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Request access
                      </>
                    )}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};