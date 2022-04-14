import React, { useEffect } from "react";
import AuthProvider, { useAuth } from "../context";
import { auth } from "../firebase/config";
import Navbar from "./Navbar";

const Layout = ({
  children,
  authRequired = false,
}: {
  children?: JSX.Element | JSX.Element[] | string;
  authRequired?: boolean;
}) => {
  const { requireAuth, isUser } = useAuth();
  useEffect(() => {
    console.log(requireAuth)
    authRequired && requireAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl m-auto">{children}</div>
    </>
  );
};

export default Layout;
