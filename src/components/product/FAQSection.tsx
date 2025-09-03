import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "What entity documents do you collect?",
      answer: "COI, MoA/AoA or LLP Deed, Board Resolution/POA, UBO KYC, PAN & address proofs, FATCA/CRS self-certification.",
    },
    {
      question: "Are you SEBI-registered?",
      answer: "We operate compliance-first. Exact registration category is displayed only once granted. Until then, we show \"registration in progress\" and detailed disclosures.",
    },
    {
      question: "Where are funds held?",
      answer: "In an escrow/custody arrangement with our partner bank/custodian. Details are shown on contract notes.",
    },
    {
      question: "How is yield shown?",
      answer: "Yields are indicative and depend on availability/market conditions at order time.",
    },
    {
      question: "How do approvals work?",
      answer: "Set thresholds so large orders require a second approver (maker-checker).",
    },
    {
      question: "What reports can we download?",
      answer: "Contract notes, annexures, TDS & interest statements, board-pack PDFs, and ERP-ready exports.",
    },
    {
      question: "Do you integrate with Tally/QuickBooks?",
      answer: "Read-only exports at launch; API integrations follow.",
    },
    {
      question: "What support do we get?",
      answer: "In-app chat, ticketing, SLAs dashboard, and a named RM for enterprise plans.",
    },
  ];

  return (
    <section id="faq" className="py-16 bg-bg scroll-mt-32">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text mb-4 font-display">
              Frequently Asked Questions
            </h2>
            <p className="text-muted">
              Everything you need to know about our platform and compliance approach.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-surface border border-border rounded-card px-6"
              >
                <AccordionTrigger className="text-left font-medium text-text hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};