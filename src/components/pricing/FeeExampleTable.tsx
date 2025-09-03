export const FeeExampleTable = () => {
  // Scenario A calculations
  const scenarioA = {
    amount: 1000000,
    rate: 0.07,
    days: 91,
    platformFee: 0.006,
    grossInterest: Math.round((1000000 * 0.07 * (91/365))),
    platformCost: Math.round((1000000 * 0.006 * (91/365))),
    custody: 500, // placeholder
  };
  const netBeforeTax = scenarioA.grossInterest - scenarioA.platformCost - scenarioA.custody;

  return (
    <div className="space-y-8" data-analytics="pricing_fee_example_view">
      {/* Scenario A */}
      <div className="bg-card border border-border rounded-card p-6">
        <h3 className="text-lg font-semibold text-text mb-4">
          Scenario A: ₹10,00,000 in 91-day T-Bill @ 7.0% p.a.
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody className="space-y-2">
              <tr className="border-b border-border">
                <td className="py-2 text-text">Gross interest (pro-rated 91/365):</td>
                <td className="py-2 text-right text-text font-medium">
                  ₹{scenarioA.grossInterest.toLocaleString()}
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-text">Platform transaction fee (0.60% annualized):</td>
                <td className="py-2 text-right text-text font-medium">
                  ₹{scenarioA.platformCost.toLocaleString()}
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-text">Custody/escrow:</td>
                <td className="py-2 text-right text-text font-medium">
                  ₹{scenarioA.custody.toLocaleString()}
                </td>
              </tr>
              <tr className="border-t-2 border-primary">
                <td className="py-2 text-text font-semibold">Net before tax:</td>
                <td className="py-2 text-right text-primary font-bold">
                  ₹{netBeforeTax.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-xs text-muted mt-4">
          Illustrative only. Yields indicative; taxes as per entity profile.
        </p>
      </div>

      {/* Scenario B */}
      <div className="bg-card border border-border rounded-card p-6">
        <h3 className="text-lg font-semibold text-text mb-4">
          Scenario B: ₹50,00,000 ladder (25% 91d, 25% 182d, 50% 364d) @ 6.8–7.2%
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody className="space-y-2">
              <tr className="border-b border-border">
                <td className="py-2 text-text">Weighted average yield:</td>
                <td className="py-2 text-right text-text font-medium">7.0%</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-text">Weighted average tenor:</td>
                <td className="py-2 text-right text-text font-medium">273 days</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-text">Gross interest (weighted):</td>
                <td className="py-2 text-right text-text font-medium">
                  ₹2,62,740
                </td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-text">Platform fees (weighted):</td>
                <td className="py-2 text-right text-text font-medium">
                  ₹22,520
                </td>
              </tr>
              <tr className="border-t-2 border-primary">
                <td className="py-2 text-text font-semibold">Weighted net before tax:</td>
                <td className="py-2 text-right text-primary font-bold">
                  ₹2,40,220
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Scenario C */}
      <div className="bg-card border border-border rounded-card p-6">
        <h3 className="text-lg font-semibold text-text mb-4">
          Scenario C: Debt MF (Liquid) ₹20,00,000
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <tbody className="space-y-2">
              <tr className="border-b border-border">
                <td className="py-2 text-text">Fund expense ratio (indicative):</td>
                <td className="py-2 text-right text-text font-medium">0.25% p.a.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-text">Platform fee (if applicable):</td>
                <td className="py-2 text-right text-text font-medium">0.10% p.a.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 text-text">Exit load:</td>
                <td className="py-2 text-right text-text font-medium">
                  0% (beyond 7 days)
                </td>
              </tr>
              <tr className="border-t-2 border-primary">
                <td className="py-2 text-text font-semibold">Net before tax:</td>
                <td className="py-2 text-right text-primary font-bold">
                  Subject to NAV & fund performance
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-xs text-muted mt-4">
          MF returns are market-linked; tax treatment per current rules (generic).
        </p>
      </div>
    </div>
  );
};