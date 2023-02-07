import { createContext, useState, useContext } from "react";
import { AuthResponse } from "../types/types";

interface AuthContextProps {
  credentials: AuthResponse | null;
  setCredentials: (credentials: AuthResponse) => void;
}

type contextProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export function AuthProvider({ children }: contextProps) {
  const [credentials, setCredentials] = useState<AuthResponse | null>(null);

  const values: AuthContextProps = {
    credentials,
    setCredentials,
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
