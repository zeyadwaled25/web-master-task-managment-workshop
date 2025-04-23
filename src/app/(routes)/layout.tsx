import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "This is a Todo App built with Next.js 14 and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main lang="en">
      <div className={` ${poppins.className} antialiased`}>
        <Header />
        <div className="container mx-auto flex flex-col items-center justify-center h-full">
          {children}
        </div>
      </div>
    </main>
  );
}
