import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Session = {
  userId: string;
  email: string;
  name: string;
  role: "Owner" | "Approver" | "Preparer" | "Auditor" | "User";
  entityId: string;
  loginTime: string;
};

type AuthContextType = {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  session: Session | null;
  login: (s: Omit<Session, "loginTime">) => void;
  logout: () => void;
  loading: boolean;
};

const KEY = "auth_session_v1";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) setSession(JSON.parse(raw));
    } catch {}
    setLoading(false);
  }, []);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const login = (s: Omit<Session, "loginTime">) => {
    const val: Session = { ...s, loginTime: new Date().toISOString() };
    sessionStorage.setItem(KEY, JSON.stringify(val));
    setSession(val);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    sessionStorage.removeItem(KEY);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ isLoginModalOpen, openLoginModal, closeLoginModal, session, login, logout, loading }}>
      {children}
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