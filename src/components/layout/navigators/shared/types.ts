// Common types for navigation components

export interface NavItem {
  text: string;
  href: string;
}

export interface User {
  firstName: string;
  role?: {
    title: string;
  };
}

export interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export interface NavLogoProps {
  isScrolled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface NavItemsProps {
  items: NavItem[];
  isMobile?: boolean;
  className?: string;
}

export interface UserProfileProps {
  firstName: string;
  role?: string;
  showRole?: boolean;
  className?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  user?: User;
  className?: string;
  children?: React.ReactNode;
}
