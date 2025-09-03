import { Button } from "@/components/ui/button";
import { Card } from "@/components/Card";

export const OrderTicketMock = () => {
  return (
    <Card variant="elevated" className="p-6">
      <h3 className="font-semibold text-text mb-6 font-display">Order Ticket</h3>
      
      <div className="space-y-6">
        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text block mb-2">Amount (₹)</label>
            <div className="w-full h-10 bg-surface border border-border rounded-button flex items-center px-3">
              <span className="text-muted">50,00,000</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-text block mb-2">Settlement</label>
            <div className="w-full h-10 bg-surface border border-border rounded-button flex items-center px-3">
              <span className="text-muted">T+1</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-text block mb-2">Expected yield</label>
            <div className="w-full h-10 bg-surface border border-border rounded-button flex items-center px-3">
              <span className="text-muted">7.25% (indicative)</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-text block mb-2">Fees preview</label>
            <div className="w-full h-10 bg-surface border border-border rounded-button flex items-center px-3">
              <span className="text-muted">₹250</span>
            </div>
          </div>
        </div>

        {/* Maker-Checker Threshold */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text">Maker-Checker threshold</span>
            <div className="w-10 h-6 bg-primary rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
            </div>
          </div>
          <p className="text-xs text-muted">Orders &gt; ₹10,00,000 require second approval</p>
        </div>

        {/* Disclosures */}
        <div>
          <button className="text-sm text-primary hover:text-primary-600 underline underline-offset-2">
            View disclosures ↓
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="solid" 
            className="flex-1"
            data-analytics="order_mock_submit"
          >
            Submit for approval
          </Button>
          <Button variant="ghost" className="flex-1">
            Save draft
          </Button>
        </div>
      </div>
    </Card>
  );
};