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
          console.log("Verified");
        },
        defaultCountry: "IN",
      },
      auth
    );
  }, []);

  const phoneNumberAuth = {
    otpHandler: async (e: any) => {
      e.preventDefault();

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
    },
  };

  const { otpHandler, phoneNumberHandler } = phoneNumberAuth;

  return (
    <Layout>
      <Flex m="auto" className="drop-shadow-md rounded-lg">
        <Card>
          <form
            onSubmit={formData.otpSent ? otpHandler : phoneNumberHandler}
            className="p-3 flex flex-col"
          >
            <div className="flex">
              <div className=" rounded-md my-2 p-2 flex justify-center items-center border-2 border-gray-400 rounded-r-none border-r-0">
                <span className="border-r-2 border-gray-400 pr-2">
                +91
                </span>
              </div>
              <Input
                type="tel"
                className="border-l-0 rounded-l-none"
                value={formData.phone_number}
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
                required
                min={6}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
              />
            )}

            <div id="sign-in-button"></div>

            <Button colorScheme="teal" variant={"solid"} type="submit" my="3">
              Submit
            </Button>
          </form>
        </Card>
      </Flex>
    </Layout>
  );
};

export default AuthPage;
