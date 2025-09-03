import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

interface EvidenceItem {
  slug: string;
  name: string;
  version: string;
  date: string;
  sha256: string;
  access: "Public" | "Private";
  summary?: string;
}

const EvidencePrint = () => {
  const { slug } = useParams();
  const [evidence, setEvidence] = useState<EvidenceItem | null>(null);

  const seededData: EvidenceItem[] = [
    {
      slug: "bcp-dr-overview",
      name: "BCP/DR Overview",
      version: "v0.2",
      date: "2024-11-15",
      sha256: "c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a1b2",
      access: "Public",
      summary: "Business Continuity and Disaster Recovery planning overview and procedures. Details our incident response framework, backup strategies, recovery time objectives, and regular testing protocols."
    }
  ];

  useEffect(() => {
    // Find the public evidence item
    const foundItem = seededData.find(item => item.slug === slug && item.access === "Public");
    setEvidence(foundItem || null);
    
    // Auto-open print dialog
    if (foundItem) {
      window.print();
    }
  }, [slug]);

  if (!evidence) {
    return (
      <div className="print-document">
        <h1>Document Not Found</h1>
        <p>The requested evidence document could not be found or is not publicly available.</p>
      </div>
    );
  }

  return (
    <div className="print-document">
      <Helmet>
        <title>{evidence.name} - YourCo Treasury</title>
        <link rel="canonical" href={`/security/evidence/${evidence.slug}?v=${evidence.version}`} />
      </Helmet>

      {/* Print Header */}
      <header className="print-header">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">YourCo Treasury</h1>
            <p className="text-sm text-muted">Security Evidence</p>
          </div>
          <div className="text-right text-sm text-muted">
            <p>Generated: {new Date().toLocaleDateString()}</p>
            <p>yourco.treasury.example/security/evidence/{evidence.slug}</p>
          </div>
        </div>
      </header>

      {/* Online Link (hidden in print) */}
      <div className="online-only mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm">
          <a href={`/security/evidence/${evidence.slug}?v=${evidence.version}`} className="text-blue-600 hover:underline">
            View online → /security/evidence/{evidence.slug}
          </a>
        </p>
      </div>

      {/* Document Content */}
      <main className="document-content">
        <h1 className="text-3xl font-bold mb-6">{evidence.name}</h1>
        
        <div className="mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-medium bg-gray-50">Version</td>
                <td className="border border-gray-300 p-3">{evidence.version}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium bg-gray-50">Date</td>
                <td className="border border-gray-300 p-3">{new Date(evidence.date).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium bg-gray-50">SHA256</td>
                <td className="border border-gray-300 p-3 font-mono text-xs break-all">{evidence.sha256}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium bg-gray-50">Access Level</td>
                <td className="border border-gray-300 p-3">{evidence.access}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <p className="mb-4">
            {evidence.summary}
          </p>
        </section>

        <section className="mb-8">
          <div className="p-6 bg-gray-100 border border-gray-300 rounded text-center">
            <h3 className="text-lg font-semibold mb-2">This is a placeholder</h3>
            <p className="text-gray-600">
              Full document content would be displayed here in the actual implementation.
              This print view serves as a document summary and verification page.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Document Verification</h2>
          <p className="mb-4">
            This document can be verified by comparing the SHA256 hash above with the original file.
            For questions about document authenticity, contact security@yourco.example.
          </p>
        </section>
      </main>

      {/* Print Footer */}
      <footer className="print-footer">
        <div className="text-center text-sm text-muted mt-8">
          <p>YourCo Treasury - {evidence.name} - Page <span className="page-number"></span></p>
        </div>
      </footer>

      {/* Watermark */}
      <div className="watermark">INFORMATIONAL – NOT ADVICE</div>
    </div>
  );
};

export default EvidencePrint;