'use client';

import store from "@/store/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "next-themes";
import { Toaster } from "./ui/sonner";
import { AuthProvider } from "@/context/AuthContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <Provider store={store}>{children}</Provider>
        <Toaster position="bottom-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}
