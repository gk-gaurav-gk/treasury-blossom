interface FilterGroup {
  label: string;
  options: string[];
}

interface FilterChipsProps {
  filters: FilterGroup[];
}

export const FilterChips = ({ filters }: FilterChipsProps) => {
  return (
    <div className="space-y-3">
      {filters.map((filterGroup) => (
        <div key={filterGroup.label} className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-text min-w-fit">
            {filterGroup.label}:
          </span>
          <div className="flex flex-wrap gap-1">
            {filterGroup.options.map((option) => (
              <span
                key={option}
                className="px-2 py-1 text-xs bg-surface border border-border rounded-md text-muted"
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};