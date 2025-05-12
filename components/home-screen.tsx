"use client"

import type React from "react"
import { Phone, Calculator, Clock, MessageSquare, Camera, Mic, Image, Instagram, Settings } from "lucide-react"
import { useState, useEffect } from "react"

interface HomeScreenProps {
  onAppClick: (appName: string) => void
  darkMode: boolean
}

interface AppIconProps {
  name: string
  icon: React.ReactNode
  label: string
  gradient: string
  onClick: () => void
  darkMode: boolean
}

function AppIcon({ name, icon, label, gradient, onClick, darkMode }: AppIconProps) {
  return (
    <button className="flex flex-col items-center gap-2" onClick={onClick}>
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${gradient} shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95`}
      >
        {icon}
      </div>
      <span
        className={`text-xs font-medium ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
      >
        {label}
      </span>
    </button>
  )
}

export default function HomeScreen({ onAppClick, darkMode }: HomeScreenProps) {
  const [time, setTime] = useState(new Date())
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    const hour = time.getHours()
    if (hour < 12) {
      setGreeting("Buenos días")
    } else if (hour < 18) {
      setGreeting("Buenas tardes")
    } else {
      setGreeting("Buenas noches")
    }

    return () => clearInterval(interval)
  }, [time])

  const apps = [
    {
      name: "phone",
      icon: <Phone className="w-7 h-7 text-white" />,
      label: "Teléfono",
      gradient: "bg-gradient-to-br from-cyan-400 to-cyan-600",
    },
    {
      name: "calculator",
      icon: <Calculator className="w-7 h-7 text-white" />,
      label: "Calculadora",
      gradient: "bg-gradient-to-br from-amber-400 to-amber-600",
    },
    {
      name: "clock",
      icon: <Clock className="w-7 h-7 text-white" />,
      label: "Reloj",
      gradient: "bg-gradient-to-br from-indigo-400 to-indigo-600",
    },
    {
      name: "messaging",
      icon: <MessageSquare className="w-7 h-7 text-white" />,
      label: "Mensajes",
      gradient: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    },
    {
      name: "camera",
      icon: <Camera className="w-7 h-7 text-white" />,
      label: "Cámara",
      gradient: "bg-gradient-to-br from-rose-400 to-rose-600",
    },
    {
      name: "microphone",
      icon: <Mic className="w-7 h-7 text-white" />,
      label: "Grabadora",
      gradient: "bg-gradient-to-br from-red-400 to-red-600",
    },
    {
      name: "gallery",
      icon: <Image className="w-7 h-7 text-white" />,
      label: "Galería",
      gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      name: "instagram",
      icon: <Instagram className="w-7 h-7 text-white" />,
      label: "Instagram",
      gradient: "bg-gradient-to-br from-pink-500 to-purple-600",
    },
    {
      name: "settings",
      icon: <Settings className="w-7 h-7 text-white" />,
      label: "Ajustes",
      gradient: "bg-gradient-to-br from-gray-500 to-gray-700",
    },
  ]

  return (
    <div
      className={`h-full pt-9 pb-16 px-6 flex flex-col ${darkMode ? "bg-gradient-to-br from-gray-900 to-black" : "bg-gradient-to-br from-gray-100 to-white"} transition-colors duration-500`}
    >
      {/* Time and greeting */}
      <div className="mt-8 mb-6 text-center">
        <div
          className={`text-5xl font-light mb-2 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
        >
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
        <div className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-500`}>
          {greeting}
        </div>
      </div>

      {/* App grid */}
      <div className="grid grid-cols-3 gap-y-8 gap-x-4 mt-auto">
        {apps.map((app) => (
          <AppIcon
            key={app.name}
            name={app.name}
            icon={app.icon}
            label={app.label}
            gradient={app.gradient}
            onClick={() => onAppClick(app.name)}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  )
}

