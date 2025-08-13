import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-full bg-main-green text-white hover:bg-hover-green transition-colors duration-200 ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
