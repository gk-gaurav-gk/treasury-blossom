import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PayoutRecord {
  date: string;
  client: string;
  txnValue: string;
  rate: string;
  payout: string;
  status: "Pending" | "Approved" | "Paid";
}

export const PartnerPayoutsTable = () => {
  const payouts: PayoutRecord[] = [
    {
      date: "2025-08-25",
      client: "Prime Agro LLP",
      txnValue: "₹35,00,000",
      rate: "35 bps",
      payout: "₹12,250",
      status: "Pending"
    },
    {
      date: "2025-09-02", 
      client: "Urban Threads Pvt Ltd",
      txnValue: "₹80,00,000",
      rate: "30 bps",
      payout: "₹24,000",
      status: "Approved"
    },
    {
      date: "2025-08-15",
      client: "TechFlow Solutions LLP",
      txnValue: "₹25,00,000",
      rate: "40 bps",
      payout: "₹10,000",
      status: "Paid"
    },
    {
      date: "2025-07-28",
      client: "Coastal Logistics Pvt Ltd", 
      txnValue: "₹15,00,000",
      rate: "35 bps",
      payout: "₹5,250",
      status: "Paid"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Approved": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const exportCSV = () => {
    const headers = ["Date", "Client", "Transaction Value", "Rate", "Payout", "Status"];
    const csvContent = [
      headers.join(","),
      ...payouts.map(payout => [
        payout.date,
        `"${payout.client}"`,
        payout.txnValue,
        payout.rate,
        payout.payout,
        payout.status
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "partner-payouts.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadStatement = () => {
    const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
    window.open(`/partner/print/payouts?m=${currentMonth}`, '_blank');
  };

  const totalPayout = payouts.reduce((sum, payout) => {
    const amount = parseInt(payout.payout.replace(/[₹,]/g, ''));
    return sum + amount;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={exportCSV}
          data-analytics="partner_export_csv"
        >
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
        <Button
          variant="outline"
          onClick={downloadStatement}
          data-analytics="partner_print_statement"
        >
          <FileText className="w-4 h-4 mr-2" />
          Download Statement (PDF)
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-card shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface">
              <tr>
                <th className="text-left p-4 font-semibold text-text">Date</th>
                <th className="text-left p-4 font-semibold text-text">Client</th>
                <th className="text-right p-4 font-semibold text-text">Txn Value</th>
                <th className="text-center p-4 font-semibold text-text">Rate</th>
                <th className="text-right p-4 font-semibold text-text">Payout</th>
                <th className="text-center p-4 font-semibold text-text">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.map((payout, index) => (
                <tr key={index} className="border-t border-border">
                  <td className="p-4 text-muted">{new Date(payout.date).toLocaleDateString()}</td>
                  <td className="p-4 text-text font-medium">{payout.client}</td>
                  <td className="p-4 text-right text-text">{payout.txnValue}</td>
                  <td className="p-4 text-center text-muted">{payout.rate}</td>
                  <td className="p-4 text-right font-semibold text-text">{payout.payout}</td>
                  <td className="p-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payout.status)}`}>
                      {payout.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Row */}
        <div className="border-t-2 border-primary bg-surface p-4">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-text">Total Payouts</span>
            <span className="font-bold text-primary text-lg">
              ₹{totalPayout.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};