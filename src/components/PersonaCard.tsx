import { PieChart } from "lucide-react";
import { Card } from "./Card";

export const PersonaCard = () => {
  return (
    <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg relative">
      {/* Mini pie icon in corner */}
      <div className="absolute top-4 right-4">
        <PieChart className="w-4 h-4 text-muted" />
      </div>

      <div className="space-y-4">
        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-brand rounded-full"></div>
          <div>
            <p className="font-medium text-text">Alies Westervelt</p>
            <p className="text-sm text-muted">Technical Assistant</p>
          </div>
        </div>

        {/* Notification */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-3">
          <p className="text-sm text-text">
            You received a payment of ₹500 and it needs approval.
          </p>
        </div>

        {/* KPIs */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted">Monthly interest</span>
            <span className="font-semibold text-text">₹2,200</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted">Sweep available</span>
            <span className="font-semibold text-text">₹840</span>
          </div>
        </div>
      </div>
    </Card>
  );
};