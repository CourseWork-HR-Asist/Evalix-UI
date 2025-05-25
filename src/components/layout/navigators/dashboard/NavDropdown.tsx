import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavItem as NavItemType } from "../shared/types";
// Using direct HTML elements instead of NavItem component

interface NavDropdownProps {
  items: NavItemType[];
  className?: string;
}

export const NavDropdown = ({ items, className = "" }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={`relative group ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        Apps
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          className={`
            z-20 animate-fade-in
            lg:absolute lg:top-8 lg:left-0 lg:w-48 lg:backdrop-blur-md lg:bg-white/80 lg:dark:bg-gray-800/50 
            lg:border lg:border-gray-200 lg:dark:border-gray-700 lg:rounded-xl lg:shadow-lg lg:p-1.5
            w-full mt-2 space-y-1 lg:space-y-0
          `}
        >
          {items.map((item) => (
            <li key={item.text}>
              <a
                href={item.href}
                className="block py-2 lg:px-4 text-sm font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors lg:hover:bg-gray-100 lg:dark:hover:bg-gray-700 lg:rounded-lg"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
