"use client"

import { ArrowLeft } from "lucide-react"
import type { ReactNode } from "react"

interface AppLayoutProps {
  title: string
  children: ReactNode
  onHome: () => void
  hideHeader?: boolean
  onBack?: () => void
  darkMode: boolean
}

export default function AppLayout({ title, children, onHome, hideHeader = false, onBack, darkMode }: AppLayoutProps) {
  return (
    <div
      className={`flex flex-col h-full ${darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"} pt-9 transition-colors duration-500`}
    >
      {!hideHeader && (
        <div
          className={`flex items-center px-4 py-3 border-b ${darkMode ? "border-gray-600" : "border-gray-200"} transition-colors duration-500`}
        >
          {onBack && (
            <button
              onClick={onBack}
              className={`mr-3 p-2 rounded-full ${darkMode ? "hover:bg-gray-600" : "hover:bg-gray-100"} transition-colors duration-200`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="font-medium text-lg">{title}</div>
        </div>
      )}

      <div className="flex-1 overflow-auto pb-20 hide-scrollbar">{children}</div>
    </div>
  )
}

