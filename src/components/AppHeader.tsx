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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "header-blur" : "bg-transparent"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-display font-bold text-text">
              YourCo Treasury
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-text hover:text-primary transition-colors font-medium">Home</a>
            <a href="/product" className="text-muted hover:text-text transition-colors font-medium">Product</a>
            <a href="/instruments" className="text-muted hover:text-text transition-colors font-medium">Instruments</a>
            <a href="/pricing" className="text-muted hover:text-text transition-colors font-medium">Pricing</a>
            <a href="/resources" className="text-muted hover:text-text transition-colors font-medium">Resources</a>
            <a href="/calculators" className="text-muted hover:text-text transition-colors font-medium">Calculators</a>
            <a href="/security" className="text-muted hover:text-text transition-colors font-medium">Security</a>
            <a href="/compliance" className="text-muted hover:text-text transition-colors font-medium">Compliance</a>
          </nav>

          {/* CTAs */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="default" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
            <Button variant="solid" size="default" onClick={openLoginModal}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};