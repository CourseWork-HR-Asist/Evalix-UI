import type { ComponentProps, ReactNode } from "react";

/**
 * Type assertion helper for Material Tailwind components
 * This helps fix TypeScript errors with Material Tailwind components
 * that have incomplete or incorrect type definitions
 */
export type MaterialTailwindProps<T> = T & {
  className?: string;
  children?: ReactNode;
};

/**
 * Example type using ComponentProps to demonstrate usage
 */
export type MaterialComponentProps<T extends React.ElementType> = MaterialTailwindProps<ComponentProps<T>>;

/**
 * Helper function to create props for Material Tailwind components
 * Usage: materialProps<ComponentProps<typeof Component>>()
 * 
 * @example
 * // Import the helper
 * import { materialProps } from "path/to/materialTailwind";
 * import type { ComponentProps } from "react";
 * 
 * // Use it with Material Tailwind components
 * <Button {...materialProps<ComponentProps<typeof Button>>()}>Click me</Button>
 */
export const materialProps = <T>() => ({} as MaterialTailwindProps<T>);
