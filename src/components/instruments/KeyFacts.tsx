import { YieldRangeBar } from "./YieldRangeBar";
import type { Instrument } from "@/data/instruments";

interface KeyFactsProps {
  instrument: Instrument;
}

export const KeyFacts = ({ instrument }: KeyFactsProps) => {
  const facts = [
    { label: "Indicative yield", value: `${instrument.indicative_yield_min}–${instrument.indicative_yield_max}%` },
    { label: "Tenor", value: instrument.tenor_label },
    { label: "Min lot", value: instrument.min_lot },
    { label: "Liquidity", value: instrument.liquidity },
    { label: "Settlement", value: instrument.settlement },
    { label: "Rating", value: instrument.rating },
  ];

  return (
    <div className="bg-surface rounded-card p-6 shadow-md">
      <h2 className="text-xl font-semibold text-text mb-6 font-display">Key Facts</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {facts.map((fact, index) => (
          <div key={index}>
            <dt className="text-sm text-muted mb-1">{fact.label}</dt>
            <dd className="font-medium text-text">{fact.value}</dd>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-sm text-muted mb-3">Yield Range</h3>
        <YieldRangeBar 
          min={instrument.indicative_yield_min}
          max={instrument.indicative_yield_max}
        />
      </div>
    </div>
  );
};