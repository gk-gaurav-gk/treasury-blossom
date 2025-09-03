import { Check, X } from "lucide-react";

export const ComparisonTable = () => {
  const features = [
    { name: "Users", starter: "3", growth: "10", enterprise: "Unlimited" },
    { name: "Roles & permissions", starter: false, growth: true, enterprise: "Advanced" },
    { name: "Maker-checker", starter: false, growth: true, enterprise: "With thresholds" },
    { name: "Board-pack PDFs", starter: false, growth: true, enterprise: true },
    { name: "ERP exports", starter: false, growth: true, enterprise: true },
    { name: "SSO", starter: false, growth: false, enterprise: true },
    { name: "IP allow-list", starter: false, growth: false, enterprise: true },
    { name: "Priority support", starter: false, growth: true, enterprise: true },
    { name: "Named RM", starter: false, growth: false, enterprise: true },
  ];

  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-primary mx-auto" />
      ) : (
        <X className="w-5 h-5 text-muted mx-auto" />
      );
    }
    return <span className="text-text text-sm">{value}</span>;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-border rounded-card overflow-hidden">
        <thead className="bg-surface">
          <tr>
            <th className="text-left p-4 font-semibold text-text">Feature</th>
            <th className="text-center p-4 font-semibold text-text">Starter</th>
            <th className="text-center p-4 font-semibold text-text">Growth</th>
            <th className="text-center p-4 font-semibold text-text">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-t border-border">
              <td className="p-4 text-text font-medium">{feature.name}</td>
              <td className="p-4 text-center">{renderCell(feature.starter)}</td>
              <td className="p-4 text-center">{renderCell(feature.growth)}</td>
              <td className="p-4 text-center">{renderCell(feature.enterprise)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};