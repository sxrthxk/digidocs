import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuth } from "../context";
import Navbar from "./Navbar";

const DashLayout = ({
  children,
  fullWidth = false,
}: {
  children?: JSX.Element | JSX.Element[] | string;
  fullWidth?: boolean;
}) => {
  const { requireAuth, isUser } = useAuth();
  useEffect(() => {
    requireAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

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

  console.log(router.pathname);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="fixed bg-gray-700 drop-shadow-md w-60 h-screen">
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
            <Button variant={'outline'} colorScheme='red' className="my-2">LogOut</Button>
          </div>
        </div>
        <div className="min-h-full ml-0 md:ml-60">{children}</div>
      </div>
    </div>
  );
};

export default DashLayout;
