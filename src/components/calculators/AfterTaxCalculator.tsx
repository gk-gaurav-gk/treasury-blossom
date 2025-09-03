import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalcInputCard } from "./CalcInputCard";
import { ResultCard } from "./ResultCard";
import { MiniChart } from "./MiniChart";

export const AfterTaxCalculator = () => {
  const [inputs, setInputs] = useState({
    amount: 1000000,
    days: 182,
    instrumentYield: 7.0,
    fdRate: 6.4,
    taxRate: 25,
    tdsDeducted: false
  });
  const [results, setResults] = useState<any>(null);

  const updateInput = (field: string, value: number | boolean) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateComparison = () => {
    const { amount, days, instrumentYield, fdRate, taxRate } = inputs;
    
    // Calculate gross returns
    const instrumentGross = amount * (instrumentYield / 100) * (days / 365);
    const fdGross = amount * (fdRate / 100) * (days / 365);
    
    // Calculate after-tax returns
    const instrumentAfterTax = instrumentGross * (1 - taxRate / 100);
    const fdAfterTax = fdGross * (1 - taxRate / 100);
    
    // Calculate difference
    const difference = instrumentAfterTax - fdAfterTax;
    
    setResults({
      instrumentGross: Math.round(instrumentGross),
      fdGross: Math.round(fdGross),
      instrumentAfterTax: Math.round(instrumentAfterTax),
      fdAfterTax: Math.round(fdAfterTax),
      difference: Math.round(difference),
      percentageDiff: ((difference / fdAfterTax) * 100).toFixed(1)
    });
  };

  return (
    <section id="aftertax" className="py-16 bg-bg">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text mb-4 font-display">
            After-Tax Return vs FD
          </h2>
          <p className="text-muted">
            Apples-to-apples comparison for informed treasury decisions
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <CalcInputCard title="Comparison Inputs">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={inputs.amount}
                  onChange={(e) => updateInput('amount', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Holding Period (days)
                </label>
                <input
                  type="number"
                  value={inputs.days}
                  onChange={(e) => updateInput('days', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Instrument Yield (% p.a.)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.instrumentYield}
                    onChange={(e) => updateInput('instrumentYield', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    FD Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={inputs.fdRate}
                    onChange={(e) => updateInput('fdRate', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Entity Tax Rate (% of interest)
                </label>
                <input
                  type="number"
                  value={inputs.taxRate}
                  onChange={(e) => updateInput('taxRate', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md"
                />
                <p className="text-xs text-muted mt-1">Generic rate for illustration</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="tds"
                  checked={inputs.tdsDeducted}
                  onChange={(e) => updateInput('tdsDeducted', e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="tds" className="text-sm text-text">
                  TDS deducted at source
                </label>
                <span className="text-xs text-muted">(info only)</span>
              </div>

              <Button 
                onClick={calculateComparison}
                className="w-full"
                data-analytics="calc_aftertax_submit"
              >
                Compare
              </Button>
            </div>
          </CalcInputCard>

          <div className="space-y-6">
            {results && (
              <>
                <ResultCard title="After-Tax Comparison">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-4 bg-blue-50 rounded-card">
                        <p className="text-sm text-muted mb-1">Instrument</p>
                        <p className="font-semibold text-text">₹{results.instrumentAfterTax.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-card">
                        <p className="text-sm text-muted mb-1">FD</p>
                        <p className="font-semibold text-text">₹{results.fdAfterTax.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="text-center p-4 bg-primary/10 rounded-card">
                      <p className="text-sm text-muted mb-1">Difference</p>
                      <p className={`font-bold text-lg ${results.difference >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {results.difference >= 0 ? '+' : ''}₹{results.difference.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted">
                        ({results.percentageDiff}% {results.difference >= 0 ? 'better' : 'worse'})
                      </p>
                    </div>
                  </div>
                </ResultCard>

                <ResultCard title="Visual Comparison">
                  <MiniChart 
                    data={[
                      { label: "Instrument", value: results.instrumentAfterTax },
                      { label: "FD", value: results.fdAfterTax }
                    ]}
                    type="bar"
                  />
                </ResultCard>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-card">
          <p className="text-sm text-text">
            <strong>Disclaimer:</strong> Tax treatment depends on instrument type and prevailing rules; this tool uses a simplified rate for illustration.
          </p>
        </div>
      </div>
    </section>
  );
};