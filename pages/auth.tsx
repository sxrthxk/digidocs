import React, { useState } from "react";
import Layout from "../lib/components/Layout";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../lib/firebase/config";
import { Button } from "@chakra-ui/react";
import { useAuth } from "../lib/context";

const AuthPage = () => {
  const [formData, setFormData] = useState<{
    phone_number: string;
  }>({
    phone_number: "",
  });

  const formSubmitHandler = () => {
    console.log(formData);
  };
  const { signInWithGoogle } = useAuth();


  


  return (
    <Layout>
      <Button colorScheme={"teal"} onClick={signInWithGoogle}>
        Google
      </Button>
    </Layout>
  );
};

export default AuthPage;
