import React from "react";
import AuthProvider from "../context";
import Navbar from "./Navbar";

const Layout = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string;
}) => {
  return (
    <AuthProvider>
      <Navbar />
      <>{children}</>
    </AuthProvider>
  );
};

export default Layout;
