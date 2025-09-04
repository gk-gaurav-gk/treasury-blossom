import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface RouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard = ({ children }: RouteGuardProps) => {
  const { session, login } = useAuth();
  const location = useLocation();
  const [redirectTo, setRedirectTo] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const path = location.pathname;

    // 1) If no session and user hits /app/onboarding, create demo session
    if (!session && path === "/app/onboarding") {
      login({
        userId: "demo-user",
        email: "demo@treasury.com",
        name: "demo",
        role: "User",
        entityId: "urban-threads",
      });
      setReady(true);
      return;
    }

    // 2) If no session at all, bounce to public home
    if (!session) {
      setRedirectTo("/");
      setReady(true);
      return;
    }

    // 3) Evaluate KYC
    const kyc = JSON.parse(localStorage.getItem("kyc_v1") || "{}");
    const entityKyc = kyc[session.entityId];

    // Allow onboarding if not yet approved
    if (path === "/app/onboarding") {
      if (entityKyc?.status === "Approved") {
        setRedirectTo("/app/dashboard");
      } else {
        setReady(true);
      }
      return;
    }

    // Any /app/* route requires KYC approved
    if (!entityKyc || entityKyc.status !== "Approved") {
      setRedirectTo("/app/onboarding");
      setReady(true);
      return;
    }

    // 4) If user hits /app root, send them to dashboard
    if (path === "/app") {
      setRedirectTo("/app/dashboard");
      setReady(true);
      return;
    }

    setReady(true);
  }, [location.pathname, session, login]);

  if (!ready) {
    return (
      <div className="min-h-screen bg-bg grid place-items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted">Loading…</p>
          <div className="mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // quick bypass for demos
                localStorage.setItem(
                  "kyc_v1",
                  JSON.stringify({ [session?.entityId || "urban-threads"]: { status: "Approved" } })
                );
                setRedirectTo("/app/dashboard");
              }}
            >
              Bypass to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (redirectTo) return <Navigate to={redirectTo} replace />;

  return <>{children}</>;
};