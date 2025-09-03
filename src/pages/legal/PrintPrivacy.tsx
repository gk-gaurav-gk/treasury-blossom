import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PrintPrivacy = () => {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <div className="print-document">
      <Helmet>
        <title>Privacy Policy - YourCo Treasury</title>
        <link rel="canonical" href="/legal#privacy" />
      </Helmet>

      <header className="print-header">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">YourCo Treasury</h1>
            <p className="text-sm text-muted">Privacy Policy</p>
          </div>
          <div className="text-right text-sm text-muted">
            <p>Last updated: January 1, 2024</p>
            <p>yourco.treasury.example/legal#privacy</p>
          </div>
        </div>
      </header>

      <div className="online-only mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm">
          <a href="/legal#privacy" className="text-blue-600 hover:underline">
            View online → /legal#privacy
          </a>
        </p>
      </div>

      <main className="document-content">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="mb-4">
            We collect information you provide directly to us, information we collect automatically from your use of our services, and information we receive from third parties.
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Personal identification information (name, email, phone)</li>
            <li>Business information (company details, financial data)</li>
            <li>Usage data and analytics</li>
            <li>Device and browser information</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. How We Use Information</h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Provide and maintain our services</li>
            <li>Process transactions and send confirmations</li>
            <li>Comply with legal and regulatory requirements</li>
            <li>Communicate with you about our services</li>
            <li>Improve and develop our platform</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
          <p className="mb-4">
            We may share your information in the following circumstances:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>With your consent</li>
            <li>For legal compliance and regulatory requirements</li>
            <li>With service providers who assist our operations</li>
            <li>In connection with business transfers</li>
            <li>To protect rights and safety</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
          <p className="mb-4">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Your Rights and Choices</h2>
          <p className="mb-4">
            Subject to applicable law and regulatory requirements, you may have the following rights:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of information</li>
            <li>Object to processing</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Data Retention</h2>
          <p className="mb-4">
            We retain personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. International Transfers</h2>
          <p className="mb-4">
            Your information may be processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
          <p className="mb-4">
            For privacy-related inquiries or to exercise your rights, contact us at privacy@yourco.example or through our contact page.
          </p>
        </section>
      </main>

      <footer className="print-footer">
        <div className="text-center text-sm text-muted mt-8">
          <p>YourCo Treasury - Privacy Policy - Page <span className="page-number"></span></p>
        </div>
      </footer>

      <div className="watermark">INFORMATIONAL – NOT ADVICE</div>
    </div>
  );
};

export default PrintPrivacy;