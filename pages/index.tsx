import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import GetStarted from "../lib/components/GetStarted";
import Hero from "../lib/components/Hero";
import Layout from "../lib/components/Layout";
import Navbar from "../lib/components/Navbar";

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <GetStarted />
    </Layout>
  );
};

export default Home;
