import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { FaBars, FaHamburger } from "react-icons/fa";
import { useAuth } from "../context";
import { auth } from "../firebase/config";

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { isUser, signOut } = useAuth();
  const router = useRouter();

  return (
    <Flex
      p={3}
      bg="#191A19"
      textColor={"white"}
      justifyContent="space-between"
      alignItems={"center"}
    >
      <div className="flex items-center space-x-3">
        <FaBars className="visible md:hidden w-6 h-6" onClick={toggleSidebar} />
        <Heading fontWeight={"light"}>DigiDocs</Heading>
      </div>
      {isUser !== "no" ? (
        <Flex className="h-full items-center space-x-3">
          {auth.currentUser?.displayName && (
            <span>
              Hello <strong>{auth.currentUser?.displayName}</strong>
            </span>
          )}
          <div className="hidden md:flex" >
            <Button
              variant={"outline"}
              colorScheme={"red"}
              isLoading={isUser === "loading"}
              onClick={signOut}
            >
              Log Out
            </Button>
          </div>
        </Flex>
      ) : (
        <Flex>
          <Button
            variant={"solid"}
            colorScheme="whiteAlpha"
            marginLeft={6}
            onClick={() => router.push("/auth")}
          >
            Sign In
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
