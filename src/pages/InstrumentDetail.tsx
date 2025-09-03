import { useParams } from "react-router-dom";
import { instruments } from "@/data/instruments";
import { KeyFacts } from "@/components/instruments/KeyFacts";
import { StickyCTA } from "@/components/instruments/StickyCTA";
import { InstrumentTabs } from "@/components/instruments/InstrumentTabs";
import { Helmet } from "react-helmet-async";

const InstrumentDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const instrument = instruments.find(i => i.slug === slug);

  if (!instrument) {
    return (
      <main className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-4">Instrument not found</h1>
          <a href="/instruments" className="text-primary hover:text-primary-600 underline">
            Back to instruments
          </a>
        </div>
      </main>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": instrument.name,
    "provider": {"@type":"Organization","name":"YourCo Treasury"},
    "additionalType": "Fixed Income",
    "audience": {"@type":"BusinessAudience","name":"SMEs"},
    "offers": {"@type":"Offer","priceCurrency":"INR","eligibleRegion":"IN"},
    "description": `Compliant fixed-income instrument for SME treasury; indicative yield ${instrument.indicative_yield_min}–${instrument.indicative_yield_max}%.`
  };

  return (
    <>
      <Helmet>
        <title>{instrument.name} | YourCo Treasury</title>
        <meta name="description" content={`${instrument.name} - ${instrument.category} with indicative yield ${instrument.indicative_yield_min}-${instrument.indicative_yield_max}%. Minimum lot ${instrument.min_lot}.`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <main className="min-h-screen pt-24">
        {/* Hero */}
        <section className="py-16 bg-bg">
          <div className="container mx-auto px-6 max-w-screen-xl">
            {/* Breadcrumb */}
            <nav className="text-sm text-muted mb-8">
              <a href="/" className="hover:text-text">Home</a>
              <span className="mx-2">/</span>
              <a href="/instruments" className="hover:text-text">Instruments</a>
              <span className="mx-2">/</span>
              <span>{instrument.name}</span>
            </nav>

            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6">
                  <h1 className="text-4xl font-bold text-text font-display">
                    {instrument.name}
                  </h1>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                    {instrument.category}
                  </span>
                </div>
                
                <KeyFacts instrument={instrument} />
              </div>

              <div className="lg:col-span-1">
                <StickyCTA instrument={instrument} />
              </div>
            </div>
          </div>
        </section>

        {/* Tabbed Content */}
        <section className="py-16 bg-surface">
          <div className="container mx-auto px-6 max-w-screen-xl">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <InstrumentTabs instrument={instrument} />
              </div>
              
              {/* Side Rail */}
              <div className="lg:col-span-1">
                <div className="bg-bg rounded-card p-6 shadow-md">
                  <h3 className="font-semibold text-text mb-4 font-display">Downloadables</h3>
                  <div className="space-y-3">
                    <a href="#" className="block text-primary hover:text-primary-600 text-sm underline underline-offset-2">
                      Sample contract note (PDF)
                    </a>
                    <a href="#" className="block text-primary hover:text-primary-600 text-sm underline underline-offset-2">
                      Sample board pack (PDF)
                    </a>
                    <a href="#" className="block text-primary hover:text-primary-600 text-sm underline underline-offset-2">
                      Fact sheet (PDF)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Disclaimer */}
        <section className="py-8 bg-warning/5 border-t border-warning/20">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm text-muted">
              This communication is for information only and not investment advice. Investments are subject to market and credit risks.
            </p>
          </div>
        </section>

        {/* Footer placeholder */}
        <footer className="py-8 bg-bg border-t border-border">
          <div className="container mx-auto px-6 text-center">
            <p className="text-muted text-sm">
              © {new Date().getFullYear()} YourCo Treasury. 
              <a href="/legal" className="ml-2 hover:text-text underline">
                Legal
              </a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default InstrumentDetail;