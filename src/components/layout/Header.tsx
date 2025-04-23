"use client";

import Logo from "../common/Logo";
import ModeToggle from "../common/ModeToggel";
import { Button } from "../ui/button";
import Link from "next/link";
import UserToggle from "../common/UserToggle";
import { useAuthContext } from "@/context/AuthContext";

export default function Header () {
  const { user } = useAuthContext();

  return (
    <div className="container mx-auto flex items-center justify-between p-5 sm:py-10">
      <Link href="/">
        <Logo />
      </Link>
      <div className="flex items-center gap-3">
        {user ? (
          <UserToggle />
        ) : (
          <Link href="/login">
            <Button className="font-bold px-5">Login</Button>
          </Link>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
