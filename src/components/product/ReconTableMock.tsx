import { Card } from "@/components/Card";

export const ReconTableMock = () => {
  const transactions = [
    { id: "TXN001", amount: "₹50,000", source: "HDFC-1234", order: "ORD-101", status: "Matched", statusColor: "text-success" },
    { id: "TXN002", amount: "₹25,000", source: "ICICI-5678", order: "ORD-102", status: "Matched", statusColor: "text-success" },
    { id: "TXN003", amount: "₹75,000", source: "SBI-9012", order: "-", status: "Needs review", statusColor: "text-warning" },
  ];

  return (
    <Card variant="bordered" className="p-4">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left pb-2 font-medium text-text">Txn ID</th>
              <th className="text-right pb-2 font-medium text-text">Amount</th>
              <th className="text-left pb-2 font-medium text-text">Source</th>
              <th className="text-left pb-2 font-medium text-text">Matched Order</th>
              <th className="text-left pb-2 font-medium text-text">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-b border-border/50">
                <td className="py-2 text-text">{txn.id}</td>
                <td className="py-2 text-right text-text">{txn.amount}</td>
                <td className="py-2 text-muted">{txn.source}</td>
                <td className="py-2 text-muted">{txn.order}</td>
                <td className={`py-2 font-medium ${txn.statusColor}`}>{txn.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};