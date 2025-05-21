import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { NavItem as NavItemType, NavItemsProps } from './types';

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const NavItem = ({ href, children, className = '', onClick }: NavItemProps) => {
  const baseClasses = "text-sm font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors";
  return (
    <li>
      <a
        href={href}
        className={`${baseClasses} ${className}`}
        onClick={onClick}
      >
        {children}
      </a>
    </li>
  );
};

interface NavDropdownProps {
  items: NavItemType[];
  className?: string;
}

const NavDropdown = ({ items, className = '' }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li className={`relative group ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        Apps
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
            <NavItem 
              key={item.text} 
              href={item.href} 
              className="block py-2 lg:px-4 lg:hover:bg-gray-100 lg:dark:hover:bg-gray-700 lg:rounded-lg"
            >
              {item.text}
            </NavItem>
          ))}
        </ul>
      )}
    </li>
  );
};

export const NavItems = ({ items, isMobile = false }: NavItemsProps) => {
  const dropdownItems = items.slice(0, 3);
  const regularItems = items.slice(3);
  const ulClasses = `flex flex-col lg:flex-row gap-2 lg:gap-4 ${isMobile ? 'mt-2 mb-4' : 'mt-0 mb-0'}`;

  return (
    <ul className={ulClasses}>
      <NavDropdown items={dropdownItems} className={isMobile ? 'pl-4' : ''} />
      {regularItems.map((item) => (
        <NavItem key={item.text} href={item.href}>
          {item.text}
        </NavItem>
      ))}
    </ul>
  );
};

export default NavItems;
