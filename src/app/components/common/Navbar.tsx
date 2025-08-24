"use client";

import { Files, House, LandPlot, MapPin, PenLine } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const iconProps = {
    size: 30,
    className: "cursor-pointer",
  };

  const icons = [
    { Component: House, path: ["/"] },
    { Component: PenLine, path: ["/write", "/write/diary", "/analysis"] },
    { Component: MapPin, path: ["/map"] },
    { Component: LandPlot, path: ["/course", "/course/recommend"] },
    { Component: Files, path: ["/feed"] },
  ];

  return (
    <nav className="z-10 flex items-center justify-around px-4 w-full h-[70px] max-w-[430px] bg-background">
      {icons.map(({ Component, path }, idx) => (
        <Component
          key={path.join(",")}
          {...iconProps}
          onClick={() => router.push(path[0])}
          color={path.includes(pathname) ? "#6FCF97" : "#B7E0C2"}
        />
      ))}
    </nav>
  );
};

export default Navbar;
