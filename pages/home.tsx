import { Spinner, useDisclosure } from "@chakra-ui/react";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import Modal from "../lib/components/CustomModal";
import DashLayout from "../lib/components/DashLayout";
import { useAuth } from "../lib/context";
import { auth, firestore } from "../lib/firebase/config";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isUser } = useAuth();

  const [userData, setUserData] = useState<{ file: string; title: string }[]>(
    []
  );
  const [fetchState, setFetchState] = useState<
    "fetching" | "fetched" | "errored"
  >("fetching");

  useEffect(() => {
    if (!auth.currentUser) return;
    isUser === "yes" &&
      getDocs(
        query(
          collection(
            firestore,
            "userdocs",
            auth.currentUser?.uid as string,
            "Documents"
          )
        )
      ).then((data) => {
        let fetchedData: { file: string; title: string }[] = [];
        data.forEach((sn) => fetchedData.push(sn.data() as any));
        setUserData(fetchedData);
        setFetchState("fetched");
      });
  }, [isUser]);

  return (
    <DashLayout>
      <div className="p-2 md:p-4">
        <h1 className="text-4xl font-semibold mb-4">Your Documents</h1>
        <div className="flex p-2 bg-gray-200 drop-shadow-sm rounded-lg flex-wrap gap-2">
          {fetchState === "fetching" && (
            <Spinner className="mx-auto my-8" size={"xl"} />
          )}
          {fetchState === "fetched" && (
            <>
              <Card onClick={onOpen}>
                <FaPlusCircle className="mb-3 w-6 h-6" />
                <span>Add</span>
              </Card>
              {userData.map((udata) => (
                <Card key={udata.title}>{udata.title}</Card>
              ))}
            </>
          )}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} />
    </DashLayout>
  );
};

export default HomePage;

const Card = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: JSX.Element | string | JSX.Element[];
}) => {
  return (
    <div
      onClick={onClick}
      className={
        "px-24 py-12 flex flex-col items-center justify-center w-full md:w-auto text-white rounded-md bg-green-800 cursor-pointer "
      }
    >
      {children}
    </div>
  );
};
