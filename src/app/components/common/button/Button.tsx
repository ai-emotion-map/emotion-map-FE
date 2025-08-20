import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "gray" | "green";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color = "green",
  ...props
}) => {
  const base =
    "w-full px-4 py-2 rounded-2xl text-white transition-colors duration-200";
  const green = "bg-main-green hover:bg-hover-green";
  const gray = "bg-gray-300 text-gray-500 hover:bg-gray-400";
  const colorClass = color === "gray" ? gray : green;

  return (
    <button className={`${base} ${colorClass} ${className || ""}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
