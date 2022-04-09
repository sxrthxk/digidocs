import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import GetStarted from "../lib/components/GetStarted";
import Hero from "../lib/components/Hero";
import Navbar from "../lib/components/Navbar";

const Home: NextPage = () => {
  return (
    <Box>
      <Navbar />
      <Hero />
      <GetStarted />
    </Box>
  );
};

export default Home;
