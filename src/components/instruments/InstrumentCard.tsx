import { Clock, Coins, Calendar, ArrowUpDown, ExternalLink } from "lucide-react";
import { Card } from "@/components/Card";
import { Button } from "@/components/ui/button";
import type { Instrument } from "@/data/instruments";

interface InstrumentCardProps {
  instrument: Instrument;
}

const getRatingColor = (rating: string) => {
  switch (rating) {
    case "Sovereign": return "bg-slate-100 text-slate-700";
    case "AAA": return "bg-green-100 text-green-700";
    case "AA+": return "bg-teal-100 text-teal-700";
    case "AA": return "bg-blue-100 text-blue-700";
    case "A+": return "bg-amber-100 text-amber-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

export const InstrumentCard = ({ instrument }: InstrumentCardProps) => {
  const handleClick = () => {
    window.location.href = `/instruments/${instrument.slug}`;
  };

  return (
    <div 
      className="cursor-pointer group"
      data-analytics="instrument_card"
      data-slug={instrument.slug}
      onClick={handleClick}
    >
      <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-semibold text-text font-display group-hover:text-primary transition-colors">
            {instrument.name}
          </h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRatingColor(instrument.rating)}`}>
            {instrument.rating}
          </span>
        </div>

        {/* Key Facts */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-muted" />
            <span className="text-sm text-text">
              Indicative: {instrument.indicative_yield_min}–{instrument.indicative_yield_max}%
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted" />
            <span className="text-sm text-text">
              Tenor: {instrument.tenor_label}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-muted" />
            <span className="text-sm text-text">
              Min lot: {instrument.min_lot}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted" />
            <span className="text-sm text-text">
              Liquidity: {instrument.liquidity}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-muted" />
            <span className="text-sm text-text">
              Settlement: {instrument.settlement}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/instruments/${instrument.slug}`;
            }}
          >
            View details
          </Button>
          <a
            href={`/instruments/${instrument.slug}#risks`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-primary hover:text-primary-600 underline underline-offset-2"
          >
            Risks & tax →
          </a>
        </div>
      </Card>
    </div>
  );
};