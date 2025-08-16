"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex items-center h-16 pl-5 bg-background">
      <Image
        src="/images/clustory.png"
        alt="Logo"
        width={100}
        height={50}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
    </header>
  );
};

export default Header;
