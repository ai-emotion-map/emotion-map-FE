"use client";
import clsx from "clsx";
import React, { useState } from "react";
import { TAG_STYLES, TagProps } from "./tag.types";
import { CirclePlus, CircleX } from "lucide-react";

export const Tag = ({
  variant,
  type = "default",
  onClick,
  cancleOnclick,
  addOnClick,
  isActive,
}: TagProps) => {
  // TAG_STYLES에서 undefined 방지
  const { color = "#ffffff", shadowColor = "#cccccc" } =
    TAG_STYLES[variant] || {};

  const [active, setActive] = useState(false);

  // HEX -> RGBA 변환 (hex가 undefined인 경우 기본값 사용)
  const hexToRgba = (hex: string = "#000000", alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const innerShadow = `inset 0 2px 4px 0 ${hexToRgba(shadowColor, 0.3)}`;
  const dropShadow = `drop-shadow(0 2px 2px ${hexToRgba(shadowColor, 0.3)})`;

  const isAddType = type === "add";
  // add 타입: 몸통 #B9B9B9, 그림자 #757575 25%
  const addBody = "#B9B9B9";
  const addShadow = hexToRgba("#757575", 0.25);
  const bgColor = isAddType
    ? addBody
    : active || isActive
      ? shadowColor
      : color;
  const boxShadow = isAddType ? `inset 0 2px 4px 0 ${addShadow}` : innerShadow;
  const filterStyle = isAddType
    ? `drop-shadow(0 2px 2px ${addShadow})`
    : dropShadow;

  return (
    <div className="relative">
      <span
        className={clsx(
          "rounded-2xl border border-gray-200 cursor-pointer transition-all",
          type === "small" ? "text-xs px-2 py-0.5" : "text-[15px] px-3 py-1"
        )}
        style={{
          backgroundColor: bgColor,
          boxShadow: boxShadow,
          filter: filterStyle,
          color: isAddType ? "#ffffff" : undefined,
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
      {type === "cancel" && (
        <CircleX
          className="absolute text-white bg-red-400 rounded-full -right-1 -top-2.5 cursor-pointer"
          size={20}
          onClick={cancleOnclick}
        />
      )}
      {type === "add" && (
        <CirclePlus
          className="absolute text-white bg-blue-400 rounded-full -right-1 -top-2.5 cursor-pointer"
          size={20}
          onClick={addOnClick}
        />
      )}
    </div>
  );
};

export default Tag;
