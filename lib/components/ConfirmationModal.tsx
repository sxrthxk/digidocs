import React from "react";
import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  documentName,
  deleteHandler
}: {
  isOpen: boolean;
  documentName: string;
  onClose: () => void;
  deleteHandler: () => void;
}) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered size={"3xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Warning</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>Are your sure you want to remove {documentName} from your locker?</div>
        </ModalBody>
        <ModalFooter>
          <Button className="mr-3" colorScheme={'blue'} onClick={onClose}>Cancel</Button>
          <Button colorScheme={'red'} onClick={deleteHandler}>Delete</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default ConfirmationModal;
