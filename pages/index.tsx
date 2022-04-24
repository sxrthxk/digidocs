import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GetStarted from "../lib/components/GetStarted";
import Hero from "../lib/components/Hero";
import Layout from "../lib/components/Layout";
import { useAuth } from "../lib/context";

const Home: NextPage = () => {

  const router = useRouter();

  const { isUser } = useAuth();

  useEffect(() => {
    isUser === "yes" && router.push("/home");
  }, [isUser, router]);


  return (
    <Layout fullWidth>
      <Hero />
      <GetStarted />
    </Layout>
  );
};

export default Home;
