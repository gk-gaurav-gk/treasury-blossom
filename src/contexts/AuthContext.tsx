import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSession, setSession, clearSession, type Session } from '@/utils/auth';

interface AuthContextType {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  session: Session | null;
  setAuthSession: (s: Session | null, persist?: boolean) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [session, setSessionState] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // Hydrate session on mount (Remember me support)
  useEffect(() => {
    try {
      const s = getSession();
      if (s) setSessionState(s);
    } catch (error) {
      console.error('Error hydrating session:', error);
    }
    setLoading(false);
  }, []);

  const setAuthSession = (s: Session | null, persist?: boolean) => {
    if (!s) {
      clearSession();
      setSessionState(null);
      return;
    }
    setSession(s, { persist });
    setSessionState(s);
  };

  return (
    <AuthContext.Provider value={{
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal,
      session,
      setAuthSession,
      loading
    }}>
      {loading ? (
        <div style={{padding: 24}}>Loading…</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};