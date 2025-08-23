"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { TAG_STYLES, TagProps } from "./tag.types";

const Tag = ({ variant, type = "default", onClick, isActive }: TagProps) => {
  const { color, shadowColor } = TAG_STYLES[variant];
  const [active, setActive] = useState(false);

  // HEX -> RGBA 변환
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const innerShadow = `inset 0 2px 4px 0 ${hexToRgba(shadowColor, 0.3)}`;
  const dropShadow = `drop-shadow(0 2px 2px ${hexToRgba(shadowColor, 0.3)})`;

  return (
    <span
      className={clsx(
        "rounded-2xl border border-gray-200 cursor-pointer transition-all",
        type === "small" ? "text-xs px-2 py-0.5" : "text-[15px] px-3 py-1"
      )}
      style={{
        backgroundColor: active || isActive ? shadowColor : color,
        boxShadow: innerShadow,
        filter: dropShadow,
      }}
      tabIndex={0}
      onClick={onClick}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <span className="font-extralight font-onepick text-main-green">#</span>{" "}
      {variant}
    </span>
  );
};

export default Tag;
