import React from "react"

interface ContentCardProps {
  className?: string
  children: React.ReactNode
}

export const ContentCard = ({ children, className = "" }: ContentCardProps) => {
  return (
      <div className={`rounded-xl p-6 shadow-lg ${className}`}>
          {children}
      </div>
  );
};