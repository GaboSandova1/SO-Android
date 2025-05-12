"use client"

import type React from "react"
import { useState } from "react"
import AppLayout from "./app-layout"
import {
  Wifi,
  Bluetooth,
  HardDrive,
  Info,
  Layers,
  RefreshCw,
  Smartphone,
  Volume2,
  Battery,
  Image,
  Video,
  File,
  Camera,
  Phone,
  Music,
  Bell,
  Vibrate,
  Moon,
  Clock,
  Globe,
  Lock,
  Palette,
  Eye,
  Monitor,
  Fingerprint,
  Languages,
  Keyboard,
  Accessibility,
  Instagram,
  Mic,
  Settings,
  Search,
  MapPin,
} from "lucide-react"
import { useBattery } from "../battery-manager"

interface SettingsAppProps {
  onHome: () => void
  darkMode: boolean
}

interface SettingItemProps {
  icon: React.ReactNode
  title: string
  description?: string
  onClick: () => void
  iconBg?: string
}

function SettingItem({ icon, title, description, onClick, iconBg = "bg-gray-600" }: SettingItemProps) {
  return (
    <button
      className="flex items-center p-3 hover:bg-gray-600 w-full text-left rounded-lg transition-colors"
      onClick={onClick}
    >
      <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center mr-3`}>{icon}</div>
      <div>
        <div className="font-medium text-white">{title}</div>
        {description && <div className="text-sm text-gray-300">{description}</div>}
      </div>
    </button>
  )
}

export default function SettingsApp({ onHome, darkMode }: SettingsAppProps) {
  const [currentSection, setCurrentSection] = useState<string | null>(null)
  const batteryState = useBattery()
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark")
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [language, setLanguage] = useState("es")
  const [notifications, setNotifications] = useState(true)
  const [darkModeEnabled, setDarkModeEnabled] = useState(darkMode)
  const [vibration, setVibration] = useState(true)
  const [biometrics, setBiometrics] = useState(true)
  const [autoRotate, setAutoRotate] = useState(true)
  const [dataUsage, setDataUsage] = useState({
    wifi: 2.4, // GB
    mobile: 1.2, // GB
    roaming: 0.1, // GB
  })

  // Format battery level as percentage
  const batteryPercentage = Math.round(batteryState.level * 100)

  // Calculate estimated time remaining (simplified)
  const estimatedHours = batteryState.charging
    ? batteryState.chargingTime
      ? Math.floor(batteryState.chargingTime / 3600)
      : 2
    : batteryState.dischargingTime
      ? Math.floor(batteryState.dischargingTime / 3600)
      : 5

  const estimatedMinutes = batteryState.charging
    ? batteryState.chargingTime
      ? Math.floor((batteryState.chargingTime % 3600) / 60)
      : 30
    : batteryState.dischargingTime
      ? Math.floor((batteryState.dischargingTime % 3600) / 60)
      : 23

  const renderMainMenu = () => (
    <div className="space-y-4 p-4 bg-gray-700">
      <div className="mb-4">
        <div className="text-sm font-medium text-gray-300 mb-2">Conexiones</div>
        <div className="space-y-2">
          <SettingItem
            icon={<Wifi className="w-5 h-5 text-blue-400" />}
            title="Wi-Fi"
            description="Conectado a Red-Hogar"
            onClick={() => setCurrentSection("wifi")}
            iconBg="bg-blue-500/30"
          />
          <SettingItem
            icon={<Bluetooth className="w-5 h-5 text-blue-400" />}
            title="Bluetooth"
            description="Desactivado"
            onClick={() => setCurrentSection("bluetooth")}
            iconBg="bg-blue-500/30"
          />
          <SettingItem
            icon={<Globe className="w-5 h-5 text-teal-400" />}
            title="Datos móviles"
            description={`${dataUsage.mobile.toFixed(1)} GB usados este mes`}
            onClick={() => setCurrentSection("data")}
            iconBg="bg-teal-500/30"
          />
          <SettingItem
            icon={<MapPin className="w-5 h-5 text-red-400" />}
            title="Ubicación"
            description="Activada"
            onClick={() => setCurrentSection("location")}
            iconBg="bg-red-500/30"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-300 mb-2">Dispositivo</div>
        <div className="space-y-2">
          <SettingItem
            icon={<Palette className="w-5 h-5 text-purple-400" />}
            title="Pantalla y brillo"
            description={darkModeEnabled ? "Modo oscuro activado" : "Modo claro activado"}
            onClick={() => setCurrentSection("display")}
            iconBg="bg-purple-500/30"
          />
          <SettingItem
            icon={<Volume2 className="w-5 h-5 text-red-400" />}
            title="Sonido y vibración"
            description={vibration ? "Vibración activada" : "Vibración desactivada"}
            onClick={() => setCurrentSection("sound")}
            iconBg="bg-red-500/30"
          />
          <SettingItem
            icon={<Battery className="w-5 h-5 text-green-400" />}
            title="Batería"
            description={`${batteryPercentage}% - ${batteryState.charging ? "Cargando" : `${estimatedHours}h restantes`}`}
            onClick={() => setCurrentSection("battery")}
            iconBg="bg-green-500/30"
          />
          <SettingItem
            icon={<HardDrive className="w-5 h-5 text-green-400" />}
            title="Almacenamiento"
            description="45% usado - 32GB disponibles"
            onClick={() => setCurrentSection("storage")}
            iconBg="bg-green-500/30"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-300 mb-2">Personal</div>
        <div className="space-y-2">
          <SettingItem
            icon={<Lock className="w-5 h-5 text-blue-400" />}
            title="Seguridad y privacidad"
            description={biometrics ? "Huella digital activada" : "Solo PIN"}
            onClick={() => setCurrentSection("security")}
            iconBg="bg-blue-500/30"
          />
          <SettingItem
            icon={<Languages className="w-5 h-5 text-teal-400" />}
            title="Idioma y región"
            description={language === "es" ? "Español (España)" : "English (US)"}
            onClick={() => setCurrentSection("language")}
            iconBg="bg-teal-500/30"
          />
          <SettingItem
            icon={<Bell className="w-5 h-5 text-yellow-400" />}
            title="Notificaciones"
            description={notifications ? "Activadas" : "Desactivadas"}
            onClick={() => setCurrentSection("notifications")}
            iconBg="bg-yellow-500/30"
          />
          <SettingItem
            icon={<Accessibility className="w-5 h-5 text-blue-400" />}
            title="Accesibilidad"
            description={`Tamaño de fuente: ${fontSize}`}
            onClick={() => setCurrentSection("accessibility")}
            iconBg="bg-blue-500/30"
          />
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm font-medium text-gray-300 mb-2">Sistema</div>
        <div className="space-y-2">
          <SettingItem
            icon={<Layers className="w-5 h-5 text-purple-400" />}
            title="Aplicaciones"
            description="Gestionar aplicaciones"
            onClick={() => setCurrentSection("apps")}
            iconBg="bg-purple-500/30"
          />
          <SettingItem
            icon={<RefreshCw className="w-5 h-5 text-green-400" />}
            title="Sistema y actualizaciones"
            description="Última actualización: 15/03/2023"
            onClick={() => setCurrentSection("system")}
            iconBg="bg-green-500/30"
          />
          <SettingItem
            icon={<Info className="w-5 h-5 text-blue-400" />}
            title="Acerca del teléfono"
            description="Modelo X - Android 13"
            onClick={() => setCurrentSection("about")}
            iconBg="bg-blue-500/30"
          />
        </div>
      </div>
    </div>
  )

  const renderSection = (section: string) => {
    switch (section) {
      case "location":
        return (
          <div className="p-4 bg-gray-700">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-medium">Ubicación</div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-300 mb-4">
                Los servicios de ubicación permiten a las aplicaciones acceder a tu posición
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Permisos de aplicaciones</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-white">Mapas</div>
                    </div>
                    <div className="text-sm text-gray-300">Siempre</div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center mr-3">
                        <Camera className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-white">Cámara</div>
                    </div>
                    <div className="text-sm text-gray-300">Al usar la app</div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center mr-3">
                        <Instagram className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-white">Instagram</div>
                    </div>
                    <div className="text-sm text-gray-300">Nunca</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Modo de ubicación</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-white">Alta precisión</div>
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="text-xs text-gray-300 mt-1">Usa GPS, Wi-Fi y datos móviles</div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-white">Ahorro de batería</div>
                    <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                  </div>
                  <div className="text-xs text-gray-300 mt-1">Usa Wi-Fi y datos móviles</div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-white">Solo dispositivo</div>
                    <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                  </div>
                  <div className="text-xs text-gray-300 mt-1">Usa solo GPS</div>
                </div>
              </div>
            </div>
          </div>
        )
      case "display":
        return (
          <div className="p-4">
            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Tema</div>
              <div className="grid grid-cols-3 gap-3">
                <button
                  className={`p-3 rounded-lg flex flex-col items-center ${theme === "dark" ? "bg-blue-500" : "bg-gray-600"}`}
                  onClick={() => {
                    setTheme("dark")
                    setDarkModeEnabled(true)
                  }}
                >
                  <Moon className="w-6 h-6 mb-2 text-white" />
                  <span className="text-sm text-white">Oscuro</span>
                </button>
                <button
                  className={`p-3 rounded-lg flex flex-col items-center ${theme === "light" ? "bg-blue-500" : "bg-gray-600"}`}
                  onClick={() => {
                    setTheme("light")
                    setDarkModeEnabled(false)
                  }}
                >
                  <Eye className="w-6 h-6 mb-2 text-white" />
                  <span className="text-sm text-white">Claro</span>
                </button>
                <button
                  className={`p-3 rounded-lg flex flex-col items-center ${theme === "system" ? "bg-blue-500" : "bg-gray-600"}`}
                  onClick={() => {
                    setTheme("system")
                    setDarkModeEnabled(window.matchMedia("(prefers-color-scheme: dark)").matches)
                  }}
                >
                  <Monitor className="w-6 h-6 mb-2 text-white" />
                  <span className="text-sm text-white">Sistema</span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-gray-300">Modo oscuro</div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={darkModeEnabled}
                    onChange={() => setDarkModeEnabled(!darkModeEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Tamaño de fuente</div>
              <div className="grid grid-cols-3 gap-3">
                <button
                  className={`p-3 rounded-lg flex items-center justify-center ${fontSize === "small" ? "bg-blue-500" : "bg-gray-600"}`}
                  onClick={() => setFontSize("small")}
                >
                  <span className="text-sm text-white">Pequeño</span>
                </button>
                <button
                  className={`p-3 rounded-lg flex items-center justify-center ${fontSize === "medium" ? "bg-blue-500" : "bg-gray-600"}`}
                  onClick={() => setFontSize("medium")}
                >
                  <span className="text-base text-white">Mediano</span>
                </button>
                <button
                  className={`p-3 rounded-lg flex items-center justify-center ${fontSize === "large" ? "bg-blue-500" : "bg-gray-600"}`}
                  onClick={() => setFontSize("large")}
                >
                  <span className="text-lg text-white">Grande</span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm font-medium text-gray-300">Rotación automática</div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoRotate}
                    onChange={() => setAutoRotate(!autoRotate)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Brillo</div>
              <div className="flex items-center text-white">
                <input
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="70"
                  className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        )
      case "language":
        return (
          <div className="p-4">
            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Idioma de la aplicación</div>
              <div className="space-y-2">
                <button
                  className={`p-3 w-full rounded-lg flex items-center justify-between ${language === "es" ? "bg-blue-500" : "bg-gray-600"}`}
                  onClick={() => setLanguage("es")}
                >
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-white" />
                    <span className="text-white">Español (España)</span>
                  </div>
                  {language === "es" && <div className="w-4 h-4 rounded-full bg-white"></div>}
                </button>
                <button
                  className={`p-3 w-full rounded-lg flex items-center justify-between ${language === "en" ? "bg-blue-500" : "bg-gray-600"}`}
                  onClick={() => setLanguage("en")}
                >
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-white" />
                    <span className="text-white">English (US)</span>
                  </div>
                  {language === "en" && <div className="w-4 h-4 rounded-full bg-white"></div>}
                </button>
                <button
                  className={`p-3 w-full rounded-lg flex items-center justify-between ${language === "fr" ? "bg-blue-500" : "bg-gray-600"}`}
                  onClick={() => setLanguage("fr")}
                >
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-white" />
                    <span className="text-white">Français</span>
                  </div>
                  {language === "fr" && <div className="w-4 h-4 rounded-full bg-white"></div>}
                </button>
                <button
                  className={`p-3 w-full rounded-lg flex items-center justify-between ${language === "de" ? "bg-blue-500" : "bg-gray-600"}`}
                  onClick={() => setLanguage("de")}
                >
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 mr-3 text-white" />
                    <span className="text-white">Deutsch</span>
                  </div>
                  {language === "de" && <div className="w-4 h-4 rounded-full bg-white"></div>}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Región</div>
              <div className="p-3 bg-gray-600 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="text-white">España</div>
                  <div className="text-sm text-gray-300">Cambiar</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Formato de hora</div>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 rounded-lg bg-blue-500 flex items-center justify-center">
                  <span className="text-white">24 horas</span>
                </button>
                <button className="p-3 rounded-lg bg-gray-600 flex items-center justify-center">
                  <span className="text-white">12 horas</span>
                </button>
              </div>
            </div>
          </div>
        )
      case "security":
        return (
          <div className="p-4">
            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Métodos de desbloqueo</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Fingerprint className="w-5 h-5 mr-3 text-blue-400" />
                    <div>
                      <div className="text-white">Huella digital</div>
                      <div className="text-xs text-gray-300">Desbloqueo rápido y seguro</div>
                    </div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={biometrics}
                      onChange={() => setBiometrics(!biometrics)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Lock className="w-5 h-5 mr-3 text-green-400" />
                    <div>
                      <div className="text-white">PIN</div>
                      <div className="text-xs text-gray-300">Código numérico de 4-6 dígitos</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-400">Cambiar</div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <Keyboard className="w-5 h-5 mr-3 text-purple-400" />
                    <div>
                      <div className="text-white">Contraseña</div>
                      <div className="text-xs text-gray-300">Contraseña alfanumérica</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-400">Configurar</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Privacidad</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-white">Ubicación</div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-300">Permitir que las aplicaciones accedan a tu ubicación</div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-white">Cámara</div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-300">Permitir que las aplicaciones accedan a tu cámara</div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-white">Micrófono</div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-300">Permitir que las aplicaciones accedan a tu micrófono</div>
                </div>
              </div>
            </div>
          </div>
        )
      case "notifications":
        return (
          <div className="p-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-medium">Notificaciones</div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </div>
              </div>

              <div className="text-sm text-gray-300 mb-4">
                Cuando las notificaciones están activadas, las aplicaciones pueden enviarte alertas y actualizaciones.
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Notificaciones por aplicación</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-pink-600 flex items-center justify-center mr-3">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-white">Instagram</div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center mr-3">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-white">Teléfono</div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center mr-3">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-white">Cámara</div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center mr-3">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-white">Grabadora</div>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Modo No molestar</div>
              <div className="p-3 bg-gray-600 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-white">Activar automáticamente</div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                </div>
                <div className="text-xs text-gray-300">De 22:00 a 07:00</div>
              </div>
            </div>
          </div>
        )
      case "sound":
        return (
          <div className="p-4">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium flex items-center text-white">
                    <Volume2 className="w-5 h-5 mr-2 text-red-400" />
                    Volumen multimedia
                  </div>
                  <div className="text-sm text-gray-300">65%</div>
                </div>
                <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: "65%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium flex items-center text-white">
                    <Bell className="w-5 h-5 mr-2 text-yellow-400" />
                    Volumen de notificaciones
                  </div>
                  <div className="text-sm text-gray-300">40%</div>
                </div>
                <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: "40%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium flex items-center text-white">
                    <Phone className="w-5 h-5 mr-2 text-green-400" />
                    Volumen de llamadas
                  </div>
                  <div className="text-sm text-gray-300">80%</div>
                </div>
                <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "80%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium flex items-center text-white">
                    <Clock className="w-5 h-5 mr-2 text-blue-400" />
                    Volumen de alarma
                  </div>
                  <div className="text-sm text-gray-300">100%</div>
                </div>
                <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: "100%" }}></div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium flex items-center text-white">
                    <Vibrate className="w-5 h-5 mr-2 text-purple-400" />
                    Vibración
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={vibration}
                      onChange={() => setVibration(!vibration)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-medium flex items-center text-white">
                    <Moon className="w-5 h-5 mr-2 text-blue-400" />
                    Modo silencio
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-medium flex items-center text-white">
                    <Music className="w-5 h-5 mr-2 text-pink-400" />
                    Sonidos del sistema
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "battery":
        return (
          <div className="p-4">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-40 border-2 border-gray-600 rounded-lg relative">
                <div
                  className={`absolute bottom-0 left-0 right-0 ${batteryState.charging ? "bg-green-500" : batteryPercentage > 20 ? "bg-green-500" : "bg-red-500"}`}
                  style={{ height: `${batteryPercentage}%` }}
                ></div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-gray-600 rounded-t-sm"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold">
                  {batteryPercentage}%
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="font-medium text-white">Batería</div>
                <div
                  className={`font-medium ${batteryState.charging ? "text-green-500" : batteryPercentage > 20 ? "text-green-500" : "text-red-500"}`}
                >
                  {batteryPercentage}%
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-300 mb-1">
                  {batteryState.charging ? "Tiempo estimado para carga completa" : "Tiempo restante estimado"}
                </div>
                <div className="font-medium text-white">
                  {batteryState.charging
                    ? `${estimatedHours} horas ${estimatedMinutes} minutos`
                    : `${estimatedHours} horas ${estimatedMinutes} minutos`}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-300 mb-1">Uso desde la última carga completa</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-white">
                    <div>Pantalla</div>
                    <div>35%</div>
                  </div>
                  <div className="flex justify-between text-white">
                    <div>Sistema</div>
                    <div>25%</div>
                  </div>
                  <div className="flex justify-between text-white">
                    <div>Aplicaciones</div>
                    <div>40%</div>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                  <span className="ml-3 text-sm font-medium text-white">Ahorro de batería</span>
                </div>
              </div>

              <div className="pt-4">
                <div className="text-sm text-gray-300">
                  {batteryState.charging
                    ? "Tu dispositivo está conectado y cargando"
                    : "Conecta tu dispositivo para cargar la batería"}
                </div>
              </div>
            </div>
          </div>
        )
      case "storage":
        return (
          <div className="p-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium text-white">Almacenamiento interno</div>
                <div className="text-sm text-gray-300">58.2 GB / 128 GB</div>
              </div>
              <div className="w-full h-4 bg-gray-600 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-blue-500" style={{ width: "45%" }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-300 mt-1">
                <div>45% usado</div>
                <div>69.8 GB disponibles</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-medium mb-2 text-gray-300">Categorías</div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <Layers className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-white">
                      <div className="text-sm">Aplicaciones</div>
                      <div className="text-sm text-gray-300">18.4 GB</div>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-purple-500" style={{ width: "32%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                    <HardDrive className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-white">
                      <div className="text-sm">Sistema</div>
                      <div className="text-sm text-gray-300">12.6 GB</div>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-green-500" style={{ width: "22%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                    <Image className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-white">
                      <div className="text-sm">Imágenes</div>
                      <div className="text-sm text-gray-300">8.3 GB</div>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-blue-500" style={{ width: "15%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-3">
                    <Video className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-white">
                      <div className="text-sm">Videos</div>
                      <div className="text-sm text-gray-300">15.2 GB</div>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-red-500" style={{ width: "27%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center mr-3">
                    <File className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-white">
                      <div className="text-sm">Otros</div>
                      <div className="text-sm text-gray-300">3.7 GB</div>
                    </div>
                    <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-yellow-500" style={{ width: "6%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full py-2 bg-blue-500 text-white rounded-lg">Limpiar almacenamiento</button>
            </div>
          </div>
        )
      case "about":
        return (
          <div className="p-4">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-600 flex items-center justify-center">
                <Smartphone className="w-10 h-10 text-gray-300" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-300">Nombre del dispositivo</div>
                <div className="font-medium text-white">Teléfono-Simulado</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Modelo</div>
                <div className="font-medium text-white">Simulador X Pro</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Versión de Android</div>
                <div className="font-medium text-white">Android 13.0</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Número de compilación</div>
                <div className="font-medium text-white">SIM.2023.0415.1</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Procesador</div>
                <div className="font-medium text-white">Octa-core 2.8 GHz</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">RAM</div>
                <div className="font-medium text-white">8 GB</div>
              </div>
              <div>
                <div className="text-sm text-gray-300">Almacenamiento</div>
                <div className="font-medium text-white">128 GB</div>
              </div>
            </div>
          </div>
        )
      case "wifi":
        return (
          <div className="p-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-medium">Wi-Fi</div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-300 mb-4">
                Conectado a Red-Hogar
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Redes disponibles</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white">Red-Hogar</div>
                      <div className="text-xs text-gray-300">Conectado</div>
                    </div>
                    <div className="text-blue-400">
                      <Wifi className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white">Vecino-5G</div>
                      <div className="text-xs text-gray-300">Segura</div>
                    </div>
                    <div className="text-gray-300">
                      <Lock className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white">CafeWifi</div>
                      <div className="text-xs text-gray-300">Abierta</div>
                    </div>
                    <div className="text-gray-300">
                      <Wifi className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "bluetooth":
        return (
          <div className="p-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-medium">Bluetooth</div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-300 mb-4">
                Activa el Bluetooth para conectar dispositivos cercanos
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Dispositivos emparejados</div>
              <div className="p-3 bg-gray-600 rounded-lg">
                <div className="flex items-center justify-center text-gray-500 py-4">
                  <div className="text-center">
                    <Bluetooth className="w-8 h-8 mx-auto mb-2" />
                    <div>No hay dispositivos emparejados</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "data":
        return (
          <div className="p-4">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="text-white font-medium">Datos móviles</div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Uso de datos</div>
              <div className="p-4 bg-gray-600 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-white">Ciclo actual</div>
                  <div className="text-sm text-gray-300">15 Mar - 14 Abr</div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <div className="text-white">Datos usados</div>
                  <div className="text-sm text-blue-400">{dataUsage.mobile.toFixed(1)} GB</div>
                </div>
                
                <div className="w-full h-3 bg-gray-600 rounded-full overflow-hidden mt-2 mb-4">
                  <div className="h-full bg-blue-500" style={{ width: `${(dataUsage.mobile / 5) * 100}%` }}></div>
                </div>
                
                <div className="flex justify-between text-xs text-gray-300">
                  <div>0 GB</div>
                  <div>Límite: 5 GB</div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Opciones</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-white">Modo ahorro de datos</div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-white">Datos en segundo plano</div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "apps":
        return (
          <div className="p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar aplicaciones"
                  className="w-full bg-gray-600 text-white placeholder-gray-300 rounded-xl py-3 pl-10 pr-4 text-sm"
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Aplicaciones recientes</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-pink-600 flex items-center justify-center mr-3">
                      <Instagram className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white">Instagram</div>
                      <div className="text-xs text-gray-300">125 MB</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-400">Abrir</div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center mr-3">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white">Teléfono</div>
                      <div className="text-xs text-gray-300">45 MB</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-400">Abrir</div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center mr-3">
                      <Settings className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white">Ajustes</div>
                      <div className="text-xs text-gray-300">60 MB</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-400">Abrir</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Todas las aplicaciones</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center mr-3">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white">Cámara</div>
                      <div className="text-xs text-gray-300">80 MB</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-400">Abrir</div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center mr-3">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white">Reloj</div>
                      <div className="text-xs text-gray-300">30 MB</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-400">Abrir</div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center mr-3">
                      <Mic className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white">Grabadora</div>
                      <div className="text-xs text-gray-300">25 MB</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-400">Abrir</div>
                </div>
              </div>
            </div>
          </div>
        )
      case "system":
        return (
          <div className="p-4">
            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Sistema</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-white">Versión del sistema</div>
                    <div className="text-sm text-gray-300">Android 13.0</div>
                  </div>
                  <div className="text-xs text-gray-300">Actualizado el 15 de marzo de 2023</div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-white">Buscar actualizaciones</div>
                    <RefreshCw className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm font-medium mb-2 text-gray-300">Opciones avanzadas</div>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-600 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="text-white">Reiniciar</div>
                      <div className="text-sm text-blue-400">Ejecutar</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-600 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="text-white">Restablecer</div>
                      <div className="text-sm text-blue-400">Opciones</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-600 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="text-white">Modo desarrollador</div>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "accessibility":
        return (
          <div className="p-4">
            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Visión</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <div className="text-white">Tamaño de fuente</div>
                    <div className="text-sm text-gray-300">{fontSize}</div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-white">Lector de pantalla</div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-white">Alto contraste</div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-sm font-medium mb-2 text-gray-300">Movilidad</div>
              <div className="space-y-2">
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-white">Control por voz</div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-600 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="text-white">Tiempo de pulsación</div>
                    <div className="text-sm text-gray-300">0.5s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 bg-gray-700">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-gray-300" />
                </div>
                <div className="text-lg text-white mb-2">Configuración adicional</div>
                <div className="text-sm text-gray-300">Esta sección estará disponible próximamente</div>
              </div>
            </div>
          </div>
        )
      }
    }
  return (
    <AppLayout
      title={currentSection ? `Ajustes > ${currentSection}` : "Ajustes"}
      onHome={onHome}
      onBack={currentSection ? () => setCurrentSection(null) : undefined}
      darkMode={darkMode}
      >
      <div className="h-full overflow-auto hide-scrollbar bg-gray-700 pb-16">
        {currentSection ? renderSection(currentSection) : renderMainMenu()}
      </div>
    </AppLayout>
  )
}