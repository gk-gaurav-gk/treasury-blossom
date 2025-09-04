import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

export const AppHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openLoginModal } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border/20",
      isScrolled ? "header-blur" : "bg-bg/80 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <div className="flex items-center">
            <div className="relative">
              <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
                Reserve Craft
              </h1>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <a href="/" className="px-4 py-2 text-sm font-medium text-text hover:text-primary hover:bg-surface/50 rounded-lg transition-all duration-200">
              Home
            </a>
            <a href="/product" className="px-4 py-2 text-sm font-medium text-muted hover:text-text hover:bg-surface/50 rounded-lg transition-all duration-200">
              Product
            </a>
            <a href="/instruments" className="px-4 py-2 text-sm font-medium text-muted hover:text-text hover:bg-surface/50 rounded-lg transition-all duration-200">
              Instruments
            </a>
            <a href="/pricing" className="px-4 py-2 text-sm font-medium text-muted hover:text-text hover:bg-surface/50 rounded-lg transition-all duration-200">
              Pricing
            </a>
            <a href="/resources" className="px-4 py-2 text-sm font-medium text-muted hover:text-text hover:bg-surface/50 rounded-lg transition-all duration-200">
              Resources
            </a>
            <a href="/calculators" className="px-4 py-2 text-sm font-medium text-muted hover:text-text hover:bg-surface/50 rounded-lg transition-all duration-200">
              Calculators
            </a>
            <a href="/security" className="px-4 py-2 text-sm font-medium text-muted hover:text-text hover:bg-surface/50 rounded-lg transition-all duration-200">
              Security
            </a>
            <a href="/compliance" className="px-4 py-2 text-sm font-medium text-muted hover:text-text hover:bg-surface/50 rounded-lg transition-all duration-200">
              Compliance
            </a>
          </nav>

          {/* CTAs */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="default" className="hidden sm:inline-flex" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
            <Button variant="default" size="default" className="shadow-lg shadow-primary/20" onClick={openLoginModal}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};