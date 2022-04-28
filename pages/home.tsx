import { Button, Spinner, useDisclosure } from "@chakra-ui/react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import ConfirmationModal from "../lib/components/ConfirmationModal";
import Modal from "../lib/components/CustomModal";
import DashLayout from "../lib/components/DashLayout";
import { useAuth } from "../lib/context";
import { auth, firestore, storage } from "../lib/firebase/config";

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isUser } = useAuth();

  const [userData, setUserData] = useState<
    { file: string; title: string; filePath: string }[]
  >([]);
  const [fetchState, setFetchState] = useState<
    "fetching" | "fetched" | "errored"
  >("fetching");

  const [confirmationIndex, setConfirmationIndex] = useState(-1);

  const [loading, setLoading] = useState(false);

  const deleteHandler = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    const fileRef = ref(storage, userData[confirmationIndex].filePath);
    await deleteObject(fileRef);
    const dataDoc = doc(
      firestore,
      "userdocs",
      auth.currentUser.uid,
      "Documents",
      userData[confirmationIndex].title
    );
    await deleteDoc(dataDoc);
    let newArr = userData
    newArr.splice(confirmationIndex, 1)
    setLoading(false);
    setUserData(newArr);
  };

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
        let fetchedData: { file: string; title: string; filePath: string }[] =
          [];
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
              <Card
                onClick={onOpen}
                className="bg-gradient-to-l from-gray-900 to-gray-600"
              >
                <FaPlusCircle className="mb-3 w-6 h-6" />
                <span>Add</span>
              </Card>
              {userData.map((udata, index) => (
                <Card
                  key={udata.title}
                  deleteHandler={() => {
                    setConfirmationIndex(index);
                  }}
                >
                  <>
                    {udata.title}
                    <Button
                      colorScheme={"linkedin"}
                      className="mt-1"
                      onClick={() => {
                        window.open(udata.file, "_blank");
                      }}
                      _focus={{
                        outline: "none",
                      }}
                    >
                      View
                    </Button>
                  </>
                </Card>
              ))}
              {confirmationIndex > -1 && (
                <ConfirmationModal
                  loading={loading}
                  deleteHandler={deleteHandler}
                  documentName={userData[confirmationIndex]?.title}
                  isOpen={confirmationIndex > -1}
                  onClose={() => {
                    setConfirmationIndex(-1);
                    onClose();
                  }}
                />
              )}
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
  className,
  deleteHandler,
}: {
  onClick?: () => void;
  children: JSX.Element | string | JSX.Element[];
  className?: string;
  deleteHandler?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={
        "px-24 py-12 flex flex-col items-center justify-center w-full md:w-auto text-white rounded-md bg-green-800 cursor-pointer relative " +
        className
      }
    >
      {children}
      {deleteHandler && (
        <div className="absolute top-0 right-0 m-3" onClick={deleteHandler}>
          <IoMdClose className="w-6 h-6" />
        </div>
      )}
      {/* <ConfirmationModal isOpen={isOpen} onClose={onClose} /> */}
    </div>
  );
};
