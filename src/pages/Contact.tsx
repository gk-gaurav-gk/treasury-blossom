import { Helmet } from "react-helmet-async";
import { CalendlyCard } from "@/components/contact/CalendlyCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { WhatsAppBanner } from "@/components/contact/WhatsAppBanner";

const Contact = () => {
  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>Contact - YourCo Treasury</title>
        <meta name="description" content="Book a demo or request a quote for your SME treasury needs. Get in touch with our team." />
      </Helmet>

      {/* Header */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-display">
              Contact
            </h1>
            <p className="text-xl text-muted">
              Book a demo or request a quote—your choice.
            </p>
          </div>
        </div>
      </section>

      {/* WhatsApp Banner */}
      <WhatsAppBanner />

      {/* Main Content */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Demo Booking */}
            <div>
              <CalendlyCard />
            </div>

            {/* Right: RFP Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-8 bg-bg border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-muted">
            <a href="/compliance#grievance" className="hover:text-text underline">
              Grievance redressal
            </a>
            <span className="hidden sm:block">•</span>
            <a href="/security" className="hover:text-text underline">
              Security pack
            </a>
          </div>
        </div>
      </section>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "YourCo Treasury",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-XXXX-XXXX-XX",
            "contactType": "customer service",
            "email": "hello@yourco.example"
          }
        })}
      </script>
    </main>
  );
};

export default Contact;