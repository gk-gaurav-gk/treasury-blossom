import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PrintTerms = () => {
  useEffect(() => {
    // Auto-open print dialog
    window.print();
  }, []);

  return (
    <div className="print-document">
      <Helmet>
        <title>Terms of Service - YourCo Treasury</title>
        <link rel="canonical" href="/legal#terms" />
      </Helmet>

      {/* Print Header */}
      <header className="print-header">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">YourCo Treasury</h1>
            <p className="text-sm text-muted">Terms of Service</p>
          </div>
          <div className="text-right text-sm text-muted">
            <p>Last updated: January 1, 2024</p>
            <p>yourco.treasury.example/legal#terms</p>
          </div>
        </div>
      </header>

      {/* Online Link (hidden in print) */}
      <div className="online-only mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm">
          <a href="/legal#terms" className="text-blue-600 hover:underline">
            View online → /legal#terms
          </a>
        </p>
      </div>

      {/* Document Content */}
      <main className="document-content">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using YourCo Treasury ("we," "us," or "our") services, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and YourCo Treasury.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Description of Service</h2>
          <p className="mb-4">
            YourCo Treasury provides a platform for SME treasury management, including access to fixed-income instruments, portfolio management tools, and reporting capabilities. Our services are designed to help businesses optimize their cash management and investment strategies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. User Accounts</h2>
          <p className="mb-4">
            You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Compliance and Regulatory</h2>
          <p className="mb-4">
            Our services are subject to applicable securities laws and regulations in India. Users must comply with all applicable laws, regulations, and our compliance requirements. We reserve the right to suspend or terminate accounts that violate regulatory requirements.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Risk Disclosures</h2>
          <p className="mb-4">
            All investments carry risk of loss. You acknowledge that you have read and understood our Risk Disclosure document, which forms part of these terms. Past performance does not guarantee future results.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Fees and Charges</h2>
          <p className="mb-4">
            We may charge fees for our services as disclosed in our pricing documentation. All fees are subject to change with appropriate notice. You are responsible for all applicable taxes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p className="mb-4">
            To the maximum extent permitted by law, YourCo Treasury shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">8. Modifications</h2>
          <p className="mb-4">
            We reserve the right to modify these terms at any time. We will provide notice of material changes. Continued use of our services after such changes constitutes acceptance of the modified terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">9. Termination</h2>
          <p className="mb-4">
            Either party may terminate this agreement with appropriate notice. Upon termination, you must cease using our services and we will assist with the orderly wind-down of your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">10. Governing Law</h2>
          <p className="mb-4">
            These terms are governed by Indian law. Any disputes shall be subject to the exclusive jurisdiction of courts in [Jurisdiction].
          </p>
        </section>
      </main>

      {/* Print Footer */}
      <footer className="print-footer">
        <div className="text-center text-sm text-muted mt-8">
          <p>YourCo Treasury - Terms of Service - Page <span className="page-number"></span></p>
        </div>
      </footer>

      {/* Watermark */}
      <div className="watermark">INFORMATIONAL – NOT ADVICE</div>
    </div>
  );
};

export default PrintTerms;