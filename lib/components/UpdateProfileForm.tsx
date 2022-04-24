import { Button } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { updateEmail, updateProfile } from "firebase/auth";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { useAuth } from "../context";
import { auth } from "../firebase/config";
import { FirebaseErrorMessages } from "../utils";
import Input from "./common/Input";

const UpdateProfileForm = ({ buttonText }: { buttonText?: string }) => {
  const [userData, setUserData] = useState<{
    fullName: string;
    email: string;
  }>({
    email: "",
    fullName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { isUser } = useAuth();

  useEffect(() => {
    isUser === "yes" &&
      setUserData({
        email: auth.currentUser?.email || "",
        fullName: auth.currentUser?.displayName || "",
      });
  }, [isUser]);

  const router = useRouter();

  const userDataHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    setLoading(true);
    await updateProfile(auth.currentUser, {
      displayName: userData.fullName,
    });
    try {
      await updateEmail(auth.currentUser, userData.email);
      router.push("/home");
    } catch (e: unknown) {
      const error: FirebaseError = e as any;
      setUserData({
        ...userData,
        email: "",
      });
      const errorMessage = FirebaseErrorMessages[error.code] || "Something went wrong, please try again later."
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={userDataHandler}>
      <div className="grid grid-cols-2 gap-2">
        <Input
          required
          disabled={loading || isUser === "loading"}
          placeholder="Full Name"
          value={userData.fullName}
          onChange={(e) =>
            setUserData({
              ...userData,
              fullName: e.target.value,
            })
          }
          type={"text"}
          className="col-span-2 m-0"
        />
        <Input
          required
          disabled={loading || isUser === "loading"}
          placeholder="Email Address"
          isError={error !== undefined}
          value={userData.email}
          onChange={(e) => {
            setError(undefined);
            setUserData({
              ...userData,
              email: e.target.value,
            });
          }}
          type={"email"}
          className="col-span-2 my-0 transition-colors"
        />
        {error && <div className="text-red-400 text-sm col-span-2">{error}</div>}
        <Button
          colorScheme={"teal"}
          className="col-span-2 mt-2"
          type="submit"
          isLoading={loading}
          isDisabled={loading}
        >
          {buttonText || "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
