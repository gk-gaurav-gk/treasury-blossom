export const PayoutTableMock = () => {
  const mockData = [
    {
      client: "ABC Manufacturing Ltd",
      txnValue: "₹25,00,000",
      rate: "0.25%",
      payout: "₹6,250",
      status: "Paid"
    },
    {
      client: "XYZ Trading Pvt Ltd", 
      txnValue: "₹15,00,000",
      rate: "0.30%",
      payout: "₹4,500",
      status: "Processing"
    },
    {
      client: "PQR Services LLP",
      txnValue: "₹40,00,000", 
      rate: "0.20%",
      payout: "₹8,000",
      status: "Pending"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "text-green-600 bg-green-100";
      case "Processing": return "text-blue-600 bg-blue-100";
      case "Pending": return "text-amber-600 bg-amber-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-card shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface">
              <tr>
                <th className="text-left p-4 font-semibold text-text">Client</th>
                <th className="text-right p-4 font-semibold text-text">Txn Value</th>
                <th className="text-right p-4 font-semibold text-text">Rate</th>
                <th className="text-right p-4 font-semibold text-text">Payout</th>
                <th className="text-center p-4 font-semibold text-text">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="p-4 text-text font-medium">{row.client}</td>
                  <td className="p-4 text-right text-text">{row.txnValue}</td>
                  <td className="p-4 text-right text-text">{row.rate}</td>
                  <td className="p-4 text-right text-text font-semibold">{row.payout}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-surface border-t border-border">
          <p className="text-xs text-muted text-center">
            <strong>Note:</strong> Illustrative; actual slabs shared post-onboarding.
          </p>
        </div>
      </div>
    </div>
  );
};