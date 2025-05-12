"use client"

import { ChevronLeft, Home, Grid } from "lucide-react"

interface NavigationBarProps {
  onBack: () => void
  onHome: () => void
  onRecents: () => void
  darkMode: boolean
}

export default function NavigationBar({ onBack, onHome, onRecents, darkMode }: NavigationBarProps) {
  return (
    <div
      className={`absolute bottom-0 left-0 right-0 ${darkMode ? "bg-gray-900/80" : "bg-white/80"} backdrop-blur-md z-10 transition-colors duration-500 rounded-bl-[50px] rounded-br-[50px]`}
    >
      <div className="flex justify-between items-center px-12 py-2">
        <button
          onClick={onBack}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"} transition-all duration-200 transform active:scale-95`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={onHome}
          className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? "bg-indigo-600 text-white hover:bg-indigo-500" : "bg-indigo-500 text-white hover:bg-indigo-400"} transition-all duration-200 transform active:scale-95`}
        >
          <Home className="w-6 h-6" />
        </button>

        <button
          onClick={onRecents}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"} transition-all duration-200 transform active:scale-95`}
        >
          <Grid className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

