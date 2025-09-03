import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ComplianceList } from "@/components/compliance/ComplianceList";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Compliance = () => {
  const faqs = [
    {
      question: "When will SEBI registration status be displayed?",
      answer: "We display exact SEBI category only once granted. Currently registration is in progress."
    },
    {
      question: "Do you support CKYC?",
      answer: "Yes, CKYC is supported where applicable for streamlined onboarding."
    },
    {
      question: "How do you handle sanctions screening?",
      answer: "We screen against global sanctions lists during onboarding and ongoing monitoring."
    },
    {
      question: "What escrow/custody arrangements do you use?",
      answer: "Client funds are held in segregated accounts with regulated custodians."
    },
    {
      question: "Can I access audit logs?",
      answer: "Enterprise clients can export immutable audit logs for their transactions."
    },
    {
      question: "What are complaint resolution timelines?",
      answer: "Initial acknowledgment within 48 hours, resolution within 15 working days as per guidelines."
    }
  ];

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>Compliance - YourCo Treasury</title>
        <meta name="description" content="KYC, suitability, disclosures, and grievances clearly stated for transparent treasury operations." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-display">
              Compliance
            </h1>
            <p className="text-xl text-muted">
              KYC, suitability, disclosures, and grievances—clearly stated.
            </p>
          </div>
        </div>
      </section>

      {/* Registration Status */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card border border-border rounded-card p-8">
              <h3 className="text-xl font-semibold text-text mb-4">
                Registration Status
              </h3>
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-card">
                <p className="text-text">
                  Compliance-first; registration in progress. We display exact SEBI category only once granted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Sections */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <ComplianceList />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Compliance FAQ
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-bg border-t border-border">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="solid" 
                size="lg"
                data-analytics="compliance_talk"
                asChild
              >
                <a href="/contact">Talk to compliance</a>
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                data-analytics="compliance_security"
                asChild
              >
                <a href="/security">View security posture</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      </script>
    </main>
  );
};

export default Compliance;