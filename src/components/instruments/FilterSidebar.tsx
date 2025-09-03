import { Search } from "lucide-react";
import type { FilterState } from "@/pages/Instruments";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export const FilterSidebar = ({ filters, onFilterChange, onClearFilters }: FilterSidebarProps) => {
  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleCheckboxChange = (category: keyof FilterState, value: string, checked: boolean) => {
    const currentValues = filters[category] as string[];
    const newValues = checked 
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value);
    
    onFilterChange({ ...filters, [category]: newValues });
  };

  const tenorOptions = ["≤30d", "31–90d", "91–182d", "183–364d", "1–3y", ">3y"];
  const ratingOptions = ["Sovereign", "AAA", "AA+", "AA", "A+"];
  const liquidityOptions = ["On maturity", "T+1", "Open ended"];
  const taxOptions = ["TDS", "Indexation eligible", "Dividend"];

  return (
    <div 
      className="bg-bg rounded-card p-6 shadow-md lg:sticky lg:top-32 space-y-6"
      data-analytics="instrument_filter_change"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-text font-display">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-primary hover:text-primary-600 underline underline-offset-2"
        >
          Reset
        </button>
      </div>

      {/* Search */}
      <div>
        <label htmlFor="search" className="block text-sm font-medium text-text mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            id="search"
            type="text"
            placeholder="Search by name or issuer..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-button bg-surface text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Tenor */}
      <fieldset>
        <legend className="text-sm font-medium text-text mb-3">Tenor</legend>
        <div className="space-y-2">
          {tenorOptions.map((tenor) => (
            <label key={tenor} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.tenors.includes(tenor)}
                onChange={(e) => handleCheckboxChange("tenors", tenor, e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-text">{tenor}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Rating */}
      <fieldset>
        <legend className="text-sm font-medium text-text mb-3">Rating</legend>
        <div className="space-y-2">
          {ratingOptions.map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.ratings.includes(rating)}
                onChange={(e) => handleCheckboxChange("ratings", rating, e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-text">{rating}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Liquidity */}
      <fieldset>
        <legend className="text-sm font-medium text-text mb-3">Liquidity</legend>
        <div className="space-y-2">
          {liquidityOptions.map((liquidity) => (
            <label key={liquidity} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.liquidity.includes(liquidity)}
                onChange={(e) => handleCheckboxChange("liquidity", liquidity, e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-text">{liquidity}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Tax */}
      <fieldset>
        <legend className="text-sm font-medium text-text mb-3">Tax</legend>
        <div className="space-y-2">
          {taxOptions.map((tax) => (
            <label key={tax} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.tax.includes(tax)}
                onChange={(e) => handleCheckboxChange("tax", tax, e.target.checked)}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
              />
              <span className="text-sm text-text">{tax}</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};