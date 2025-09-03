import { useState } from "react";
import { Button } from "@/components/ui/button";

export const ROICalcMini = () => {
  const [inputs, setInputs] = useState({
    amount: 1000000,
    days: 91,
    yieldDelta: 0.8,
    feesBps: 70
  });
  const [result, setResult] = useState<{ advantage: number; isPositive: boolean } | null>(null);

  const updateInput = (field: string, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateROI = () => {
    const { amount, days, yieldDelta, feesBps } = inputs;
    
    // Formula: Amount × ((Delta/100) − (Fees_bps/10000)) × (Days/365)
    const netAdvantage = amount * ((yieldDelta / 100) - (feesBps / 10000)) * (days / 365);
    
    setResult({
      advantage: Math.round(netAdvantage),
      isPositive: netAdvantage > 0
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-card p-8 shadow-md">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-text mb-4">Quick Inputs</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  value={inputs.amount}
                  onChange={(e) => updateInput("amount", Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Holding (days)
                </label>
                <input
                  type="number"
                  value={inputs.days}
                  onChange={(e) => updateInput("days", Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Yield vs FD delta (% p.a.)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.yieldDelta}
                  onChange={(e) => updateInput("yieldDelta", Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">
                  Fees (bps p.a.)
                </label>
                <input
                  type="number"
                  value={inputs.feesBps}
                  onChange={(e) => updateInput("feesBps", Number(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-md text-sm"
                />
              </div>
            </div>
            
            <Button onClick={calculateROI} className="w-full">
              Calculate Net Advantage
            </Button>
          </div>
          
          {/* Results */}
          <div className="flex items-center justify-center">
            {result ? (
              <div className="text-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  result.isPositive ? "bg-green-100" : "bg-red-100"
                }`}>
                  <span className="text-2xl">
                    {result.isPositive ? "✓" : "✗"}
                  </span>
                </div>
                
                <h4 className="text-lg font-semibold text-text mb-2">
                  Net Advantage
                </h4>
                
                <p className={`text-2xl font-bold mb-2 ${
                  result.isPositive ? "text-green-600" : "text-red-600"
                }`}>
                  {result.advantage >= 0 ? "+" : ""}₹{result.advantage.toLocaleString()}
                </p>
                
                <p className={`text-sm font-medium ${
                  result.isPositive ? "text-green-600" : "text-red-600"
                }`}>
                  {result.isPositive ? "Positive" : "Not yet"}
                </p>
              </div>
            ) : (
              <div className="text-center text-muted">
                <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">?</span>
                </div>
                <p>Enter values and calculate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};