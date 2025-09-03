import { Button } from "@/components/ui/button";

interface TagFilterBarProps {
  options: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TagFilterBar = ({ options, activeFilter, onFilterChange }: TagFilterBarProps) => {
  return (
    <div 
      className="flex flex-wrap gap-2 justify-center"
      data-analytics="resources_filter_change"
    >
      {options.map((option) => (
        <Button
          key={option}
          variant={activeFilter === option ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(option)}
          className="rounded-full"
        >
          {option}
        </Button>
      ))}
    </div>
  );
};