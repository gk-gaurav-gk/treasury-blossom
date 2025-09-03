import { cn } from "@/lib/utils";

interface BadgePillProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning";
}

export const BadgePill = ({ children, className, variant = "default" }: BadgePillProps) => {
  const variants = {
    default: "bg-surface text-muted border-border",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
  };

  return (
    <div className={cn(
      "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border",
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
};