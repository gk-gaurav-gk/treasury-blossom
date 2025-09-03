import { Calendar, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CalendlyCard = () => {
  return (
    <div className="bg-card border border-border rounded-card p-8 shadow-md">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text mb-2 font-display">
          Book a 20-min Demo
        </h2>
        <p className="text-muted">
          See how YourCo Treasury can transform your cash management
        </p>
      </div>

      {/* Calendly Placeholder */}
      <div className="bg-surface border border-border rounded-card p-8 text-center mb-6">
        <Calendar className="w-12 h-12 text-muted mx-auto mb-4" />
        <p className="text-muted mb-4">
          Calendly scheduling widget will be embedded here
        </p>
        <Button 
          variant="default" 
          size="lg"
          asChild
          data-analytics="contact_calendly_click"
        >
          <a href="https://calendly.com/placeholder" target="_blank" rel="noopener noreferrer">
            Book on Calendly
          </a>
        </Button>
      </div>

      {/* Alternative Contact */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="w-4 h-4 text-primary" />
          <span className="text-muted">Or email us:</span>
          <a 
            href="mailto:hello@yourco.example" 
            className="text-primary hover:underline font-medium"
            data-analytics="contact_email_click"
          >
            hello@yourco.example
          </a>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-muted">We aim to respond within 24–48 hours on business days.</span>
        </div>
      </div>
    </div>
  );
};