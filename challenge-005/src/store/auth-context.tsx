import React, { ReactNode, useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (_email?: string, _password?: string) => {},
});

interface AuthContextProviderProps {
  children?: ReactNode;
}

export const AuthContextProvider = (props: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInfo === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  function logoutHandler() {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }

  function loginHandler() {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
