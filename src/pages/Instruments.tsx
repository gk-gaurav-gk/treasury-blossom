import { useState, useMemo } from "react";
import { instruments } from "@/data/instruments";
import { FilterSidebar } from "@/components/instruments/FilterSidebar";
import { SortBar } from "@/components/instruments/SortBar";
import { InstrumentCard } from "@/components/instruments/InstrumentCard";

export interface FilterState {
  search: string;
  tenors: string[];
  ratings: string[];
  liquidity: string[];
  tax: string[];
}

const Instruments = () => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    tenors: [],
    ratings: [],
    liquidity: [],
    tax: []
  });
  
  const [sortBy, setSortBy] = useState("yield-desc");

  const filteredAndSortedInstruments = useMemo(() => {
    let filtered = instruments.filter(instrument => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (!instrument.name.toLowerCase().includes(searchLower) && 
            !instrument.issuer.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // Tenor filter
      if (filters.tenors.length > 0) {
        const days = instrument.tenor_days;
        let tenorMatch = false;
        
        filters.tenors.forEach(tenor => {
          switch (tenor) {
            case "≤30d":
              if (days <= 30) tenorMatch = true;
              break;
            case "31–90d":
              if (days >= 31 && days <= 90) tenorMatch = true;
              break;
            case "91–182d":
              if (days >= 91 && days <= 182) tenorMatch = true;
              break;
            case "183–364d":
              if (days >= 183 && days <= 364) tenorMatch = true;
              break;
            case "1–3y":
              if (days >= 365 && days <= 1095) tenorMatch = true;
              break;
            case ">3y":
              if (days > 1095) tenorMatch = true;
              break;
          }
        });
        
        if (!tenorMatch) return false;
      }

      // Rating filter
      if (filters.ratings.length > 0) {
        if (!filters.ratings.includes(instrument.rating)) return false;
      }

      // Liquidity filter
      if (filters.liquidity.length > 0) {
        if (!filters.liquidity.includes(instrument.liquidity)) return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "yield-desc":
          return b.indicative_yield_max - a.indicative_yield_max;
        case "yield-asc":
          return a.indicative_yield_max - b.indicative_yield_max;
        case "tenor":
          return a.tenor_days - b.tenor_days;
        case "rating":
          const ratingOrder = { "Sovereign": 0, "AAA": 1, "AA+": 2, "AA": 3, "A+": 4 };
          return (ratingOrder[a.rating as keyof typeof ratingOrder] || 5) - 
                 (ratingOrder[b.rating as keyof typeof ratingOrder] || 5);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      tenors: [],
      ratings: [],
      liquidity: [],
      tax: []
    });
  };

  return (
    <main className="min-h-screen pt-24">
      {/* Header */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 font-display">
              Instruments
            </h1>
            <p className="text-muted text-xl">
              Compliant fixed-income options for SME treasuries
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filter Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar 
                filters={filters} 
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
              />
            </div>

            {/* Results */}
            <div className="lg:col-span-3 space-y-6">
              <SortBar 
                sortBy={sortBy}
                onSortChange={setSortBy}
                resultCount={filteredAndSortedInstruments.length}
              />

              {filteredAndSortedInstruments.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredAndSortedInstruments.map((instrument) => (
                    <InstrumentCard
                      key={instrument.slug}
                      instrument={instrument}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-semibold text-text mb-4">No instruments found</h3>
                  <p className="text-muted mb-6">Try adjusting your filters to see more results.</p>
                  <button
                    onClick={clearFilters}
                    className="text-primary hover:text-primary-600 font-medium underline underline-offset-2"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="py-8 bg-bg border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} YourCo Treasury. 
            <a href="/legal" className="ml-2 hover:text-text underline">
              Legal
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Instruments;