import { Card } from "@/components/Card";

export const MaturityCalendarMock = () => {
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const maturities = [5, 12, 18, 25, 28]; // Sample maturity dates

  return (
    <Card variant="bordered" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-text">March 2024</h4>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted">Maturity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-muted">Settlement</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Week headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs font-medium text-muted p-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`p-2 text-sm relative ${
              maturities.includes(day)
                ? "bg-primary/10 border border-primary/20 rounded-md font-medium text-primary"
                : "text-muted hover:bg-surface"
            }`}
          >
            {day}
            {maturities.includes(day) && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted">Total maturing:</span>
          <span className="font-medium text-text">₹2,45,00,000</span>
        </div>
      </div>
    </Card>
  );
};