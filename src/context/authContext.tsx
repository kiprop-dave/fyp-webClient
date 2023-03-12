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

/*
 *This is a context provider for the authentication
 *It is used to store the JWT token and MQTT credentials
 *The credentials are initially set to null
 *The credentials are then set to the response from the server
 */
export function AuthProvider({ children }: contextProps) {
  const [credentials, setCredentials] = useState<AuthResponse | null>(null);

  const values: AuthContextProps = {
    credentials,
    setCredentials,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

/*
 *This is a custom hook that is used to access the authentication context
 *It will throw an error and restart the development server when changes are made
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default useAuth;
