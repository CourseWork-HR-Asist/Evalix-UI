import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import ThemeToggleButton from "../themes/ThemeToggleButton";

export function NavbarWithSolidBackground() {
  const [openNav, setOpenNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    });
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {[{text: 'Home', url: '/'}, {text: 'About us', url: '/about'}, ].map((item) => (
        <Typography
          key={item.text}
          as="li"
          variant="small"
          className="p-1 font-normal text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
          placeholder=""
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}
        >
          <a href={item.url} className="flex items-center">
            {item.text}
          </a>
        </Typography>
      ))}
      <ThemeToggleButton />
    </ul>
  );

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-in-out
        ${isScrolled ? "px-2 pt-2 lg:px-8" : ""}
      `}
    >
      <Navbar
        fullWidth
        className={`transition-all duration-500 ease-in-out border-none shadow-none px-4 py-2 lg:px-8
          ${
            isScrolled
              ? "rounded-xl lg:rounded-2xl backdrop-blur-md bg-gray-300/30 dark:bg-gray-800/30 hover:bg-gray-100/80 dark:hover:bg-gray-900/80 shadow-md dark:shadow-white/10"
              : "rounded-none bg-white dark:bg-gray-900"
          }
        `}
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
          <img src="/Evalix-Logo.png?v=1" alt="Logo" className="h-8 w-8 mr-2" />
            <Typography
              as="a"
              href="/"
              className="mr-4 cursor-pointer py-1.5 text-xl text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            >
              Evalix
            </Typography>
          </div>
          <div className="mr-4 hidden lg:block">{navList}</div>

          <IconButton
            variant="text"
            className="lg:hidden text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            onClick={() => setOpenNav(!openNav)}
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </Navbar>
    </div>
  );
}
