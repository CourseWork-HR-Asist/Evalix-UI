import React from "react";
import { Dialog } from "@material-tailwind/react";

const BaseModal = ({ children, open, handler }: { children: React.ReactNode, open: boolean, handler: () => void }) => {
  return (
    <Dialog
      open={open}
      handler={handler}
      className="dark:bg-[#424242] rounded-xl shadow-xl text-[#E0E0E0] border border-[#333333]"
      placeholder={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {children}
    </Dialog>
  );
};

export default BaseModal;
