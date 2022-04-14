import { Button } from "@chakra-ui/react";
import { updateEmail, updateProfile } from "firebase/auth";
import Router, { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import Card from "../lib/components/common/AuthCard";
import Input from "../lib/components/common/Input";
import Layout from "../lib/components/Layout";
import { auth } from "../lib/firebase/config";

const UpdateProfilePage = () => {
  const [userData, setUserData] = useState<{
    fullName: string;
    email: string;
  }>({
    email: "",
    fullName: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setUserData({
      email: auth.currentUser?.email || "",
      fullName: auth.currentUser?.displayName || ""
    })
  }, [])

  const userDataHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!auth.currentUser) return;

    setLoading(true);
    await updateProfile(auth.currentUser, {
      displayName: userData.fullName,
    });
    await updateEmail(auth.currentUser, userData.email);

    router.push("/home");
  };

  return (
    <Layout authRequired>
      <Card>
        <div className="p-3">
          <form onSubmit={userDataHandler}>
            <div className="grid grid-cols-2 gap-2">
              <Input
                required
                disabled={loading}
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
                disabled={loading}
                placeholder="Email Address"
                value={userData.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  })
                }
                type={"email"}
                className="col-span-2 my-0"
              />
              <Button
                colorScheme={"teal"}
                className="col-span-2 mt-2"
                type="submit"
                isLoading={loading}
                isDisabled={loading}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </Layout>
  );
};

export default UpdateProfilePage;
