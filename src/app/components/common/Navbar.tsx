"use client";

import { Files, House, MapPin, MessageSquareMore, PenLine } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-around px-4 w-full h-[70px] max-w-sm bg-background">
      <House
        size={30}
        color="#B7E0C2"
        onClick={() => router.push("/")}
        className="cursor-pointer"
      />
      <PenLine
        size={30}
        color="#B7E0C2"
        onClick={() => router.push("/write")}
        className="cursor-pointer"
      />
      <MapPin
        size={30}
        color="#B7E0C2"
        onClick={() => router.push("/map")}
        className="cursor-pointer"
      />
      <Files
        size={30}
        color="#B7E0C2"
        onClick={() => router.push("/feed")}
        className="cursor-pointer"
      />
    </nav>
  );
};

export default Navbar;
