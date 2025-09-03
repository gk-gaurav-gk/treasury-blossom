import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { PlanCard } from "@/components/pricing/PlanCard";
import { ComparisonTable } from "@/components/pricing/ComparisonTable";
import { FeeExampleTable } from "@/components/pricing/FeeExampleTable";
import { QuoteModal } from "@/components/pricing/QuoteModal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Pricing = () => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const faqs = [
    {
      question: "Are there onboarding or hidden fees?",
      answer: "No hidden fees; any third-party charges are itemized."
    },
    {
      question: "How are transaction fees applied?",
      answer: "On a pro-rated/transaction basis; examples above."
    },
    {
      question: "Can we switch plans later?",
      answer: "Yes, proration applies for annual plans."
    },
    {
      question: "Do you support multi-entity billing?",
      answer: "Enterprise plan supports consolidated billing."
    }
  ];

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>Pricing - YourCo Treasury</title>
        <meta name="description" content="Transparent pricing plans for SME treasury management with clear fee examples and no hidden costs." />
      </Helmet>

      {/* Hero */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-display">
              Pricing
            </h1>
            <p className="text-xl text-muted mb-4">
              Transparent plans with enterprise controls. No surprises.
            </p>
            <p className="text-sm text-muted">
              Actual fees depend on instrument availability and partner arrangements. See examples below.
            </p>
          </div>
        </div>
      </section>

      {/* Plan Cards */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="grid md:grid-cols-3 gap-8">
            <PlanCard
              name="Starter"
              price="₹25,000"
              period="/year"
              description="For smaller SMEs, 3 users"
              features={[
                "Instrument shelf",
                "Portfolio dashboard", 
                "Maturity alerts",
                "Basic reports (PDF)",
                "Email support"
              ]}
              transactionFee="~0.8%"
              buttonText="Get started"
              buttonVariant="outline"
              onButtonClick={() => {}}
              planType="starter"
            />
            
            <PlanCard
              name="Growth"
              price="₹75,000"
              period="/year"
              description="For finance teams scaling, 10 users"
              features={[
                "Everything in Starter",
                "Maker-checker thresholds",
                "Board-pack PDFs",
                "CSV/XLS exports",
                "Read-only Tally/QuickBooks",
                "Priority support"
              ]}
              transactionFee="~0.6%"
              buttonText="Start onboarding"
              buttonVariant="default"
              isPopular={true}
              onButtonClick={() => {}}
              planType="growth"
            />
            
            <PlanCard
              name="Enterprise"
              price="Contact sales"
              period=""
              description="For multi-entity, stricter controls"
              features={[
                "Everything in Growth",
                "SSO (Google/Azure AD)",
                "IP allow-listing",
                "Device binding",
                "Custom SLAs",
                "Audit log export",
                "Sandbox environment"
              ]}
              transactionFee="custom"
              buttonText="Request a quote"
              buttonVariant="solid"
              onButtonClick={() => setShowQuoteModal(true)}
              planType="enterprise"
            />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Compare Plans
            </h2>
          </div>
          <ComparisonTable />
        </div>
      </section>

      {/* Fee Examples */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Fee Examples
            </h2>
            <p className="text-muted">
              Transparent breakdown of costs with real scenarios
            </p>
          </div>
          <FeeExampleTable />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Pricing FAQ
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
      <section className="py-16 bg-gradient-brand">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="bg-bg rounded-card p-8 text-center">
            <h2 className="text-2xl font-bold text-text mb-6 font-display">
              Ready to upgrade your treasury?
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="solid" 
                size="lg"
                data-analytics="pricing_cta_demo"
              >
                Book a 20-min demo
              </Button>
              <Button 
                variant="ghost" 
                size="lg"
                data-analytics="pricing_cta_onboarding"
              >
                Start onboarding
              </Button>
            </div>
          </div>
        </div>
      </section>

      <QuoteModal 
        isOpen={showQuoteModal}
        onClose={() => setShowQuoteModal(false)}
      />

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

export default Pricing;