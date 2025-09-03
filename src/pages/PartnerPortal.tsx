import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PartnerSummary } from "@/components/partner/PartnerSummary";
import { PartnerTabs } from "@/components/partner/PartnerTabs";

const PartnerPortal = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");

  useEffect(() => {
    const authStatus = sessionStorage.getItem('partner_portal');
    if (authStatus === '1') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'partner') {
      sessionStorage.setItem('partner_portal', '1');
      setIsAuthenticated(true);
    } else {
      alert('Invalid passcode');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Helmet>
          <title>Partner Portal - YourCo Treasury</title>
        </Helmet>
        
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleAuth} className="bg-card border border-border rounded-card p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-text mb-6">Partner Portal Access</h2>
            <p className="text-muted mb-4">Enter your partner credentials to access the portal.</p>
            <div className="mb-4">
              <Label htmlFor="passcode">Passcode</Label>
              <Input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">Access Portal</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>Partner Portal - YourCo Treasury</title>
        <meta name="description" content="Partner portal for CAs and channel partners to track referrals, KYC status, and payouts." />
      </Helmet>

      {/* Header */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 font-display">
              Partner Portal
            </h1>
            <p className="text-xl text-muted">
              Refer clients, track status, and view payouts.
            </p>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <PartnerSummary />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-bg">
        <div className="container mx-auto px-6 max-w-screen-xl">
          <PartnerTabs />
        </div>
      </section>
    </main>
  );
};

export default PartnerPortal;