import React, { useEffect } from "react";
import AuthProvider, { useAuth } from "../context";
import { auth } from "../firebase/config";
import Navbar from "./Navbar";

const Layout = ({
  children,
  fullWidth = false,
  authRequired = false,
}: {
  children?: JSX.Element | JSX.Element[] | string;
  fullWidth?: boolean;
  authRequired?: boolean;
}) => {
  const { requireAuth, isUser } = useAuth();
  useEffect(() => {
    authRequired && requireAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

  return (
    <>
      <Navbar />
      <div className={`${!fullWidth && "max-w-4xl"} m-auto`}>{children}</div>
    </>
  );
};

export default Layout;
