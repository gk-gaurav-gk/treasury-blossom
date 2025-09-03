import { Button } from "@/components/ui/button";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductSubNav } from "@/components/product/ProductSubNav";
import { WorkflowSection } from "@/components/product/WorkflowSection";
import { KYCSection } from "@/components/product/KYCSection";
import { EscrowSection } from "@/components/product/EscrowSection";
import { InvestSection } from "@/components/product/InvestSection";
import { ReportSection } from "@/components/product/ReportSection";
import { SecuritySection } from "@/components/product/SecuritySection";
import { FAQSection } from "@/components/product/FAQSection";
import { BottomCTA } from "@/components/product/BottomCTA";

const Product = () => {
  console.log("Product component rendering...");
  
  return (
    <main className="min-h-screen pt-24">
      <ProductHero />
      <ProductSubNav />
      
      <div className="space-y-24">
        <WorkflowSection />
        <KYCSection />
        <EscrowSection />
        <InvestSection />
        <ReportSection />
        <SecuritySection />
        <FAQSection />
      </div>

      <BottomCTA />

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
    </main>
  );
};

export default Product;