import { createContext, ReactNode, useState } from "react";

export interface AuthContextType {
  isAuth: boolean;
  login: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  login: () => {},
});

interface AuthContextProviderProps {
  children?: ReactNode;
}

const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function loginHandler() {
    setIsAuthenticated(true);
  }

  return (
    <AuthContext.Provider
      value={{ login: loginHandler, isAuth: isAuthenticated }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
