import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "bordered";
}

export const Card = ({ children, className, variant = "default" }: CardProps) => {
  const variants = {
    default: "bg-card border border-border",
    elevated: "bg-card shadow-md border border-border",
    bordered: "bg-card border-2 border-border",
  };

  return (
    <div className={cn(
      "rounded-card p-6",
      variants[variant],
      className
    )}>
      {children}
    </div>
  );
};