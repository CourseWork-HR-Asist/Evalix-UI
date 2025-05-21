import { useState, useEffect } from "react";
import { Navbar, Button } from "@material-tailwind/react";
import { useUserSlice } from "../../../features/authorization/hooks/useUser";
import { useAppDispatch } from "../../../hooks/usereduxHooks";
import { setCurrentUser } from "../../../features/authorization/store/user.slice";
import ThemeToggleButton from "../../themes/ThemeToggleButton";
import { NavLogo } from "./shared/NavLogo";
import { NavItems } from "./shared/NavItems";
import { UserProfile } from "./shared/UserProfile";
import { MobileMenuButton } from "./shared/MobileMenuButton";
import { MobileMenu } from "./dashboard/MobileMenu";
import { NAV_ITEMS } from "./dashboard/constants";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
export default function DashBoardNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUserSlice();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setCurrentUser(null));
    navigate("/auth");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 bg-transparent">
      <div className="container mx-auto p-4 lg:px-2 py-2 transition-all duration-500 ease-in-out">
        <Navbar
          className={`
            rounded-xl lg:rounded-2xl border-none shadow-none
            backdrop-blur-md bg-gray-300/30 dark:bg-gray-800/30 hover:bg-gray-100/80 
            dark:hover:bg-gray-900/80 shadow-md dark:shadow-white/10 
            transition-all duration-500 ease-in-out px-2 py-2
          `}
          placeholder={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-6">
              <NavLogo />
              <div className="hidden lg:flex items-center gap-4">
                <NavItems items={NAV_ITEMS} />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <ThemeToggleButton />
              {user && (
                <div className="hidden md:flex items-center gap-6">
                  <UserProfile
                    firstName={user.firstName}
                    role={user.role?.title}
                  />
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-2 p-2 text-gray-900 hover:text-red-500 dark:text-white dark:hover:text-red-400 transition-colors"
                    onClick={handleLogout}
                    placeholder=""
                    onResize={undefined}
                    onResizeCapture={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span className="hidden lg:inline">Logout</span>
                  </Button>
                </div>
              )}
              <MobileMenuButton
                isOpen={isMobileMenuOpen}
                onClick={toggleMobileMenu}
              />
            </div>
          </div>

          {user && (
            <MobileMenu
              isOpen={isMobileMenuOpen}
              navItems={NAV_ITEMS}
              user={{
                firstName: user.firstName,
                role: { title: user.role?.title || "" },
              }}
            />
          )}
        </Navbar>
      </div>
    </div>
  );
}
