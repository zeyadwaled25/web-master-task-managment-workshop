"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { Button } from "../ui/button";
import { useAuthContext } from "@/context/AuthContext";
import { logoutApi } from "@/services/auth";

export default function UserToggle() {
  const { user, setUser } = useAuthContext();

  const handleLogoutClick = async () => {
    await logoutApi(() => setUser(null));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FaUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Welcome, {user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogoutClick}>
          <div className="flex items-center text-primary font-semibold gap-2">
            <LiaSignOutAltSolid />
            Sign out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
