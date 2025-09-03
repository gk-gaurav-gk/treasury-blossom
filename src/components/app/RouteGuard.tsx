import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getSession, setSession, seedUsersIfMissing, seedEntityIfMissing } from '@/utils/auth';

interface RouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard = ({ children }: RouteGuardProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    console.log('RouteGuard: Current path:', location.pathname);
    
    // Always allow onboarding (helps direct URL access for demo)
    if (location.pathname.startsWith('/app/onboarding')) {
      console.log('RouteGuard: Allowing onboarding access');
      // Auto-create demo session if none exists
      const session = getSession();
      if (!session) {
        console.log('RouteGuard: Creating auto demo session for onboarding');
        seedUsersIfMissing();
        seedEntityIfMissing();
        setSession({ 
          userId: 'u2', 
          email: 'ops@demo.in', 
          role: 'Preparer', 
          entityId: 'entity-001' 
        });
        
        // Ensure KYC entry exists
        const kycAll = JSON.parse(localStorage.getItem('kyc_v1') || '{}');
        if (!kycAll['entity-001']) {
          kycAll['entity-001'] = { status: 'Draft', ts: Date.now() };
          localStorage.setItem('kyc_v1', JSON.stringify(kycAll));
        }
      }
      setIsLoading(false);
      return;
    }

    // For all other /app/* routes, require session
    const session = getSession();
    if (!session) {
      console.log('RouteGuard: No session, redirecting home');
      setRedirectTo('/');
      setIsLoading(false);
      return;
    }

    // Enforce KYC Approved for all other /app/* routes
    try {
      const entityId = session.entityId || 'entity-001';
      const kycAll = JSON.parse(localStorage.getItem('kyc_v1') || '{}');
      const kyc = kycAll[entityId];
      
      console.log('RouteGuard: KYC check for entity:', entityId, kyc);
      
      if (!kyc || kyc.status !== 'Approved') {
        console.log('RouteGuard: KYC not approved, redirecting to onboarding');
        setRedirectTo('/app/onboarding');
        setIsLoading(false);
        return;
      }

      // If on /app root, redirect to dashboard
      if (location.pathname === '/app') {
        console.log('RouteGuard: On app root, redirecting to dashboard');
        setRedirectTo('/app/dashboard');
        setIsLoading(false);
        return;
      }

      // All checks passed
      console.log('RouteGuard: All checks passed, rendering children');
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking KYC:', error);
      setRedirectTo('/app/onboarding');
      setIsLoading(false);
    }
  }, [location.pathname]);

  // Quick access function for testing
  const bypassToApprovedKYC = () => {
    const entityId = 'urban-threads';
    const kycData = JSON.parse(localStorage.getItem('kyc_v1') || '{}');
    kycData[entityId] = {
      status: 'Approved',
      entityData: { legalName: 'Urban Threads Pvt Ltd' },
      approvedAt: new Date().toISOString()
    };
    localStorage.setItem('kyc_v1', JSON.stringify(kycData));
    
    // Set auth session if needed
    if (!sessionStorage.getItem('auth_session_v1')) {
      sessionStorage.setItem('auth_session_v1', JSON.stringify({
        userId: 'user1',
        email: 'cfo@demo.in',
        entityId: 'urban-threads'
      }));
    }
    
    window.location.reload();
  };

  if (isLoading) {
    console.log('RouteGuard: Showing loading screen');
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted">Loading...</p>
          
          {/* Quick access for testing */}
          <div className="mt-8 p-4 border border-border rounded-lg bg-card">
            <p className="text-sm text-muted mb-2">Quick Access (Testing)</p>
            <Button 
              onClick={bypassToApprovedKYC}
              variant="outline"
              size="sm"
            >
              Go to Dashboard with Approved KYC
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (redirectTo) {
    console.log('RouteGuard: Redirecting to:', redirectTo);
    return <Navigate to={redirectTo} replace />;
  }

  console.log('RouteGuard: Rendering children');
  return <>{children}</>;
};