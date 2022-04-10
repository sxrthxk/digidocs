import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useAuth } from "../context";
import { auth } from "../firebase/config";

const Navbar = () => {
  const { isUser, signOut } = useAuth();

  return (
    <Flex
      p={3}
      bg="#191A19"
      textColor={"white"}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <Heading fontWeight={"light"}>DigiDocs</Heading>
      {isUser !== "no" ? (
        <Flex className="h-full items-center space-x-3">
          <span>
            Hello <strong>{auth.currentUser?.displayName}</strong>
          </span>
          <Box
            w={12}
            h={12}
            position="relative"
            className="rounded-full overflow-hidden"
          >
            {auth.currentUser?.photoURL && (
              <Image
                src={auth.currentUser?.photoURL}
                layout="fill"
                alt="Profile Photo"
              />
            )}
          </Box>
          <Button
            variant={"outline"}
            colorScheme={"red"}
            isLoading={isUser === "loading"}
            onClick={signOut}
          >
            Log Out
          </Button>
        </Flex>
      ) : (
        <Flex>
          <Button variant={"ghost"} colorScheme="whiteAlpha">
            Sign In
          </Button>
          <Button variant={"solid"} colorScheme="whiteAlpha" marginLeft={6}>
            Sign Up
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
