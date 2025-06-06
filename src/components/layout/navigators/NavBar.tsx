import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeToggleButton from "../../themes/ThemeToggleButton";

function Logo() {
  return (
    <Typography
      as="a"
      href="/"
      className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-gray-200 transition-colors flex items-center"
    >
      <img src="/Evalix-Logo.png?v=1" alt="Logo" className="h-8 w-8 mr-2" />
      Evalix
    </Typography>
  );
}

function NavLinks() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        type="small"
        className="p-1 font-normal text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
      >
        <a href="/" className="flex items-center">
          Home
        </a>
      </Typography>
      <Typography
        as="li"
        type="small"
        className="p-1 font-normal text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
      >
        <a href="/about" className="flex items-center">
          About us
        </a>
      </Typography>
    </ul>
  );
}

function RightSection() {
  return (
    <div className="flex items-center gap-4">
      <Typography
        as="a"
        href="/auth"
        type="small"
        className="p-1 font-normal text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors hidden lg:block"
      >
        Login
      </Typography>
      <div className="hidden lg:block">
        <ThemeToggleButton />
      </div>
    </div>
  );
}

function MobileMenuToggle({
  openNav,
  setOpenNav,
}: {
  openNav: boolean;
  setOpenNav: (val: boolean) => void;
}) {
  return (
    <IconButton
      type="button"
      className="lg:hidden text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white bg-transparent"
      onClick={() => setOpenNav(!openNav)}
      placeholder={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      {openNav ? (
        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
      ) : (
        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
      )}
    </IconButton>
  );
}

export function NavbarWithSolidBackground() {
  const [openNav, setOpenNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out
        ${isScrolled ? "px-2 pt-2 lg:px-8" : ""}
      `}
    >
      <Navbar
        placeholder={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        fullWidth
        className={`transition-all duration-500 ease-in-out border-none shadow-none px-4 py-2 lg:px-8
          ${
            isScrolled
              ? "rounded-xl lg:rounded-2xl backdrop-blur-md bg-gray-300/30 dark:bg-gray-800/30 hover:bg-gray-100/80 dark:hover:bg-gray-900/80 shadow-md dark:shadow-white/10"
              : "rounded-none bg-white dark:bg-gray-900"
          }
        `}
      >
        <div className="flex items-center justify-between">
          <Logo />
          
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
            <NavLinks />
          </div>
          
          <div className="flex items-center gap-4">
            <RightSection />
            <MobileMenuToggle openNav={openNav} setOpenNav={setOpenNav} />
          </div>
        </div>
        <Collapse open={openNav}>
          <div className="flex flex-col gap-4 lg:hidden">
            <NavLinks />
            <div className="flex items-center justify-between p-2">
              <a 
                href="/auth" 
                className="font-normal text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Login
              </a>
              <ThemeToggleButton />
            </div>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
