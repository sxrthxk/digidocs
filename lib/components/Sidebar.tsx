import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { IconType } from "react-icons";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { useAuth } from "../context";

const Sidebar = ({
  sidebarOpen,
  className,
}: {
  sidebarOpen: boolean;
  className?: string;
}) => {
  const router = useRouter();

  const { signOut } = useAuth();

  const sidebarItems: {
    key: number;
    icon: IconType;
    title: string;
    route: string;
  }[] = [
    {
      key: 1,
      title: "Home",
      icon: AiOutlineHome,
      route: "/home",
    },
    {
      key: 2,
      title: "Account",
      icon: AiOutlineUser,
      route: "/account",
    },
  ];

  return (
    <div
      className={"fixed bg-[#222831] drop-shadow-md w-60 h-screen " + className}
    >
      <div className="p-4 flex flex-col items-baseline">
        {sidebarItems.map((item) => (
          <div
            key={item.key}
            className={`flex space-x-3 my-1.5 items-center text-lg text-white cursor-pointer ${
              item.route === router.pathname && "text-red-500 font-semibold"
            }`}
            onClick={() => router.push(item.route)}
          >
            <item.icon className="w-6 h-6" />
            <span>{item.title}</span>
          </div>
        ))}
        <div className="h-px w-10/12 bg-white my-3"></div>
        <Button
          variant={"outline"}
          colorScheme="red"
          className="my-2"
          onClick={signOut}
        >
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
