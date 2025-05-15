import React from "react"

export interface StatCardData {
  title: string
  value: string | number
  change: string
  icon: React.ReactNode
  bgGradient?: string
  accentColor?: string
}

interface StatsCardsProps {
  stats: StatCardData[]
  className?: string
}

export function StatsCards({ stats, className = "" }: StatsCardsProps) {
  return (
    <div className={`grid gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`rounded-lg p-6 shadow-sm bg-gradient-to-br ${stat.bgGradient ?? "from-blue-500 to-blue-400"} relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 w-16 h-16">
            <div
              className={`w-32 h-16 bg-gradient-to-br ${stat.accentColor ?? "from-yellow-300 to-yellow-200"} rounded-bl-full transform rotate-12 translate-x-2 -translate-y-4`}
            ></div>
          </div>

          <div className="flex flex-col text-white">
            <div className="mb-4">{stat.icon}</div>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="flex items-center mt-1">
              <span className={`text-sm ${stat.change.startsWith("+") ? "text-green-200" : "text-red-200"}`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-1 text-white/80">{stat.title}</div>
          </div>
        </div>
      ))}
    </div>
  )
}