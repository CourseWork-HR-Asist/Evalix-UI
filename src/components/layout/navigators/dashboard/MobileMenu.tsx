import { Collapse } from "@material-tailwind/react";
import { NavItems } from "./NavItems";
import { UserProfile } from "../shared/UserProfile";
import { MobileMenuProps } from "../shared/types";

export const MobileMenu = ({ isOpen, navItems, user }: MobileMenuProps) => (
  <Collapse open={isOpen}>
    <div className="flex flex-col h-full p-3">
      <NavItems items={navItems} isMobile={true} />
      {user && (
        <a
          href="/profile"
          className="flex items-center gap-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition md:hidden mt-2 p-2"
        >
          <UserProfile
            firstName={user.firstName}
            role={user.role?.title}
            showRole={true}
          />
        </a>
      )}
    </div>
  </Collapse>
);

export default MobileMenu;
