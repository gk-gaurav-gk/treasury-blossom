import { TrendingUp } from "lucide-react";
import { Card } from "./Card";
import { Sparkline } from "./Sparkline";

export const MetricCard = () => {
  return (
    <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="space-y-6">
        {/* Main Metric */}
        <div>
          <div className="flex items-baseline gap-2 mb-2">
            <h3 className="text-3xl font-bold text-text">35.6%</h3>
            <span className="text-sm text-muted">Conversion rate</span>
          </div>
          
          {/* Sparkline */}
          <div className="mb-4">
            <Sparkline />
          </div>
        </div>

        {/* Footer Stats */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-text font-medium">₹12,309.63</span>
            <div className="flex items-center gap-1 text-success">
              <span className="text-sm font-medium">+5.79%</span>
              <TrendingUp className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};