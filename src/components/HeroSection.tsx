import { Button } from "@/components/ui/button";
import { BadgePill } from "./BadgePill";
import heroPortrait from "@/assets/hero-portrait.jpg";
import { TrendingUp, PieChart } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-24 pb-16 bg-bg">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Copy & CTAs */}
          <div className="space-y-8">
            <BadgePill variant="default">
              Compliance-first; registration in progress
            </BadgePill>
            
            <div className="space-y-6">
              <h1 className="h1 text-text leading-tight">
                Treasury, built for 
                <span className="gradient-text"> Indian SMEs.</span>
              </h1>
              
              <p className="body text-muted max-w-lg">
                Deploy idle cash into compliant, low-risk instruments (T-Bills, G-Secs, high-grade debt) 
                with maker-checker controls, escrow, and one-click reports.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="solid" 
                size="lg"
                data-analytics="cta_demo"
              >
                Book a 20-min demo
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                data-analytics="cta_onboarding"
              >
                Start onboarding
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <a href="#" className="text-primary hover:text-primary-600 font-medium text-sm underline underline-offset-4">
                  Download SME Treasury Playbook (PDF)
                </a>
              </div>
              <div>
                <a 
                  href="#how-it-works" 
                  className="text-muted hover:text-text font-medium text-sm underline underline-offset-4"
                >
                  How it works ↓
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Visuals */}
          <div className="relative">
            {/* Main Portrait Card */}
            <div className="relative z-10 bg-card rounded-card shadow-lg overflow-hidden">
              <img 
                src={heroPortrait} 
                alt="Professional business executive managing treasury operations"
                className="w-full h-80 object-cover"
              />
            </div>

            {/* Analytics Card Overlay */}
            <div className="absolute -bottom-6 -left-6 z-20 bg-card rounded-card shadow-md p-6 max-w-xs border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-brand rounded-full flex items-center justify-center">
                  <PieChart className="w-4 h-4 text-white" />
                </div>
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <p className="text-sm font-medium text-text mb-1">
                Manage your treasury,
              </p>
              <p className="text-sm font-medium gradient-text">
                simply.
              </p>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-brand opacity-10 rounded-full blur-xl"></div>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent opacity-20 rounded-full blur-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};