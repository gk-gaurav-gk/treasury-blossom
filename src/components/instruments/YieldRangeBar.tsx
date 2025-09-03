interface YieldRangeBarProps {
  min: number;
  max: number;
}

export const YieldRangeBar = ({ min, max }: YieldRangeBarProps) => {
  const range = max - min;
  const midpoint = min + (range / 2);

  return (
    <div className="relative">
      <svg width="100%" height="24" className="overflow-visible">
        {/* Background bar */}
        <rect
          x="0"
          y="8"
          width="100%"
          height="8"
          fill="hsl(var(--surface))"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          rx="4"
        />
        
        {/* Active range */}
        <rect
          x="20%"
          y="8"
          width="60%"
          height="8"
          fill="hsl(var(--primary))"
          rx="4"
        />
        
        {/* Min marker */}
        <circle
          cx="20%"
          cy="12"
          r="4"
          fill="hsl(var(--primary))"
          stroke="white"
          strokeWidth="2"
        />
        
        {/* Max marker */}
        <circle
          cx="80%"
          cy="12"
          r="4"
          fill="hsl(var(--primary))"
          stroke="white"
          strokeWidth="2"
        />
        
        {/* Min label */}
        <text
          x="20%"
          y="32"
          textAnchor="middle"
          className="text-xs fill-muted"
        >
          {min}%
        </text>
        
        {/* Max label */}
        <text
          x="80%"
          y="32"
          textAnchor="middle"
          className="text-xs fill-muted"
        >
          {max}%
        </text>
      </svg>
    </div>
  );
};