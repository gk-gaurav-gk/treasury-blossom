import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CalcInputCard } from "./CalcInputCard";
import { ResultCard } from "./ResultCard";
import { MaturityList } from "./MaturityList";

interface LadderRung {
  tenor: number;
  allocation: number;
  yield: number;
}

export const LadderPlanner = () => {
  const [totalAmount, setTotalAmount] = useState(1000000);
  const [numRungs, setNumRungs] = useState(3);
  const [rungs, setRungs] = useState<LadderRung[]>([
    { tenor: 91, allocation: 33.33, yield: 6.8 },
    { tenor: 182, allocation: 33.33, yield: 7.0 },
    { tenor: 364, allocation: 33.34, yield: 7.2 }
  ]);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState("");

  const updateRung = (index: number, field: keyof LadderRung, value: number) => {
    const newRungs = [...rungs];
    newRungs[index][field] = value;
    setRungs(newRungs);
  };

  const updateNumRungs = (num: number) => {
    setNumRungs(num);
    const newRungs = [...rungs];
    
    // Add or remove rungs
    while (newRungs.length < num) {
      newRungs.push({ tenor: 91, allocation: 0, yield: 7.0 });
    }
    while (newRungs.length > num) {
      newRungs.pop();
    }
    
    // Redistribute allocations equally
    const equalAllocation = 100 / num;
    newRungs.forEach((rung, index) => {
      rung.allocation = index === num - 1 ? 
        100 - (equalAllocation * (num - 1)) : // Last rung gets remainder
        Math.round(equalAllocation * 100) / 100;
    });
    
    setRungs(newRungs);
  };

  const calculateLadder = () => {
    // Validate allocations sum to 100
    const totalAllocation = rungs.reduce((sum, rung) => sum + rung.allocation, 0);
    if (Math.abs(totalAllocation - 100) > 0.01) {
      setError("Allocations must sum to 100%");
      return;
    }
    
    setError("");
    
    // Calculate results
    const weightedYield = rungs.reduce((sum, rung) => 
      sum + (rung.allocation / 100) * rung.yield, 0
    );
    
    const avgTenor = rungs.reduce((sum, rung) => 
      sum + (rung.allocation / 100) * rung.tenor, 0
    );
    
    const totalInterest = rungs.reduce((sum, rung) => {
      const amount = totalAmount * (rung.allocation / 100);
      const interest = amount * (rung.yield / 100) * (rung.tenor / 365);
      return sum + interest;
    }, 0);
    
    const maturities = rungs.map(rung => {
      const amount = totalAmount * (rung.allocation / 100);
      const interest = amount * (rung.yield / 100) * (rung.tenor / 365);
      const maturityDate = new Date();
      maturityDate.setDate(maturityDate.getDate() + rung.tenor);
      
      return {
        tenor: rung.tenor,
        amount: amount,
        interest: interest,
        total: amount + interest,
        maturityDate: maturityDate.toLocaleDateString()
      };
    }).sort((a, b) => a.tenor - b.tenor);
    
    setResults({
      weightedYield: weightedYield.toFixed(2),
      avgTenor: Math.round(avgTenor),
      totalInterest: Math.round(totalInterest),
      maturities
    });
  };

  return (
    <section id="ladder" className="py-16 bg-surface">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text mb-4 font-display">
            Ladder Planner
          </h2>
          <p className="text-muted">
            Build systematic ladders with 3-5 rungs for consistent liquidity
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <CalcInputCard title="Ladder Inputs">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Total Amount (₹)
                </label>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Number of Rungs
                </label>
                <select
                  value={numRungs}
                  onChange={(e) => updateNumRungs(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md"
                >
                  {[3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              {rungs.map((rung, index) => (
                <div key={index} className="p-4 bg-surface rounded-md border border-border">
                  <h4 className="font-medium text-text mb-3">Rung {index + 1}</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-muted mb-1">Tenor (days)</label>
                      <input
                        type="number"
                        value={rung.tenor}
                        onChange={(e) => updateRung(index, 'tenor', Number(e.target.value))}
                        className="w-full px-2 py-1 border border-border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted mb-1">Allocation (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={rung.allocation}
                        onChange={(e) => updateRung(index, 'allocation', Number(e.target.value))}
                        className="w-full px-2 py-1 border border-border rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-muted mb-1">Yield (% p.a.)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={rung.yield}
                        onChange={(e) => updateRung(index, 'yield', Number(e.target.value))}
                        className="w-full px-2 py-1 border border-border rounded text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <Button 
                onClick={calculateLadder}
                className="w-full"
                data-analytics="calc_ladder_submit"
              >
                Build Ladder
              </Button>
            </div>
          </CalcInputCard>

          <div className="space-y-6">
            {results && (
              <>
                <ResultCard title="Weighted Metrics">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted">Weighted avg yield:</span>
                      <span className="font-semibold text-text">{results.weightedYield}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Average tenor:</span>
                      <span className="font-semibold text-text">{results.avgTenor} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Total expected interest:</span>
                      <span className="font-semibold text-primary">₹{results.totalInterest.toLocaleString()}</span>
                    </div>
                  </div>
                </ResultCard>

                <ResultCard title="Maturity Calendar">
                  <MaturityList maturities={results.maturities} />
                </ResultCard>

                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Export Schedule (CSV)
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-card">
          <p className="text-sm text-text">
            <strong>Disclaimer:</strong> Illustrative only. Yields are indicative; taxes depend on entity profile and rules in force.
          </p>
        </div>
      </div>
    </section>
  );
};