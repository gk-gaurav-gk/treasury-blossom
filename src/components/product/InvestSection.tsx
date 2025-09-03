import { MiniInstrumentCard } from "./MiniInstrumentCard";
import { FilterChips } from "./FilterChips";
import { OrderTicketMock } from "./OrderTicketMock";
import { SuitabilityCallout } from "./SuitabilityCallout";

export const InvestSection = () => {
  const instruments = [
    { name: "T-Bills (91d)", yieldValue: "7.25%", rating: "Sovereign" },
    { name: "G-Secs", yieldValue: "7.45%", rating: "Sovereign" },
    { name: "High-grade Corporate Debt", yieldValue: "8.15%", rating: "AAA" },
    { name: "Debt MFs", yieldValue: "6.85%", rating: "AAA" },
    { name: "SDIs", yieldValue: "7.10%", rating: "Bank" },
  ];

  const filters = [
    { label: "Tenor", options: ["7d", "14d", "28d", "91d", "182d", "364d"] },
    { label: "Rating", options: ["AAA", "AA+"] },
    { label: "Liquidity", options: ["on maturity"] },
    { label: "Tax", options: ["TDS", "Indexation"] },
  ];

  return (
    <section id="invest" className="py-16 bg-surface scroll-mt-32">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Instrument Shelf */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-text mb-6 font-display">
                Compliant instruments
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {instruments.map((instrument, index) => (
                  <MiniInstrumentCard
                    key={index}
                    name={instrument.name}
                    yieldValue={instrument.yieldValue}
                    rating={instrument.rating}
                  />
                ))}
              </div>
              
              <FilterChips filters={filters} />
              
              <p className="text-sm text-muted mt-4">
                Live indicative yields and availability appear at order time.
              </p>
            </div>
          </div>

          {/* Right Column - Order Ticket */}
          <div className="space-y-6">
            <OrderTicketMock />
            <SuitabilityCallout />
          </div>
        </div>
      </div>
    </section>
  );
};