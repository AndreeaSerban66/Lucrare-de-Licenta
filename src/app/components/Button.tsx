import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant: "tangerine" | "caribbean";
  href?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  variant,
  className,
  href,
  onClick,
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        variant === "tangerine"
          ? "bg-pale_dogwood hover:bg-atomic_tangerine transition-colors duration-300 ease-in-out text-black"
          : "bg-tiffany_blue hover:bg-caribbean_blue transition-colors duration-300 ease-in-out text-black"
      } py-3.5 px-9 font-poppins text-lg lg:text-md flex items-center`}
    >
      {children}
      {text && <span className="ml-2">{text.toUpperCase()}</span>}
    </button>
  );
};

export default Button;
