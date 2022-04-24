import { useDisclosure } from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Modal from "../lib/components/CustomModal";
import DashLayout from "../lib/components/DashLayout";
import { auth, firestore } from "../lib/firebase/config";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DashLayout>
      <div className="p-2 md:p-4">
        <h1 className="text-4xl font-semibold mb-4">Your Documents</h1>
        <div className="flex p-2 bg-gray-200 drop-shadow-sm rounded-lg">
          <div
            onClick={onOpen}
            className="px-24 py-12 flex flex-col items-center bg-green-800 text-white rounded-md cursor-pointer"
          >
            <FaPlusCircle className="mb-3 w-6 h-6" />
            <span>Add</span>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} />
    </DashLayout>
  );
};

export default HomePage;
