import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import NotFound from "./pages/NotFound";
import { AppHeader } from "./components/AppHeader";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
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
            <Route path="/compliance" element={<Compliance />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
