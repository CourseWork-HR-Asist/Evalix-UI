import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
  textColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  bgColor = 'bg-white',
  textColor = 'text-gray-800'
}) => {
  return (
    <div className={`${bgColor} dark:bg-[#424242] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
            <p className={`text-2xl font-bold ${textColor} dark:text-white mt-1`}>{value}</p>
            {description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>}
            {trend && (
              <div className="flex items-center mt-2">
                <span className={`text-sm ${trend.isPositive ? 'text-green-500' : 'text-red-500'} font-medium`}>
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
                <svg
                  className={`h-4 w-4 ml-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {trend.isPositive ? (
                    <path d="M5 15l7-7 7 7" />
                  ) : (
                    <path d="M19 9l-7 7-7-7" />
                  )}
                </svg>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
              </div>
            )}
          </div>
          <div className="p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
