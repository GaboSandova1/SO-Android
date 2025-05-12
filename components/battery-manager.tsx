"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface BatteryState {
  level: number
  charging: boolean
  chargingTime: number | null
  dischargingTime: number | null
}

const initialBatteryState: BatteryState = {
  level: 1,
  charging: false,
  chargingTime: null,
  dischargingTime: null,
}

const BatteryContext = createContext<BatteryState>(initialBatteryState)

export const useBattery = () => useContext(BatteryContext)

interface BatteryProviderProps {
  children: ReactNode
}

export function BatteryProvider({ children }: BatteryProviderProps) {
  const [batteryState, setBatteryState] = useState<BatteryState>(initialBatteryState)
  const [isSupported, setIsSupported] = useState<boolean | null>(null)

  useEffect(() => {
    // Check if Battery API is supported
    if ("getBattery" in navigator) {
      setIsSupported(true)

      const getBatteryInfo = async () => {
        try {
          // @ts-ignore - TypeScript doesn't recognize getBattery by default
          const battery = await navigator.getBattery()

          // Update battery state initially
          updateBatteryState(battery)

          // Add event listeners for battery changes
          battery.addEventListener("levelchange", () => updateBatteryState(battery))
          battery.addEventListener("chargingchange", () => updateBatteryState(battery))
          battery.addEventListener("chargingtimechange", () => updateBatteryState(battery))
          battery.addEventListener("dischargingtimechange", () => updateBatteryState(battery))

          return () => {
            // Clean up event listeners
            battery.removeEventListener("levelchange", () => updateBatteryState(battery))
            battery.removeEventListener("chargingchange", () => updateBatteryState(battery))
            battery.removeEventListener("chargingtimechange", () => updateBatteryState(battery))
            battery.removeEventListener("dischargingtimechange", () => updateBatteryState(battery))
          }
        } catch (error) {
          console.error("Error accessing battery information:", error)
          setIsSupported(false)
        }
      }

      getBatteryInfo()
    } else {
      setIsSupported(false)
      console.log("Battery API is not supported in this browser")
    }
  }, [])

  const updateBatteryState = (battery: any) => {
    setBatteryState({
      level: battery.level,
      charging: battery.charging,
      chargingTime: battery.chargingTime !== Number.POSITIVE_INFINITY ? battery.chargingTime : null,
      dischargingTime: battery.dischargingTime !== Number.POSITIVE_INFINITY ? battery.dischargingTime : null,
    })
  }

  return <BatteryContext.Provider value={batteryState}>{children}</BatteryContext.Provider>
}

