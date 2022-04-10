import { useCallback, useContext, useEffect, useState } from "react";
import React from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/router";

type ContextType = {
  signInWithGoogle: () => void;
  isUser: "yes" | "no" | "loading";
  signOut: () => void;
};

const initialValue: ContextType = {
  signInWithGoogle: () => {},
  isUser: "loading",
  signOut: () => {}
};

const AuthContext = React.createContext(initialValue);

const AuthProvider = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string;
}) => {
  const router = useRouter();

  const signInWithGoogle = useCallback(async () => {
    setIsUser("loading");
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    router.push("/");
  }, [router]);

  const signOut = async () => {
    setIsUser('loading')
    await auth.signOut()
    setIsUser('no')
    router.push('/auth')
  }

  const [isUser, setIsUser] = useState<"yes" | "no" | "loading">("no");

  useEffect(() => {
    setIsUser("loading")
    const f = onAuthStateChanged(auth, (user) => {
      setIsUser(user === null ? "no" : "yes");
    });
    return f;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle,
        isUser,
        signOut
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
