import { createContext, useState, useContext } from "react";

interface AuthContextProps {
  token: string | null;
  setToken: (token: string) => void;
}

type contextProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: contextProps) {
  const [token, setToken] = useState<string | null>(null);

  const values: AuthContextProps = {
    token,
    setToken,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default useAuth;
