import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EvidenceAdmin } from "@/components/security/EvidenceAdmin";

const EvidenceAdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");

  useEffect(() => {
    const authStatus = sessionStorage.getItem('security_admin');
    if (authStatus === '1') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'securityadmin') {
      sessionStorage.setItem('security_admin', '1');
      setIsAuthenticated(true);
    } else {
      alert('Invalid passcode');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <Helmet>
          <title>Evidence Admin - YourCo Treasury</title>
        </Helmet>
        
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleAuth} className="bg-card border border-border rounded-card p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-text mb-6">Security Evidence Admin</h2>
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
            <Button type="submit" className="w-full">Access Admin</Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-24">
      <Helmet>
        <title>Evidence Admin - YourCo Treasury</title>
      </Helmet>

      <div className="container mx-auto px-6 max-w-screen-xl py-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text mb-4 font-display">
            Security Evidence Admin
          </h1>
          <p className="text-muted">
            Manage security and compliance evidence documents.
          </p>
        </div>

        <EvidenceAdmin />
      </div>
    </main>
  );
};

export default EvidenceAdminPage;