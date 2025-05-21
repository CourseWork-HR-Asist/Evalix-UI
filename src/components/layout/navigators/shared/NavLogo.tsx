import { Typography } from "@material-tailwind/react";
import { NavLogoProps } from "./types";

export const NavLogo = ({
  isScrolled = false,
  onClick,
  className = "",
}: NavLogoProps) => (
  <div className={`flex items-center ${className}`}>
    <img src="/Evalix-Logo.png?v=1" alt="Logo" className="h-8 w-8 mr-2" />
    <Typography
      as="a"
      href="/"
      className={`cursor-pointer py-1.5 text-xl ${
        isScrolled
          ? "text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200"
          : "text-gray-900 hover:text-gray-700 dark:text-white dark:hover:text-gray-200"
      } transition-colors`}
      onClick={onClick}
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      Evalix
    </Typography>
  </div>
);

export default NavLogo;
