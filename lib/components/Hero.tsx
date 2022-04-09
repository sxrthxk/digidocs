import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import document from "../assets/undraw_certification_re_ifll.svg";
import files from "../assets/undraw_file_manager_re_ms29.svg";
import share from "../assets/undraw_share_link_re_54rx.svg";

const Hero = () => {
  return (
    <Flex
      width={"full"}
      bg="blackAlpha.100"
      p={6}
      alignItems="center"
      wrap={"wrap"}
      justify="center"
    >
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box position={"relative"} h="24rem" w="24rem">
          <Image src={document} layout="fill" alt="Illustration" />
        </Box>
        <Text>😃 Add Your Important Documents</Text>
      </Flex>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box position={"relative"} h="24rem" w="24rem">
          <Image src={share} layout="fill" alt="Illustration" />
        </Box>
        <Text>🔗 Generate a Shareable Link</Text>
      </Flex>

      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box position={"relative"} h="24rem" w="24rem">
          <Image src={files} layout="fill" alt="Illustration" />
        </Box>
        <Text>🤯 Share without any hassles</Text>
      </Flex>
    </Flex>
  );
};

export default Hero;
