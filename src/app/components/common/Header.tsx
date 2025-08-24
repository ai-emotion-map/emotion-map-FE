"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex items-center h-[80px] pl-4 bg-background">
      <Image
        src="/images/Clustory.png"
        alt="Logo"
        priority
        unoptimized
        width={150}
        height={40}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
    </header>
  );
};

export default Header;
