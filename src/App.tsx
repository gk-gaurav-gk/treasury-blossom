import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/auth/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import { RouteGuard } from "@/components/app/RouteGuard";
import { AppLayout } from "@/components/app/AppLayout";
import Index from "./pages/Index";
import Onboarding from "./pages/app/Onboarding";
import Dashboard from "./pages/app/Dashboard";
import Ledger from "./pages/app/Ledger";
import Invest from "./pages/app/Invest";
import Orders from "./pages/app/Orders";
import Approvals from "./pages/app/Approvals";
import Portfolio from "./pages/app/Portfolio";
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

// Placeholder component for app routes under development
const ComingSoon = () => (
  <div className="min-h-screen bg-bg flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-text mb-4">Coming Soon</h2>
      <p className="text-muted">This feature is under development</p>
    </div>
  </div>
);

const AppContent = () => {
  const { isLoginModalOpen, closeLoginModal } = useAuth();
  
  console.log('App: AppContent rendered');
  
  return (
    <>
      <Toaster />
      <Sonner />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      <BrowserRouter>
        <Routes>
          {/* App Routes - Protected */}
          <Route path="/app" element={
            <RouteGuard>
              <div>App Root - This should redirect</div>
            </RouteGuard>
          } />
          
          <Route path="/app/onboarding" element={
            <RouteGuard>
              <Onboarding />
            </RouteGuard>
          } />
          
          <Route path="/app/dashboard" element={
            <RouteGuard>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </RouteGuard>
          } />
          
          <Route path="/app/ledger" element={
            <RouteGuard>
              <AppLayout>
                <Ledger />
              </AppLayout>
            </RouteGuard>
          } />
          
          <Route path="/app/invest" element={
            <RouteGuard>
              <AppLayout>
                <Invest />
              </AppLayout>
            </RouteGuard>
          } />
          
          <Route path="/app/orders" element={
            <RouteGuard>
              <AppLayout>
                <Orders />
              </AppLayout>
            </RouteGuard>
          } />
          
          <Route path="/app/approvals" element={
            <RouteGuard>
              <AppLayout>
                <Approvals />
              </AppLayout>
            </RouteGuard>
          } />
          
          <Route path="/app/portfolio" element={
            <RouteGuard>
              <AppLayout>
                <Portfolio />
              </AppLayout>
            </RouteGuard>
          } />
          
          <Route path="/app/*" element={
            <RouteGuard>
              <AppLayout>
                <ComingSoon />
              </AppLayout>
            </RouteGuard>
          } />
          
          {/* Marketing/Public Routes */}
          <Route path="/" element={
            <>
              <AppHeader />
              <Index />
            </>
          } />
          
          <Route path="/product" element={
            <>
              <AppHeader />
              <Product />
            </>
          } />
          
          <Route path="/instruments" element={
            <>
              <AppHeader />
              <Instruments />
            </>
          } />
          
          <Route path="/instruments/:slug" element={
            <>
              <AppHeader />
              <InstrumentDetail />
            </>
          } />
          
          <Route path="/pricing" element={
            <>
              <AppHeader />
              <Pricing />
            </>
          } />
          
          <Route path="/resources" element={
            <>
              <AppHeader />
              <Resources />
            </>
          } />
          
          <Route path="/resources/:slug" element={
            <>
              <AppHeader />
              <ResourceDetail />
            </>
          } />
          
          <Route path="/calculators" element={
            <>
              <AppHeader />
              <Calculators />
            </>
          } />
          
          <Route path="/contact" element={
            <>
              <AppHeader />
              <Contact />
            </>
          } />
          
          <Route path="/security" element={
            <>
              <AppHeader />
              <Security />
            </>
          } />
          
          <Route path="/security/evidence-admin" element={
            <>
              <AppHeader />
              <EvidenceAdminPage />
            </>
          } />
          
          <Route path="/security/evidence/:slug" element={
            <>
              <AppHeader />
              <EvidenceDetail />
            </>
          } />
          
          <Route path="/security/evidence/print/:slug" element={<EvidencePrint />} />
          
          <Route path="/compliance" element={
            <>
              <AppHeader />
              <Compliance />
            </>
          } />
          
          <Route path="/compliance/grievance/print/:ticketId" element={<GrievancePrint />} />
          
          <Route path="/legal" element={
            <>
              <AppHeader />
              <Legal />
            </>
          } />
          
          <Route path="/solutions/sme-treasury" element={
            <>
              <AppHeader />
              <SMETreasury />
            </>
          } />
          
          <Route path="/solutions/ca-partners" element={
            <>
              <AppHeader />
              <CAPartners />
            </>
          } />
          
          <Route path="/partner" element={
            <>
              <AppHeader />
              <PartnerPortal />
            </>
          } />
          
          {/* Print Routes (no header) */}
          <Route path="/legal/print/terms" element={<PrintTerms />} />
          <Route path="/legal/print/privacy" element={<PrintPrivacy />} />
          <Route path="/legal/print/risk" element={<PrintRisk />} />
          <Route path="/legal/print/cookies" element={<PrintCookies />} />
          
          {/* Admin Routes */}
          <Route path="/admin/resources" element={
            <>
              <AppHeader />
              <ResourcesAdmin />
            </>
          } />
          
          {/* 404 */}
          <Route path="*" element={
            <>
              <AppHeader />
              <NotFound />
            </>
          } />
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