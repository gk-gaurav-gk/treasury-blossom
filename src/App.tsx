import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/auth/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Product from "./pages/Product";
import Instruments from "./pages/Instruments";
import InstrumentDetail from "./pages/InstrumentDetail";
import Pricing from "./pages/Pricing";
import Security from "./pages/Security";
import Compliance from "./pages/Compliance";
import Resources from "./pages/Resources";
import ResourceDetail from "./pages/ResourceDetail";
import Calculators from "./pages/Calculators";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import SMETreasury from "./pages/solutions/SMETreasury";
import CAPartners from "./pages/solutions/CAPartners";
import PrintTerms from "./pages/legal/PrintTerms";
import PrintPrivacy from "./pages/legal/PrintPrivacy";
import PrintRisk from "./pages/legal/PrintRisk";
import PrintCookies from "./pages/legal/PrintCookies";
import ResourcesAdmin from "./pages/admin/ResourcesAdmin";
import EvidenceAdminPage from "./pages/security/EvidenceAdminPage";
import EvidenceDetail from "./pages/security/EvidenceDetail";
import EvidencePrint from "./pages/security/EvidencePrint";
import GrievancePrint from "./pages/compliance/GrievancePrint";
import PartnerPortal from "./pages/PartnerPortal";
import NotFound from "./pages/NotFound";
import { AppHeader } from "./components/AppHeader";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoginModalOpen, closeLoginModal } = useAuth();
  
  return (
    <>
      <Toaster />
      <Sonner />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <BrowserRouter>
        <AppHeader />
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/product" element={<Product />} />
            <Route path="/instruments" element={<Instruments />} />
            <Route path="/instruments/:slug" element={<InstrumentDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/:slug" element={<ResourceDetail />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/security" element={<Security />} />
            <Route path="/security/evidence-admin" element={<EvidenceAdminPage />} />
            <Route path="/security/evidence/:slug" element={<EvidenceDetail />} />
            <Route path="/security/evidence/print/:slug" element={<EvidencePrint />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/compliance/grievance/print/:ticketId" element={<GrievancePrint />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/solutions/sme-treasury" element={<SMETreasury />} />
            <Route path="/solutions/ca-partners" element={<CAPartners />} />
            <Route path="/partner" element={<PartnerPortal />} />
            <Route path="/legal/print/terms" element={<PrintTerms />} />
            <Route path="/legal/print/privacy" element={<PrintPrivacy />} />
            <Route path="/legal/print/risk" element={<PrintRisk />} />
            <Route path="/legal/print/cookies" element={<PrintCookies />} />
            <Route path="/admin/resources" element={<ResourcesAdmin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
