import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FaFingerprint, FaUser, FaDownload } from "react-icons/fa";

const GetStarted = () => {
  return (
    <Flex flexDir={"column"} alignItems="center">
      <Heading size={"md"} my="6">
        Get Started With 3 Easy Steps
      </Heading>

      <Flex w="full" justifyContent={"center"}>
        <Flex flexDir={"column"} alignItems="center">
          <Icon w={20} h={20} color="red" >
            <FaFingerprint display={'flex'} />
          </Icon>
          <Text textAlign={"center"}>Get</Text>
        </Flex>
        <Flex flexDir={"column"} alignItems="center">
          <Icon w={20} h={20} color="blue" display="flex">
            <FaUser />
          </Icon>
          <Text textAlign={"center"}>Get</Text>
        </Flex>
        <Flex flexDir={"column"} alignItems="center">
          <Icon w={20} h={20} color="green">
            <FaDownload />
          </Icon>
          <Text textAlign={"center"}>Get</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GetStarted;
