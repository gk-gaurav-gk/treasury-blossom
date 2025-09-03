import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { LadderPlanner } from "@/components/calculators/LadderPlanner";
import { AfterTaxCalculator } from "@/components/calculators/AfterTaxCalculator";  
import { BreakevenCalculator } from "@/components/calculators/BreakevenCalculator";

const Calculators = () => {
  const [activeCalc, setActiveCalc] = useState("ladder");

  const scrollToSection = (sectionId: string) => {
    setActiveCalc(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>Calculators - YourCo Treasury</title>
        <meta name="description" content="Plan ladders, compare after-tax returns vs FDs, and check fee break-even with our treasury calculators." />
      </Helmet>

      {/* Header */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-display">
              Calculators
            </h1>
            <p className="text-xl text-muted mb-8">
              Plan ladders, compare after-tax returns, and check fee break-even.
            </p>
          </div>

          {/* Calculator Selector */}
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Button
              variant={activeCalc === "ladder" ? "default" : "outline"}
              size="lg"
              onClick={() => scrollToSection("ladder")}
              className="h-auto p-6 flex-col gap-2"
            >
              <span className="font-semibold">Ladder Planner</span>
              <span className="text-sm opacity-75">Build systematic ladders</span>
            </Button>
            
            <Button
              variant={activeCalc === "aftertax" ? "default" : "outline"}
              size="lg"
              onClick={() => scrollToSection("aftertax")}
              className="h-auto p-6 flex-col gap-2"
            >
              <span className="font-semibold">After-Tax vs FD</span>
              <span className="text-sm opacity-75">Compare net returns</span>
            </Button>
            
            <Button
              variant={activeCalc === "breakeven" ? "default" : "outline"}
              size="lg"
              onClick={() => scrollToSection("breakeven")}
              className="h-auto p-6 flex-col gap-2"
            >
              <span className="font-semibold">Break-even vs Fees</span>
              <span className="text-sm opacity-75">Check fee coverage</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <div className="space-y-24">
        <LadderPlanner />
        <AfterTaxCalculator />
        <BreakevenCalculator />
      </div>
    </main>
  );
};

export default Calculators;