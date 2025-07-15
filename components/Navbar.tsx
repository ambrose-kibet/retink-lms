"use client";

import ModeToggle from "@/components/theme-toggler";
import { ExitIcon } from "@radix-ui/react-icons";
import { FaBars } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";
import { IoPowerSharp } from "react-icons/io5";
import { use, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import router from "next/router";
import Link from "next/link";
import { User } from "@/lib/types";
import { useMutation } from "@tanstack/react-query";
import { signout } from "@/actions/auth";

type NavbarProps = {
  user: User | null;
};
const Navbar = ({ user }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = (path: string) => {
    router.push(path);
  };
  const pathname = usePathname();
  const { mutate } = useMutation({
    mutationFn: async () => {
      await signout();
    },
  });

  const handleLogout = () => {
    mutate();
  };
  console.log("user", user);

  return (
    <div
      className={`fixed left-0 top-0 h-screen w-screen ${
        isMenuOpen ? "" : "-translate-x-full"
      } z-40 flex flex-col justify-between bg-background transition-transform duration-200 animate-out sm:translate-x-full`}
    >
      <div className="z-0 flex items-center justify-between px-2 py-1">
        <div className="sm:mr-1 sm:-translate-x-full sm:pr-2">
          <ModeToggle />
        </div>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className={`text-bold text-2xl ${
            isMenuOpen
              ? "translate-x-0"
              : "translate-x-full pl-2 -translate-y-2"
          } transition-transform duration-100 animate-in`}
        >
          {isMenuOpen ? (
            "✖"
          ) : (
            <FaBars
              height={28}
              width={28}
              className=" font-semibold bg-background"
            />
          )}
        </button>
      </div>
      <div className="z-10 flex w-full flex-col items-start justify-start px-2 py-1">
        <div className="flex w-full flex-col space-y-4 sm:hidden">
          <p className="text-2xl">{user ? `Welcome, ${user.email}` : ""}</p>
          {user && (
            <>
              <Button
                variant={pathname === "/create-tasks" ? "link" : "ghost"}
                size={"lg"}
                className="ml-0 flex w-full items-center justify-start gap-x-2 pl-0"
              >
                <FaHome className="h-8 w-8" />
                <span className="text-xl">Home</span>
              </Button>
            </>
          )}
          {!user && (
            <Link href="/auth">
              <Button
                size={"lg"}
                variant={"default"}
                className="mx-auto flex w-fit justify-center rounded-full text-xl capitalize text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Button>
            </Link>
          )}
        </div>
        <div className="hidden flex-col space-y-2 sm:flex">
          {user && (
            <>
              <div className="group flex w-fit -translate-x-[56px] items-center">
                <span
                  className={`z-10 flex items-center justify-center rounded-full p-2 ${
                    pathname === "/create-tasks"
                      ? "bg-primary text-white"
                      : "bg-muted"
                  } text-2xl transition-all duration-200 group-hover:bg-primary`}
                >
                  <FaHome
                    className={`${
                      pathname === "/create-tasks"
                        ? "text-white"
                        : "text-primary"
                    } group-hover:text-white`}
                  />
                </span>
                <span className="flex h-10 items-center rounded-full pl-2 pr-[42px] text-lg capitalize text-transparent transition-transform duration-200 group-hover:translate-x-[-100%] group-hover:bg-primary group-hover:text-white">
                  Home
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="z-0 flex w-full items-center justify-start">
        {user && (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className="flex justify-start py-1 capitalize sm:hidden"
          >
            <ExitIcon className="mr-2 h-6 w-6" /> Logout
          </button>
        )}
        {user && (
          <div
            className="group relative mb-1 mr-2 hidden h-[28px] w-[28px] -translate-x-full items-center sm:flex"
            onClick={handleLogout}
          >
            <span className="absolute inset-0 z-10 flex items-center justify-center rounded-full bg-transparent text-2xl transition-all duration-200 group-hover:bg-primary">
              <IoPowerSharp className="text-current group-hover:text-white" />
            </span>
            <span className="absolute left-full flex transform items-center rounded-full pl-2 pr-[30px] text-xl transition-transform duration-200 group-hover:translate-x-[-100%] group-hover:bg-primary group-hover:text-white">
              Logout
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
