import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CalcInputCard } from "./CalcInputCard";
import { ResultCard } from "./ResultCard";

export const BreakevenCalculator = () => {
  const [inputs, setInputs] = useState({
    amount: 1000000,
    days: 91,
    yieldAdvantage: 0.8,
    platformFeeBps: 60,
    custodyFeeBps: 10,
    fixedFee: 0
  });
  const [results, setResults] = useState<any>(null);

  const updateInput = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateBreakeven = () => {
    const { amount, days, yieldAdvantage, platformFeeBps, custodyFeeBps, fixedFee } = inputs;
    
    // Convert basis points to percentage
    const totalFeesPercentage = (platformFeeBps + custodyFeeBps) / 10000;
    
    // Calculate net advantage
    const grossAdvantage = amount * (yieldAdvantage / 100) * (days / 365);
    const totalFees = amount * totalFeesPercentage * (days / 365) + fixedFee;
    const netAdvantage = grossAdvantage - totalFees;
    
    // Calculate break-even yield if negative
    let breakEvenYield = null;
    if (netAdvantage < 0) {
      breakEvenYield = (totalFeesPercentage + (fixedFee / amount) * (365 / days)) * 100;
    }
    
    setResults({
      grossAdvantage: Math.round(grossAdvantage),
      totalFees: Math.round(totalFees),
      netAdvantage: Math.round(netAdvantage),
      isPositive: netAdvantage >= 0,
      breakEvenYield: breakEvenYield ? breakEvenYield.toFixed(2) : null
    });
  };

  return (
    <section id="breakeven" className="py-16 bg-surface">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text mb-4 font-display">
            Break-even vs Fees
          </h2>
          <p className="text-muted">
            Check if yield advantage covers platform and custody fees
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <CalcInputCard title="Break-even Inputs">
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

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Gross Yield Advantage over FD (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={inputs.yieldAdvantage}
                  onChange={(e) => updateInput('yieldAdvantage', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Platform Fee (bps p.a.)
                  </label>
                  <input
                    type="number"
                    value={inputs.platformFeeBps}
                    onChange={(e) => updateInput('platformFeeBps', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Custody/Escrow (bps p.a.)
                  </label>
                  <input
                    type="number"
                    value={inputs.custodyFeeBps}
                    onChange={(e) => updateInput('custodyFeeBps', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Fixed Fee (₹)
                </label>
                <input
                  type="number"
                  value={inputs.fixedFee}
                  onChange={(e) => updateInput('fixedFee', Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md"
                />
              </div>

              <Button 
                onClick={calculateBreakeven}
                className="w-full"
                data-analytics="calc_breakeven_submit"
              >
                Check Break-even
              </Button>
            </div>
          </CalcInputCard>

          <div className="space-y-6">
            {results && (
              <>
                <ResultCard title="Break-even Analysis">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted">Gross advantage:</span>
                      <span className="font-semibold text-text">₹{results.grossAdvantage.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Total fees:</span>
                      <span className="font-semibold text-text">₹{results.totalFees.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between">
                        <span className="text-muted font-medium">Net advantage:</span>
                        <span className={`font-bold ${results.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {results.netAdvantage >= 0 ? '+' : ''}₹{results.netAdvantage.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </ResultCard>

                <ResultCard title="Verdict">
                  <div className="text-center p-6">
                    {results.isPositive ? (
                      <div className="space-y-2">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">✓</span>
                        </div>
                        <h3 className="text-lg font-semibold text-green-600">Net Positive</h3>
                        <p className="text-sm text-muted">
                          The yield advantage covers all fees with a positive net return.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">✗</span>
                        </div>
                        <h3 className="text-lg font-semibold text-red-600">Not Yet Break-even</h3>
                        <p className="text-sm text-muted mb-2">
                          Fees exceed the yield advantage.
                        </p>
                        {results.breakEvenYield && (
                          <p className="text-sm font-medium text-text">
                            Break-even yield advantage needed: <span className="text-primary">{results.breakEvenYield}% p.a.</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </ResultCard>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-card">
          <p className="text-sm text-text">
            <strong>Disclaimer:</strong> Illustrative only; excludes fund expense ratios and taxes unless entered as fees.
          </p>
        </div>
      </div>
    </section>
  );
};