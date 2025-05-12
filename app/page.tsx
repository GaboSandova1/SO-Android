"use client"

import { useState } from "react"
import PhoneFrame from "@/components/phone-frame"
import HomeScreen from "@/components/home-screen"
import PhoneApp from "@/components/apps/phone-app"
import CameraApp from "@/components/apps/camera-app"
import CalculatorApp from "@/components/apps/calculator-app"
import ClockApp from "@/components/apps/clock-app"
import MessagingApp from "@/components/apps/messaging-app"
import MicrophoneApp from "@/components/apps/microphone-app"
import GalleryApp from "@/components/apps/gallery-app"
import InstagramApp from "@/components/apps/instagram-app"
import StatusBar from "@/components/status-bar"
import NavigationBar from "@/components/navigation-bar"
import RecentApps from "@/components/recent-apps"
import NotificationsPanel from "@/components/notifications-panel"
import { BatteryProvider } from "@/components/battery-manager"
import { PhotoProvider } from "@/components/photo-context"
import SettingsApp from "@/components/apps/settings-app"

export default function PhoneSimulator() {
  const [currentApp, setCurrentApp] = useState<string | null>(null)
  const [recentApps, setRecentApps] = useState<string[]>([])
  const [showRecents, setShowRecents] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev)
  }

  const openApp = (appName: string) => {
    if (currentApp && currentApp !== appName) {
      if (!recentApps.includes(currentApp)) {
        setRecentApps((prev) => [...prev, currentApp])
      }
    }
    setCurrentApp(appName)
    setShowRecents(false)
    setShowNotifications(false)
  }

  const goHome = () => {
    if (currentApp) {
      if (!recentApps.includes(currentApp)) {
        setRecentApps((prev) => [...prev, currentApp])
      }
    }
    setCurrentApp(null)
    setShowRecents(false)
    setShowNotifications(false)
  }

  const goBack = () => {
    if (showNotifications) {
      setShowNotifications(false)
      return
    }

    if (showRecents) {
      setShowRecents(false)
      return
    }

    if (currentApp) {
      if (!recentApps.includes(currentApp)) {
        setRecentApps((prev) => [...prev, currentApp])
      }
      setCurrentApp(null)
    }
  }

  const toggleRecents = () => {
    setShowRecents(!showRecents)
    setShowNotifications(false)
  }

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    setShowRecents(false)
  }

  return (
    <BatteryProvider>
      <PhotoProvider>
        <div
          className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gradient-to-br from-purple-900 to-black" : "bg-gradient-to-br from-orange-400 to-pink-500"} p-4 transition-colors duration-1000`}
        >

        <style jsx global>{`
          html, body {
            overflow: hidden;
          }
        `}</style>


          <PhoneFrame darkMode={darkMode}>
            <StatusBar
              onToggleNotifications={toggleNotifications}
              darkMode={darkMode}
              onToggleDarkMode={toggleDarkMode}
            />

            {showNotifications && (
              <NotificationsPanel onClose={() => setShowNotifications(false)} darkMode={darkMode} />
            )}

            {showRecents && !showNotifications && (
              <RecentApps
                apps={recentApps}
                onAppClick={openApp}
                onClearAll={() => setRecentApps([])}
                darkMode={darkMode}
              />
            )}

            {currentApp === null && !showRecents && !showNotifications && (
              <HomeScreen onAppClick={openApp} darkMode={darkMode} />
            )}

            {currentApp === "phone" && !showRecents && !showNotifications && (
              <PhoneApp onHome={goHome} darkMode={darkMode} />
            )}

            {currentApp === "camera" && !showRecents && !showNotifications && (
              <CameraApp onHome={goHome} darkMode={darkMode} />
            )}

            {currentApp === "calculator" && !showRecents && !showNotifications && (
              <CalculatorApp onHome={goHome} darkMode={darkMode} />
            )}

            {currentApp === "clock" && !showRecents && !showNotifications && (
              <ClockApp onHome={goHome} darkMode={darkMode} />
            )}

            {currentApp === "messaging" && !showRecents && !showNotifications && (
              <MessagingApp onHome={goHome} darkMode={darkMode} />
            )}

            {currentApp === "microphone" && !showRecents && !showNotifications && (
              <MicrophoneApp onHome={goHome} darkMode={darkMode} />
            )}

            {currentApp === "gallery" && !showRecents && !showNotifications && (
              <GalleryApp onHome={goHome} darkMode={darkMode} />
            )}

            {currentApp === "instagram" && !showRecents && !showNotifications && (
              <InstagramApp onHome={goHome} darkMode={darkMode} />
            )}

            {currentApp === "settings" && !showRecents && !showNotifications && (
              <SettingsApp onHome={goHome} darkMode={darkMode} />
            )}

            <NavigationBar onBack={goBack} onHome={goHome} onRecents={toggleRecents} darkMode={darkMode} />
          </PhoneFrame>
        </div>
      </PhotoProvider>
    </BatteryProvider>
  )
}

