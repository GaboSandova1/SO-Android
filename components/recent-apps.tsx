"use client"

import { X, Trash2 } from "lucide-react"

interface RecentAppsProps {
  apps: string[]
  onAppClick: (app: string) => void
  onClearAll: () => void
  darkMode: boolean
}

export default function RecentApps({ apps, onAppClick, onClearAll, darkMode }: RecentAppsProps) {
  const getAppName = (appId: string) => {
    switch (appId) {
      case "phone":
        return "Teléfono"
      case "calculator":
        return "Calculadora"
      case "clock":
        return "Reloj"
      case "messaging":
        return "Mensajes"
      case "camera":
        return "Cámara"
      case "microphone":
        return "Grabadora"
      case "gallery":
        return "Galería"
      case "instagram":
        return "Instagram"
      default:
        return appId
    }
  }

  const getAppIcon = (appId: string) => {
    switch (appId) {
      case "phone":
        return "📱"
      case "calculator":
        return "🧮"
      case "clock":
        return "⏰"
      case "messaging":
        return "💬"
      case "camera":
        return "📷"
      case "microphone":
        return "🎙️"
      case "gallery":
        return "🖼️"
      case "instagram":
        return "📸"
      default:
        return "📱"
    }
  }

  return (
    <div
      className={`h-full pt-9 pb-16 px-4 ${darkMode ? "bg-gray-900/90" : "bg-white/90"} backdrop-blur-md hide-scrollbar transition-colors duration-500`}
    >
      <div className="flex justify-between items-center mb-6 mt-4">
        <h2
          className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
        >
          Aplicaciones recientes
        </h2>
        <button
          onClick={onClearAll}
          className={`flex items-center gap-1 px-3 py-1 rounded-full ${darkMode ? "bg-red-600 text-white hover:bg-red-500" : "bg-red-500 text-white hover:bg-red-400"} text-sm transition-colors duration-200`}
        >
          <Trash2 className="w-4 h-4" />
          <span>Cerrar todo</span>
        </button>
      </div>

      {apps.length === 0 ? (
        <div
          className={`flex flex-col items-center justify-center h-64 ${darkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-500`}
        >
          <div className="text-5xl mb-4">🔍</div>
          <div className="text-lg">No hay aplicaciones recientes</div>
        </div>
      ) : (
        <div className="grid gap-4">
          {apps.map((app) => (
            <div
              key={app}
              className={`${darkMode ? "bg-gray-800" : "bg-gray-100"} rounded-xl overflow-hidden shadow-lg transition-colors duration-500`}
            >
              <div
                className={`flex justify-between items-center p-3 ${darkMode ? "bg-gray-700" : "bg-gray-200"} transition-colors duration-500`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getAppIcon(app)}</span>
                  <span
                    className={`font-medium ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
                  >
                    {getAppName(app)}
                  </span>
                </div>
                <button
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-300 hover:bg-gray-400"} transition-colors duration-200`}
                >
                  <X
                    className={`w-4 h-4 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
                  />
                </button>
              </div>
              <div
                className={`h-28 ${darkMode ? "bg-gray-800" : "bg-gray-100"} p-3 transition-colors duration-500`}
                onClick={() => onAppClick(app)}
              >
                <div
                  className={`w-full h-full flex items-center justify-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-500`}
                >
                  Vista previa de {getAppName(app)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

