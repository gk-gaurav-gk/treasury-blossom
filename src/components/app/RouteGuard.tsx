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
    // Check authentication
    const authSession = sessionStorage.getItem('auth_session_v1');
    if (!authSession) {
      setRedirectTo('/auth/login');
      setIsLoading(false);
      return;
    }

    try {
      const session = JSON.parse(authSession);
      if (!session.userId || !session.email) {
        setRedirectTo('/auth/login');
        setIsLoading(false);
        return;
      }

      // Check KYC status
      const kycData = JSON.parse(localStorage.getItem('kyc_v1') || '{}');
      const entityId = session.entityId || 'urban-threads';
      const entityKyc = kycData[entityId];

      // If on onboarding page, allow access
      if (location.pathname === '/app/onboarding') {
        setIsLoading(false);
        return;
      }

      // If KYC not approved and not on onboarding, redirect to onboarding
      if (!entityKyc || entityKyc.status !== 'Approved') {
        setRedirectTo('/app/onboarding');
        setIsLoading(false);
        return;
      }

      // If on /app root, redirect to dashboard
      if (location.pathname === '/app') {
        setRedirectTo('/app/dashboard');
        setIsLoading(false);
        return;
      }

      // All checks passed
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking authentication:', error);
      setRedirectTo('/auth/login');
      setIsLoading(false);
    }
  }, [location.pathname]);

  if (isLoading) {
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
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};