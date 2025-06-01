import React from "react";
import { Dialog } from "@material-tailwind/react";

const BaseModal = ({ 
  children, 
  open, 
  handler, 
  className = "",
  size = "md",
  preventOutsideClose = false
}: { 
  children: React.ReactNode, 
  open: boolean, 
  handler: () => void,
  className?: string,
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl",
  preventOutsideClose?: boolean
}) => {
  return (
    <Dialog
      open={open}
      handler={handler}
      size={size}
      className={`dark:bg-[#424242] rounded-xl shadow-xl text-[#E0E0E0] border border-[#333333] ${className}`}
      placeholder={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
      dismiss={{ outsidePress: !preventOutsideClose }}
    >
      {children}
    </Dialog>
  );
};

export default BaseModal;
