import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const Sidebar = ({
  sidebarOpen,
  className,
}: {
  sidebarOpen: boolean;
  className?: string;
}) => {
  const router = useRouter();

  const sidebarItems: { key: number; title: string; route: string }[] = [
    {
      key: 1,
      title: "Home",
      route: "/home",
    },
    {
      key: 2,
      title: "Account",
      route: "/account",
    },
  ];

  return (
    <div className={"fixed bg-[#222831] drop-shadow-md w-60 h-screen " + className}>
      <div className="p-4 flex flex-col items-baseline">
        {sidebarItems.map((item) => (
          <div
            key={item.key}
            className={`text-lg text-white ${
              item.route === router.pathname && "text-red-500 font-semibold"
            }`}
            onClick={() => router.push(item.route)}
          >
            {item.title}
          </div>
        ))}
        <div className="h-px w-10/12 bg-white my-3"></div>
        <Button variant={"outline"} colorScheme="red" className="my-2">
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
