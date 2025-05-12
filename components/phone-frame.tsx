import type { ReactNode } from "react"
import { useBattery } from "./battery-manager"

interface PhoneFrameProps {
  children: ReactNode
  darkMode: boolean
}

export default function PhoneFrame({ children, darkMode }: PhoneFrameProps) {
  const batteryState = useBattery()

  return (
    <div className="relative">
      {/* Outer frame */}
      <div
        className={`w-[340px] h-[680px] rounded-[60px] p-4 ${darkMode ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-gray-200 to-white"} shadow-2xl transition-colors duration-500 relative overflow-hidden`}
      >
        {/* Inner bezel */}
        <div
          className={`absolute inset-0 m-2 rounded-[55px] border-8 ${darkMode ? "border-gray-700" : "border-gray-300"} transition-colors duration-500`}
        ></div>

        {/* Power button */}
        <div
          className={`absolute right-[-5px] top-[140px] w-[5px] h-[60px] ${darkMode ? "bg-gray-700" : "bg-gray-400"} rounded-r-md transition-colors duration-500`}
        ></div>

        {/* Volume buttons */}
        <div
          className={`absolute left-[-5px] top-[100px] w-[5px] h-[40px] ${darkMode ? "bg-gray-700" : "bg-gray-400"} rounded-l-md transition-colors duration-500`}
        ></div>
        <div
          className={`absolute left-[-5px] top-[150px] w-[5px] h-[40px] ${darkMode ? "bg-gray-700" : "bg-gray-400"} rounded-l-md transition-colors duration-500`}
        ></div>

        {/* Screen */}
        <div
          className={`w-full h-full rounded-[50px] overflow-hidden relative ${darkMode ? "bg-black" : "bg-white"} transition-colors duration-500`}
        >
          {/* Camera cutout */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[80px] h-[30px] bg-black rounded-b-[20px] z-20 flex items-center justify-center">
            <div className="w-[10px] h-[10px] rounded-full bg-gray-800 ring-2 ring-gray-700"></div>
          </div>

          {children}
        </div>
      </div>

      {/* Charging indicator */}
      {batteryState.charging && (
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${darkMode ? "bg-gray-900/90" : "bg-white/90"} backdrop-blur-md text-${darkMode ? "white" : "black"} px-6 py-4 rounded-2xl z-30 flex items-center shadow-lg transition-colors duration-500`}
        >
          <div
            className={`w-8 h-12 border-3 ${darkMode ? "border-white" : "border-black"} rounded-md relative mr-3 transition-colors duration-500`}
          >
            <div
              className={`absolute bottom-0 left-0 right-0 h-8 ${batteryState.level > 0.2 ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <div
              className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-1 ${darkMode ? "bg-white" : "bg-black"} rounded-t-sm transition-colors duration-500`}
            ></div>
          </div>
          <div>
            <div className="text-lg font-medium">Cargando</div>
            <div className="text-sm">{Math.round(batteryState.level * 100)}% completado</div>
          </div>
        </div>
      )}
    </div>
  )
}

