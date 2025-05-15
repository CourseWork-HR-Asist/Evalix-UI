import { useState, useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDown } from "lucide-react";
import ThemeToggleButton from "../../themes/ThemeToggleButton";

export default function DashBoardNavBar() {
  const [openNav, setOpenNav] = useState(false);
  const [isAppsOpen, setIsAppsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { text: "Dashboard", href: "#" },
    { text: "Analytics", href: "#" },
    { text: "Projects", href: "#" },
    { text: "Chat", href: "#" },
    { text: "Calendar", href: "#" },
    { text: "Email", href: "#" },
  ];

  const navList = (
    <ul className="flex flex-col lg:flex-row gap-2 lg:gap-4 mt-2 mb-4 lg:mt-0 lg:mb-0">
      <li className="relative group">
        <button
          onClick={() => setIsAppsOpen(!isAppsOpen)}
          className="flex items-center gap-1 text-sm font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          Apps
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isAppsOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isAppsOpen && (
          <ul
            className={`
    z-20 animate-fade-in
    lg:absolute lg:top-8 lg:left-0 lg:w-48 lg:backdrop-blur-md lg:bg-white/80 lg:dark:bg-gray-800/50 lg:border lg:border-gray-200 lg:dark:border-gray-700 lg:rounded-xl lg:shadow-lg lg:p-1.5
    w-full mt-2 space-y-1 lg:space-y-0 
    ${openNav ? "pl-4" : ""}
  `}
          >
            {navItems.slice(0, 3).map((item) => (
              <li key={item.text}>
                <a
                  href={item.href}
                  className="block py-2 text-sm
            lg:px-4 lg:hover:bg-gray-100 lg:dark:hover:bg-gray-700 lg:rounded-lg
            text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
      {navItems.slice(3).map((item) => (
        <li key={item.text}>
          <a
            href={item.href}
            className="text-sm font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="sticky top-0 z-50 bg-transparent">
      <div className="container mx-auto p-4 lg:px-2 py-2 transition-all duration-500 ease-in-out">
        <Navbar
          className={`rounded-xl lg:rounded-2xl border-none shadow-none
        backdrop-blur-md bg-gray-300/30 dark:bg-gray-800/30 hover:bg-gray-100/80 dark:hover:bg-gray-900/80
        shadow-md dark:shadow-white/10 transition-all duration-500 ease-in-out px-2 py-2
      `} placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <Typography
                  as="a"
                  href="/"
                  className="text-xl font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-gray-200 transition-colors flex items-center"
                >
                  <img
                    src="/Evalix-Logo.png?v=1"
                    alt="Logo"
                    className="h-8 w-8 mr-2"
                  />
                  Evalix
                </Typography>
              </div>

              <div className="hidden lg:flex items-center gap-4">{navList}</div>
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggleButton />
              <div className="hidden md:flex flex-col items-end">
                <Typography
                  variant="small"
                  className="font-semibold text-gray-900 dark:text-white"
                >
                  Mike Nielsen
                </Typography>
                <Typography
                  variant="paragraph"
                  className="text-xs text-gray-500 dark:text-gray-400"
                >
                  Admin
                </Typography>
              </div>
              <IconButton
                type="button"
                className="bg-transparent lg:hidden text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                onClick={() => setOpenNav(!openNav)} placeholder={undefined} onResize={undefined} onResizeCapture={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                {openNav ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </IconButton>
            </div>
          </div>
          <Collapse open={openNav}>
            <div className="flex flex-col h-full p-3">
              {navList}
              <a
                href="/profile"
                className="flex items-center gap-3rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition md:hidden mt-2"
              >
                <div className="flex flex-col">
                  <Typography
                    variant="small"
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    Mike Nielsen
                  </Typography>
                  <Typography
                    variant="paragraph"
                    className="text-xs text-gray-500 dark:text-gray-400"
                  >
                    Admin
                  </Typography>
                </div>
              </a>
            </div>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
}
