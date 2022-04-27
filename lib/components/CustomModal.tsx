import React, { FormEvent, useEffect, useState } from "react";
import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Select,
} from "@chakra-ui/react";
import { documents } from "../models/documents";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, firestore, storage } from "../firebase/config";
import { collection, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";

const AddDocumentForm = () => {
  const [formData, setFormData] = useState<{
    documentTitle: string;
    documentFile: File | null;
  }>({
    documentTitle: "",
    documentFile: null,
  });

  const [uploadState, setUploadState] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");

  

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    if (!formData.documentFile) return;
    setUploadState("uploading");
    const docRef = ref(
      storage,
      `${auth.currentUser?.uid}/${formData.documentTitle}/${formData.documentFile?.name}`
    );
    await uploadBytes(docRef, formData.documentFile);
    const fsRef = doc(
      firestore,
      "userdocs",
      auth.currentUser.uid,
      "Documents",
      formData.documentTitle
    );
    const downloadURL = await getDownloadURL(docRef)
    await setDoc(fsRef, {
      title: formData.documentTitle,
      file: downloadURL
    });
    setUploadState("success");
  };

  if (uploadState === "success")
    return (
      <div className="flex flex-col items-center mb-3">
        <AiOutlineCheckCircle className="w-12 h-12 text-green-600 mb-3" />
        <span>Uploaded Successfully</span>
      </div>
    );
  return (
    <form onSubmit={submitHandler} className="mb-6 flex flex-col">
      <div className="my-2">
        <label htmlFor="document-title" className="text-gray-600 text-sm my-1">
          Select the document you want to add.
        </label>
        <Select
          disabled={uploadState === "uploading"}
          placeholder="Select a Document"
          name="document-title"
          id="document-title"
          onChange={(e) =>
            setFormData({ ...formData, documentTitle: e.target.value })
          }
        >
          {documents.map((doc) => (
            <option key={doc.title} value={doc.title}>
              {doc.title}
            </option>
          ))}
        </Select>
      </div>
      {formData.documentTitle && (
        <div className="my-2 flex flex-col">
          <label htmlFor="document-file" className="text-gray-600 text-sm my-1">
            Upload a PDF of your {formData.documentTitle}
          </label>
          <Button
            as={"label"}
            colorScheme="teal"
            disabled={uploadState === "uploading"}
          >
            {formData.documentFile?.name || "Upload File"}
            <input
              type="file"
              name="document-file"
              id="document-file"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  documentFile: e.target.files ? e.target.files[0] : null,
                })
              }
              hidden
            />
          </Button>
        </div>
      )}
      {formData.documentTitle && formData.documentFile && (
        <div className="flex flex-col">
          <div className="h-px w-full bg-black my-3"></div>
          <Button
            type="submit"
            colorScheme={"green"}
            isLoading={uploadState === "uploading"}
          >
            Submit
          </Button>
        </div>
      )}
    </form>
  );
};

const Modal = ({ isOpen, onClose }: Pick<ModalProps, "isOpen" | "onClose">) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered size={'3xl'} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Document</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddDocumentForm />
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
