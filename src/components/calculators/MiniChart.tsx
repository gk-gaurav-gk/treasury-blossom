interface ChartData {
  label: string;
  value: number;
}

interface MiniChartProps {
  data: ChartData[];
  type: "bar" | "line";
}

export const MiniChart = ({ data, type }: MiniChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  if (type === "bar") {
    return (
      <div className="space-y-3">
        {data.map((item, index) => {
          const percentage = (item.value / maxValue) * 100;
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted">{item.label}</span>
                <span className="font-medium text-text">₹{item.value.toLocaleString()}</span>
              </div>
              <div className="w-full bg-surface rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-32 text-muted">
      Chart visualization placeholder
    </div>
  );
};