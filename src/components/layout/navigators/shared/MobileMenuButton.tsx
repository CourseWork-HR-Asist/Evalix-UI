import { IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { MobileMenuButtonProps } from "./types";

export const MobileMenuButton = ({ 
  isOpen, 
  onClick,
  className = '' 
}: MobileMenuButtonProps & { className?: string }) => (
  <IconButton
    type="button"
    className={`bg-transparent lg:hidden text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white ${className}`}
    onClick={onClick}
    placeholder={undefined}
    onResize={undefined}
    onResizeCapture={undefined}
    onPointerEnterCapture={undefined}
    onPointerLeaveCapture={undefined}
  >
    {isOpen ? (
      <XMarkIcon className="h-6 w-6" />
    ) : (
      <Bars3Icon className="h-6 w-6" />
    )}
  </IconButton>
);

export default MobileMenuButton;
