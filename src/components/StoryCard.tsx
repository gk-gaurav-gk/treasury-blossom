import { Card } from "./Card";

export const StoryCard = () => {
  return (
    <Card className="transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-text mb-3 font-display">
            The most experienced, specialised team for SME treasury.
          </h3>
          <p className="text-muted leading-relaxed">
            We combine fixed-income expertise with enterprise-grade controls and reporting.
          </p>
        </div>

        <div>
          <a
            href="/contact"
            className="inline-flex items-center text-primary hover:text-primary-600 font-medium underline underline-offset-2"
          >
            Work with us →
          </a>
        </div>

        {/* Customer Avatars */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-gradient-brand rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-accent rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-success rounded-full border-2 border-white"></div>
            </div>
            <p className="text-sm text-muted">Meet our customers</p>
          </div>
        </div>
      </div>
    </Card>
  );
};