"use client"

import { useState } from "react"
import {
  Wifi,
  Bluetooth,
  Plane,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Smartphone,
  RotateCcw,
  Zap,
  Bell,
  BellOff,
  X,
  Phone,
  Mic,
  Camera,
  Instagram,
} from "lucide-react"

interface NotificationsPanelProps {
  onClose: () => void
  darkMode: boolean
}

export default function NotificationsPanel({ onClose, darkMode }: NotificationsPanelProps) {
  const [brightness, setBrightness] = useState(70)
  const [volume, setVolume] = useState(50)
  const [toggles, setToggles] = useState({
    wifi: true,
    bluetooth: false,
    airplane: false,
    dnd: false,
    rotation: true,
    powerSave: false,
  })

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const notifications = [
    {
      app: "Instagram",
      icon: <Instagram className={`w-5 h-5 ${darkMode ? "text-pink-400" : "text-pink-500"}`} />,
      title: "Nueva solicitud de seguimiento",
      message: "usuario_123 quiere seguirte",
      time: "Hace 5 min",
    },
    {
      app: "Grabadora",
      icon: <Mic className={`w-5 h-5 ${darkMode ? "text-red-400" : "text-red-500"}`} />,
      title: "Grabación completada",
      message: "Tu grabación de 2:45 se ha guardado",
      time: "Hace 15 min",
    },
    {
      app: "Cámara",
      icon: <Camera className={`w-5 h-5 ${darkMode ? "text-amber-400" : "text-amber-500"}`} />,
      title: "Foto guardada",
      message: "Tu foto se ha guardado en la galería",
      time: "Hace 30 min",
    },
    {
      app: "Teléfono",
      icon: <Phone className={`w-5 h-5 ${darkMode ? "text-green-400" : "text-green-500"}`} />,
      title: "Llamada perdida",
      message: "Carlos (2) - Hace 45 minutos",
      time: "Hace 45 min",
    },
  ]

  return (
    <div
      className={`absolute inset-0 ${darkMode ? "bg-black/80" : "bg-white/80"} backdrop-blur-md z-30 flex flex-col pt-9 transition-colors duration-500`}
    >
      <div className="flex-1 overflow-auto hide-scrollbar">
        {/* Panel de control rápido */}
        <div className={`p-4 ${darkMode ? "bg-gray-900/80" : "bg-gray-100/80"} transition-colors duration-500`}>
          <div className="flex justify-between items-center mb-4">
            <div
              className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
            >
              Panel de control
            </div>
            <button
              onClick={onClose}
              className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800"} p-2 rounded-full transition-colors duration-200`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controles de brillo y volumen */}
          <div className="space-y-4 mb-6">
            <div
              className={`flex items-center ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
            >
              <Sun className="w-5 h-5 mr-3" />
              <input
                type="range"
                min="0"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number.parseInt(e.target.value))}
                className={`w-full h-2 ${darkMode ? "bg-gray-700" : "bg-gray-300"} rounded-lg appearance-none cursor-pointer transition-colors duration-500`}
              />
            </div>

            <div
              className={`flex items-center ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
            >
              {volume > 0 ? <Volume2 className="w-5 h-5 mr-3" /> : <VolumeX className="w-5 h-5 mr-3" />}
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number.parseInt(e.target.value))}
                className={`w-full h-2 ${darkMode ? "bg-gray-700" : "bg-gray-300"} rounded-lg appearance-none cursor-pointer transition-colors duration-500`}
              />
            </div>
          </div>

          {/* Toggles rápidos */}
          <div className="grid grid-cols-4 gap-3">
            <button
              className={`flex flex-col items-center justify-center p-3 rounded-xl ${toggles.wifi ? (darkMode ? "bg-indigo-600" : "bg-indigo-500") : darkMode ? "bg-gray-700" : "bg-gray-300"} transition-colors duration-200`}
              onClick={() => handleToggle("wifi")}
            >
              <Wifi className="w-6 h-6 text-white mb-1" />
              <span className="text-white text-xs">Wi-Fi</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center p-3 rounded-xl ${toggles.bluetooth ? (darkMode ? "bg-indigo-600" : "bg-indigo-500") : darkMode ? "bg-gray-700" : "bg-gray-300"} transition-colors duration-200`}
              onClick={() => handleToggle("bluetooth")}
            >
              <Bluetooth className="w-6 h-6 text-white mb-1" />
              <span className="text-white text-xs">Bluetooth</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center p-3 rounded-xl ${toggles.airplane ? (darkMode ? "bg-indigo-600" : "bg-indigo-500") : darkMode ? "bg-gray-700" : "bg-gray-300"} transition-colors duration-200`}
              onClick={() => handleToggle("airplane")}
            >
              <Plane className="w-6 h-6 text-white mb-1" />
              <span className="text-white text-xs">Avión</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center p-3 rounded-xl ${toggles.dnd ? (darkMode ? "bg-indigo-600" : "bg-indigo-500") : darkMode ? "bg-gray-700" : "bg-gray-300"} transition-colors duration-200`}
              onClick={() => handleToggle("dnd")}
            >
              {toggles.dnd ? (
                <BellOff className="w-6 h-6 text-white mb-1" />
              ) : (
                <Bell className="w-6 h-6 text-white mb-1" />
              )}
              <span className="text-white text-xs">No molestar</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center p-3 rounded-xl ${toggles.rotation ? (darkMode ? "bg-indigo-600" : "bg-indigo-500") : darkMode ? "bg-gray-700" : "bg-gray-300"} transition-colors duration-200`}
              onClick={() => handleToggle("rotation")}
            >
              <RotateCcw className="w-6 h-6 text-white mb-1" />
              <span className="text-white text-xs">Rotación</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center p-3 rounded-xl ${toggles.powerSave ? (darkMode ? "bg-indigo-600" : "bg-indigo-500") : darkMode ? "bg-gray-700" : "bg-gray-300"} transition-colors duration-200`}
              onClick={() => handleToggle("powerSave")}
            >
              <Zap className="w-6 h-6 text-white mb-1" />
              <span className="text-white text-xs">Ahorro</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center p-3 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-300"} transition-colors duration-200`}
            >
              <Moon className="w-6 h-6 text-white mb-1" />
              <span className="text-white text-xs">Noche</span>
            </button>

            <button
              className={`flex flex-col items-center justify-center p-3 rounded-xl ${darkMode ? "bg-gray-700" : "bg-gray-300"} transition-colors duration-200`}
            >
              <Smartphone className="w-6 h-6 text-white mb-1" />
              <span className="text-white text-xs">Datos</span>
            </button>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="p-4">
          <div
            className={`text-lg font-medium mb-4 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
          >
            Notificaciones
          </div>

          <div className="space-y-4">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={`${darkMode ? "bg-gray-800/80" : "bg-white/80"} backdrop-blur-md rounded-xl p-4 shadow-lg transition-colors duration-500`}
              >
                <div className="flex items-center mb-2">
                  <div
                    className={`w-10 h-10 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"} flex items-center justify-center mr-3 transition-colors duration-500`}
                  >
                    {notification.icon}
                  </div>
                  <div>
                    <div
                      className={`font-medium ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
                    >
                      {notification.app}
                    </div>
                    <div
                      className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-500`}
                    >
                      {notification.time}
                    </div>
                  </div>
                </div>
                <div
                  className={`font-medium ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
                >
                  {notification.title}
                </div>
                <div
                  className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-500`}
                >
                  {notification.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

