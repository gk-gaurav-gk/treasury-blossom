import { HeroSection } from "@/components/HeroSection";
import { ProofBar } from "@/components/ProofBar";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProofBar />
      
      {/* Footer placeholder */}
      <footer className="py-8 bg-bg border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} YourCo Treasury. 
            <a href="/legal" className="ml-2 hover:text-text underline">
              Legal
            </a>
          </p>
        </div>
      </footer>
      
      {/* Disclaimer anchor */}
      <div id="disclaimer" className="sr-only">
        Disclaimer content will be added here
      </div>
    </main>
  );
};

export default Index;
