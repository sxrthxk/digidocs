import React, { useEffect, useState } from "react";
import Layout from "../lib/components/Layout";
import {
  ConfirmationResult,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../lib/firebase/config";
import { Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { isNewUser } from "../lib/utils";
import { useAuth } from "../lib/context";
import Card from "../lib/components/common/AuthCard";
import Input from "../lib/components/common/Input";

const AuthPage = () => {
  const [formData, setFormData] = useState<{
    phone_number: string;
    otpSent: boolean;
    otp: string;
  }>({
    phone_number: "",
    otpSent: false,
    otp: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { isUser } = useAuth();

  useEffect(() => {
    isUser === "yes" && router.push("/home");
  }, [isUser, router]);

  useEffect(() => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response: any) => {
        },
        defaultCountry: "IN",
      },
      auth
    );
  }, []);

  const phoneNumberAuth = {
    otpHandler: async (e: any) => {
      e.preventDefault();
      setLoading(true);

      const confirmationResult: ConfirmationResult = (window as any)
        .confirmationResult;
      const credential = PhoneAuthProvider.credential(
        confirmationResult.verificationId,
        formData.otp
      );
      const { user } = await signInWithCredential(auth, credential);
      if (isNewUser(user)) {
        router.push("/update-profile");
        return;
      }

      router.push("/home");
    },

    phoneNumberHandler: async (e: any) => {
      e.preventDefault();

      setLoading(true);

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${formData.phone_number}`,
        (window as any).recaptchaVerifier
      );

      setFormData({
        ...formData,
        otpSent: true,
      });

      (window as any).confirmationResult = confirmationResult;

      setLoading(false);
    },
  };

  const { otpHandler, phoneNumberHandler } = phoneNumberAuth;

  return (
    <Layout>
      <Flex m="auto" className="drop-shadow-md rounded-lg box-border">
        <Card>
          <form
            onSubmit={formData.otpSent ? otpHandler : phoneNumberHandler}
            className="p-3 flex flex-col"
          >
            <div className="flex">
              <div className={(loading ? "opacity-50" : "") + " rounded-md my-2 p-2 flex justify-center items-center border-2 border-gray-400 rounded-r-none border-r-0"} >
                <span className="border-r-2 border-gray-400 pr-2">+91</span>
              </div>
              <Input
                type="tel"
                className="border-l-0 rounded-l-none w-60 md:w-full"
                value={formData.phone_number}
                disabled={loading}
                required
                placeholder="Enter Phone Number"
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
              />
            </div>
            {formData.otpSent && (
              <Input
                type="number"
                placeholder="Enter OTP"
                value={formData.otp}
                disabled={loading}
                required
                min={6}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
              />
            )}

            <div id="sign-in-button" className="hidden" ></div>

            <Button
              colorScheme="teal"
              variant={"solid"}
              type="submit"
              my="3"
              isLoading={loading}
              isDisabled={loading}
            >
              Submit
            </Button>
          </form>
        </Card>
      </Flex>
    </Layout>
  );
};

export default AuthPage;
