"use client"

import { Battery, BatteryCharging, Signal, Wifi, Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"
import { useBattery } from "./battery-manager"

interface StatusBarProps {
  onToggleNotifications: () => void
  darkMode: boolean
  onToggleDarkMode: () => void
}

export default function StatusBar({ onToggleNotifications, darkMode, onToggleDarkMode }: StatusBarProps) {
  const [time, setTime] = useState("")
  const batteryState = useBattery()

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      setTime(`${hours}:${minutes}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    return () => clearInterval(interval)
  }, [])

  // Format battery level as percentage
  const batteryPercentage = Math.round(batteryState.level * 100)

  return (
    <button
      onClick={onToggleNotifications}
      className={`flex justify-between items-center px-6 py-2 ${darkMode ? "bg-black/30" : "bg-white/30"} backdrop-blur-md absolute top-0 left-0 right-0 z-30 w-full transition-colors duration-500`}
      style={{ height: "36px" }}
    >
      <div
        className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
      >
        {time}
      </div>
      <div
        className={`flex items-center gap-3 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleDarkMode()
          }}
          className="flex items-center justify-center"
        >
          {darkMode ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
        </button>
        <Signal className="w-4 h-4" />
        <Wifi className="w-4 h-4" />
        <div className="flex items-center">
          {batteryState.charging ? (
            <BatteryCharging className="w-4 h-4 text-green-500" />
          ) : (
            <Battery className="w-4 h-4" />
          )}
          <span className="text-xs ml-1">{batteryPercentage}%</span>
        </div>
      </div>
    </button>
  )
}

