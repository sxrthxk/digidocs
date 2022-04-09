import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";

const Navbar = () => {
  return (
    <Flex p={3} bg="#191A19" 
    textColor={"white"} justifyContent="space-between">
      <Heading fontWeight={"light"}>DigiDocs</Heading>
      <Flex>
        <Button variant={"ghost"} colorScheme="whiteAlpha">
          Sign In
        </Button>
        <Button variant={"solid"} colorScheme="whiteAlpha" marginLeft={6}>
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
