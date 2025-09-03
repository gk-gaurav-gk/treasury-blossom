import { Users, UserCheck, CheckCircle, DollarSign, TrendingUp, Clock } from "lucide-react";

export const PartnerSummary = () => {
  // This would come from API in real implementation
  const summaryData = [
    {
      title: "Referrals",
      value: "12",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "KYC Started", 
      value: "8",
      icon: UserCheck,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    },
    {
      title: "KYC Completed",
      value: "5",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Funded",
      value: "3",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Est. AUM",
      value: "₹2.35 Cr",
      icon: DollarSign,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      title: "Pending Payouts",
      value: "₹36,250",
      icon: Clock,
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {summaryData.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-card p-6 shadow-md">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-text mb-1">{item.value}</p>
            <p className="text-sm text-muted">{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};