interface SortBarProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  resultCount: number;
}

export const SortBar = ({ sortBy, onSortChange, resultCount }: SortBarProps) => {
  const sortOptions = [
    { value: "yield-desc", label: "Yield (high→low)" },
    { value: "yield-asc", label: "Yield (low→high)" },
    { value: "tenor", label: "Tenor" },
    { value: "rating", label: "Rating" },
  ];

  return (
    <div className="flex items-center justify-between py-4 border-b border-border">
      <p className="text-sm text-muted">
        {resultCount} result{resultCount !== 1 ? 's' : ''}
      </p>
      
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm font-medium text-text">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="px-3 py-1 border border-border rounded-button bg-bg text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};