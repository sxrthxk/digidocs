import React from "react";
import AuthProvider from "../context";
import Navbar from "./Navbar";

const Layout = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string;
}) => {
  return (
    <>
      <Navbar />
      <>{children}</>
    </>
  );
};

export default Layout;
