import { Collapse } from "@material-tailwind/react";
import { NavItems } from "./NavItems";
import { UserProfile } from "../shared/UserProfile";
import { MobileMenuProps } from "../shared/types";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import ActionButton from "../../../ui/buttons/ActionButton";

export const MobileMenu = ({
  isOpen,
  navItems,
  user,
  onLogout,
}: MobileMenuProps) => (
  <Collapse open={isOpen}>
    <div className="flex flex-col h-full p-3 gap-2">
      <NavItems items={navItems} isMobile={true} />

      {user && (
        <>
          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
          <div className="flex items-center justify-between gap-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition p-3">
            <UserProfile
              firstName={user.firstName}
              role={user.role?.title}
              showRole={true}
            />
            <div>
            <ActionButton
              onClick={onLogout}
              customClassName="flex items-center gap-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition p-3 w-full text-left"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span>Logout</span>
            </ActionButton>
              </div>
           
          </div>
        </>
      )}
    </div>
  </Collapse>
);

export default MobileMenu;
