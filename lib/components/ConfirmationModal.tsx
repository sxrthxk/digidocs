import React from "react";
import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

const ConfirmationScreen = () => {
  return <div></div>;
};

const ConfirmationModal = ({
  isOpen,
  onClose,
}: Pick<ModalProps, "isOpen" | "onClose">) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered size={"3xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Document</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ConfirmationScreen />
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default ConfirmationModal;
