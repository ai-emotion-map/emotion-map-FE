"use client";

import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header
      className={clsx(
        "flex items-center h-[80px] pl-4 z-50 bg-background",
        pathname.startsWith("/detail") &&
          "drop-shadow-[0_4px_4px_rgba(183,224,194,0.3)]"
      )}
    >
      <Image
        src="/images/clustory.png"
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
