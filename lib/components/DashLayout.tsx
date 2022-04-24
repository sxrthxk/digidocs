import { Button } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashLayout = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[] | string;
}) => {
  const { requireAuth, isUser } = useAuth();
  useEffect(() => {
    requireAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex">
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              transition={{
                bounce: 0,
                duration: 0.4,
                ease: 'easeInOut'
              }}
              initial={{ x: '-100vw' }}
              animate={{ x: 0 }}
              exit={{ x: '-100vw' }}
              className="flex md:hidden z-20"
            >
              <Sidebar sidebarOpen={sidebarOpen} />
            </motion.div>
          )}
        </AnimatePresence>
        <Sidebar sidebarOpen={sidebarOpen} className="hidden md:flex" />
        <div className="min-h-full ml-0 md:ml-60 w-full">{children}</div>
      </div>
    </div>
  );
};

export default DashLayout;
