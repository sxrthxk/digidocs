import { useContext } from "react";
import React from "react";

interface ContextType {}

const initialValue: ContextType = {};

const AuthContext = React.createContext(initialValue);

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string;
}) => {
  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider