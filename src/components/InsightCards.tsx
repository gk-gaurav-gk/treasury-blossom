import { StoryCard } from "./StoryCard";
import { PersonaCard } from "./PersonaCard";
import { MetricCard } from "./MetricCard";

export const InsightCards = () => {
  return (
    <section className="py-16 bg-bg">
      <div className="container mx-auto px-6 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StoryCard />
          <PersonaCard />
          <MetricCard />
        </div>
      </div>
    </section>
  );
};