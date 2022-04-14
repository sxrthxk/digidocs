import { useCallback, useContext, useEffect, useState } from "react";
import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/router";

type ContextType = {
  isUser: "yes" | "no" | "loading";
  signOut: () => void;
  requireAuth: () => void;
};

const initialValue: ContextType = {
  isUser: "loading",
  requireAuth: () => {},
  signOut: () => {},
};

const AuthContext = React.createContext(initialValue);

const AuthProvider = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string;
}) => {
  const router = useRouter();

  const [isUser, setIsUser] = useState<"yes" | "no" | "loading">("loading");

  useEffect(() => {
    const f = onAuthStateChanged(auth, (user) => {
      setIsUser(user === null ? "no" : "yes");
    });
    return f;
  }, []);

  const signOut = async () => {
    setIsUser("loading");
    await auth.signOut();
    setIsUser("no");
    router.push("/auth");
  };

  const requireAuth = () => {
    if(!auth.currentUser) {
      if (isUser === "no") {
        typeof window !== "undefined" && router.push("/auth");
        return
      }
    }
    else {
      if(!auth.currentUser.displayName) {
        typeof window !== "undefined" && router.push("/update-profile");

      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isUser,
        signOut,
        requireAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): ContextType => {
  return useContext(AuthContext);
};
