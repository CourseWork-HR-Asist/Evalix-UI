import type { NavItem } from './types';
import { NavItemsProps } from './types';

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



export const NavItems = ({ items, isMobile = false }: NavItemsProps) => {
  const ulClasses = `flex flex-col lg:flex-row gap-2 lg:gap-4 ${isMobile ? 'mt-2 mb-4' : 'mt-0 mb-0'}`;

  return (
    <ul className={ulClasses}>
      {items.map((item) => (
        <NavItem 
          key={item.text} 
          href={item.href}
          className={isMobile ? 'pl-4' : ''}
        >
          {item.text}
        </NavItem>
      ))}
    </ul>
  );
};

export default NavItems;
