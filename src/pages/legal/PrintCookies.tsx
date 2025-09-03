import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const PrintCookies = () => {
  useEffect(() => {
    window.print();
  }, []);

  return (
    <div className="print-document">
      <Helmet>
        <title>Cookie Policy - YourCo Treasury</title>
        <link rel="canonical" href="/legal#cookies" />
      </Helmet>

      <header className="print-header">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">YourCo Treasury</h1>
            <p className="text-sm text-muted">Cookie Policy</p>
          </div>
          <div className="text-right text-sm text-muted">
            <p>Last updated: January 1, 2024</p>
            <p>yourco.treasury.example/legal#cookies</p>
          </div>
        </div>
      </header>

      <div className="online-only mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm">
          <a href="/legal#cookies" className="text-blue-600 hover:underline">
            View online → /legal#cookies
          </a>
        </p>
      </div>

      <main className="document-content">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit our website. They help us make our website work better for you and provide information about how the website is used.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">How We Use Cookies</h2>
          <p className="mb-4">We use cookies for various purposes:</p>
          <ul className="mb-4 ml-6 list-disc">
            <li>To enable essential website functionality</li>
            <li>To remember your preferences and settings</li>
            <li>To analyze website traffic and usage patterns</li>
            <li>To enhance security and prevent fraud</li>
            <li>To improve user experience</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Types of Cookies We Use</h2>
          
          <h3 className="text-lg font-semibold mb-3">Essential Cookies</h3>
          <p className="mb-4">
            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
          </p>

          <h3 className="text-lg font-semibold mb-3">Analytics Cookies</h3>
          <p className="mb-4">
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
          </p>

          <h3 className="text-lg font-semibold mb-3">Functional Cookies</h3>
          <p className="mb-4">
            These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.
          </p>

          <h3 className="text-lg font-semibold mb-3">Security Cookies</h3>
          <p className="mb-4">
            These cookies help identify and prevent security risks and fraudulent activity.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Managing Your Cookie Preferences</h2>
          <p className="mb-4">
            You can control and manage cookies in various ways:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Browser settings: Most browsers allow you to control cookies through their settings</li>
            <li>Cookie banner: Use our website's cookie preference center</li>
            <li>Opt-out tools: Use industry opt-out tools for advertising cookies</li>
          </ul>
          <p className="mb-4">
            Please note that disabling certain cookies may impact the functionality of our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Third-Party Cookies</h2>
          <p className="mb-4">
            We may use third-party services that set their own cookies on our website. These services include:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Analytics providers (e.g., Google Analytics)</li>
            <li>Content delivery networks</li>
            <li>Customer support tools</li>
            <li>Security services</li>
          </ul>
          <p className="mb-4">
            These third parties have their own privacy policies and cookie practices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Cookie Retention</h2>
          <p className="mb-4">
            Cookies may be either "session" cookies or "persistent" cookies:
          </p>
          <ul className="mb-4 ml-6 list-disc">
            <li>Session cookies are temporary and deleted when you close your browser</li>
            <li>Persistent cookies remain on your device for a set period or until you delete them</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Updates to This Policy</h2>
          <p className="mb-4">
            We may update this Cookie Policy from time to time. We will notify you of any significant changes by posting the new policy on this page with an updated "Last updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have questions about our use of cookies, please contact us at privacy@yourco.example or through our contact page.
          </p>
        </section>
      </main>

      <footer className="print-footer">
        <div className="text-center text-sm text-muted mt-8">
          <p>YourCo Treasury - Cookie Policy - Page <span className="page-number"></span></p>
        </div>
      </footer>

      <div className="watermark">INFORMATIONAL – NOT ADVICE</div>
    </div>
  );
};

export default PrintCookies;