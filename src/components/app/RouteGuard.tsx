import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard = ({ children }: RouteGuardProps) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    console.log('RouteGuard: Current path:', location.pathname);
    
    // Check authentication
    const authSession = sessionStorage.getItem('auth_session_v1');
    console.log('RouteGuard: Auth session exists:', !!authSession);
    
    if (!authSession) {
      console.log('RouteGuard: No auth session, redirecting to home');
      setRedirectTo('/');
      setIsLoading(false);
      return;
    }

    try {
      const session = JSON.parse(authSession);
      console.log('RouteGuard: Session data:', session);
      
      if (!session.userId || !session.email) {
        console.log('RouteGuard: Invalid session data, redirecting to home');
        setRedirectTo('/');
        setIsLoading(false);
        return;
      }

      // Check KYC status
      const kycData = JSON.parse(localStorage.getItem('kyc_v1') || '{}');
      const entityId = session.entityId || 'urban-threads';
      const entityKyc = kycData[entityId];
      console.log('RouteGuard: KYC data for entity:', entityId, entityKyc);

      // If on onboarding page, allow access
      if (location.pathname === '/app/onboarding') {
        console.log('RouteGuard: On onboarding page, allowing access');
        setIsLoading(false);
        return;
      }

      // If KYC not approved and not on onboarding, redirect to onboarding
      if (!entityKyc || entityKyc.status !== 'Approved') {
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
      console.error('Error checking authentication:', error);
      setRedirectTo('/');
      setIsLoading(false);
    }
  }, [location.pathname]);

  if (isLoading) {
    console.log('RouteGuard: Showing loading screen');
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted">Loading...</p>
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