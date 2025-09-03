import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";

interface GrievanceRecord {
  ticketId: string;
  complainantName: string;
  entityName: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  submittedAt: string;
  timeline: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
}

const GrievancePrint = () => {
  const { ticketId } = useParams();
  const [grievance, setGrievance] = useState<GrievanceRecord | null>(null);

  useEffect(() => {
    // Find the grievance record
    const grievances = JSON.parse(localStorage.getItem('grievances_v1') || '[]');
    const found = grievances.find((g: GrievanceRecord) => g.ticketId === ticketId);
    setGrievance(found || null);
    
    // Auto-open print dialog
    if (found) {
      window.print();
    }
  }, [ticketId]);

  if (!grievance) {
    return (
      <div className="print-document">
        <h1>Complaint Not Found</h1>
        <p>The requested complaint acknowledgement could not be found.</p>
      </div>
    );
  }

  return (
    <div className="print-document">
      <Helmet>
        <title>Complaint Acknowledgement {grievance.ticketId} - YourCo Treasury</title>
        <link rel="canonical" href={`/compliance/grievance/${grievance.ticketId}`} />
      </Helmet>

      {/* Print Header */}
      <header className="print-header">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">YourCo Treasury</h1>
            <p className="text-sm text-muted">Complaint Acknowledgement</p>
          </div>
          <div className="text-right text-sm text-muted">
            <p>Generated: {new Date().toLocaleDateString()}</p>
            <p>Ticket: {grievance.ticketId}</p>
          </div>
        </div>
      </header>

      {/* Online Link (hidden in print) */}
      <div className="online-only mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm">
          <a href={`/compliance/grievance/${grievance.ticketId}`} className="text-blue-600 hover:underline">
            View online → /compliance/grievance/{grievance.ticketId}
          </a>
        </p>
      </div>

      {/* Document Content */}
      <main className="document-content">
        <h1 className="text-3xl font-bold mb-6">Complaint Acknowledgement</h1>
        
        <div className="mb-8">
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-medium bg-gray-50">Ticket ID</td>
                <td className="border border-gray-300 p-3 font-mono">{grievance.ticketId}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium bg-gray-50">Complainant</td>
                <td className="border border-gray-300 p-3">{grievance.complainantName}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium bg-gray-50">Entity</td>
                <td className="border border-gray-300 p-3">{grievance.entityName || 'N/A'}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium bg-gray-50">Category</td>
                <td className="border border-gray-300 p-3">{grievance.category}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium bg-gray-50">Submitted</td>
                <td className="border border-gray-300 p-3">{new Date(grievance.submittedAt).toLocaleString()}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium bg-gray-50">Email</td>
                <td className="border border-gray-300 p-3">{grievance.email}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Complaint Description</h2>
          <div className="p-4 border border-gray-300 rounded">
            <p>{grievance.description}</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Status Timeline</h2>
          <div className="space-y-3">
            {grievance.timeline.map((item, index) => (
              <div key={index} className="p-3 border border-gray-300 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{item.status}</span>
                  <span className="text-sm text-gray-600">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                </div>
                {item.note && (
                  <p className="text-sm bg-gray-50 p-2 rounded">{item.note}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Resolution Timeline</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Initial acknowledgment: Within 48 hours</li>
            <li>Target resolution: 15 working days</li>
            <li>Updates provided as investigation progresses</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="p-4 border border-gray-300 rounded">
            <p><strong>Grievance Officer:</strong> grievance@yourco.example</p>
            <p><strong>Phone:</strong> +91-XXXX-XXXX-XX</p>
            <p><strong>SCORES Portal:</strong> https://scores.gov.in</p>
          </div>
        </section>

        <section className="mb-8">
          <div className="p-4 bg-gray-100 border border-gray-300 rounded">
            <p className="text-sm">
              <strong>Note:</strong> This acknowledgement confirms receipt of your complaint. 
              We are committed to resolving your concerns promptly and fairly. 
              You will receive updates on the progress of your complaint via email.
            </p>
          </div>
        </section>
      </main>

      {/* Print Footer */}
      <footer className="print-footer">
        <div className="text-center text-sm text-muted mt-8">
          <p>YourCo Treasury - Complaint Acknowledgement - Page <span className="page-number"></span></p>
        </div>
      </footer>

      {/* Watermark */}
      <div className="watermark">COMPLAINT ACKNOWLEDGEMENT</div>
    </div>
  );
};

export default GrievancePrint;