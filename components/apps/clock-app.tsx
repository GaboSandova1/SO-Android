"use client"

import { useState, useEffect } from "react"
import AppLayout from "./app-layout"
import { Clock, Bell, Timer, StopCircle, Play, Pause, RotateCcw, Plus } from "lucide-react"

interface ClockAppProps {
  onHome: () => void
  darkMode: boolean
}

type Tab = "clock" | "alarm" | "timer" | "stopwatch"

interface Alarm {
  id: number
  time: string
  days: string[]
  active: boolean
  label?: string
}

export default function ClockApp({ onHome, darkMode }: ClockAppProps) {
  const [activeTab, setActiveTab] = useState<Tab>("clock")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stopwatchRunning, setStopwatchRunning] = useState(false)
  const [stopwatchTime, setStopwatchTime] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerTime, setTimerTime] = useState(300) // 5 minutes in seconds
  const [timerInitial, setTimerInitial] = useState(300)
  const [alarms, setAlarms] = useState<Alarm[]>([
    { id: 1, time: "07:00", days: ["L", "M", "X", "J", "V"], active: true, label: "Despertar" },
    { id: 2, time: "13:30", days: ["L", "M", "X", "J", "V"], active: true, label: "Almuerzo" },
    { id: 3, time: "22:00", days: ["L", "M", "X", "J", "V", "S", "D"], active: true, label: "Dormir" },
  ])

  // Update current time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Stopwatch logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (stopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prev) => prev + 10) // Update every 10ms
      }, 10)
    }
    return () => clearInterval(interval)
  }, [stopwatchRunning])

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (timerRunning && timerTime > 0) {
      interval = setInterval(() => {
        setTimerTime((prev) => prev - 1)
      }, 1000)
    } else if (timerTime === 0) {
      setTimerRunning(false)
    }
    return () => clearInterval(interval)
  }, [timerRunning, timerTime])

  const formatStopwatchTime = () => {
    const minutes = Math.floor(stopwatchTime / 60000)
    const seconds = Math.floor((stopwatchTime % 60000) / 1000)
    const milliseconds = Math.floor((stopwatchTime % 1000) / 10)

    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`
  }

  const formatTimerTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleAlarm = (id: number) => {
    setAlarms(alarms.map((alarm) => (alarm.id === id ? { ...alarm, active: !alarm.active } : alarm)))
  }

  const resetStopwatch = () => {
    setStopwatchRunning(false)
    setStopwatchTime(0)
  }

  const resetTimer = () => {
    setTimerRunning(false)
    setTimerTime(timerInitial)
  }

  const setTimer = (seconds: number) => {
    setTimerTime(seconds)
    setTimerInitial(seconds)
  }

  const renderClock = () => (
    <div
      className={`flex flex-col items-center justify-center h-full ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
    >
      <div className="text-7xl font-extralight mb-4">
        {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className={`text-xl ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-500`}>
        {currentTime.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-6">
        <div
          className={`text-center p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg transition-colors duration-500`}
        >
          <div
            className={`text-lg font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-500`}
          >
            Madrid
          </div>
          <div className="text-2xl mt-1">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" })}
          </div>
        </div>
        <div
          className={`text-center p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-lg transition-colors duration-500`}
        >
          <div
            className={`text-lg font-medium ${darkMode ? "text-gray-300" : "text-gray-700"} transition-colors duration-500`}
          >
            Nueva York
          </div>
          <div className="text-2xl mt-1">
            {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", timeZone: "America/New_York" })}
          </div>
        </div>
      </div>
    </div>
  )

  const renderAlarm = () => (
    <div className="h-full p-4">
      <button
        className={`flex items-center justify-center w-full py-3 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} rounded-xl shadow-md mb-6 transition-colors duration-500`}
      >
        <Plus className="w-5 h-5 mr-2" />
        <span>Añadir alarma</span>
      </button>

      <div className="space-y-4">
        {alarms.map((alarm) => (
          <div
            key={alarm.id}
            className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl p-4 shadow-md transition-colors duration-500`}
          >
            <div className="flex justify-between items-center">
              <div
                className={`text-2xl font-light ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
              >
                {alarm.time}
              </div>
              <div className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={alarm.active}
                  onChange={() => toggleAlarm(alarm.id)}
                  className="sr-only peer"
                />
                <div
                  className={`w-11 h-6 ${darkMode ? "bg-gray-700" : "bg-gray-300"} peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 transition-colors duration-500`}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>
                <div
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-500`}
                >
                  {alarm.label}
                </div>
                <div className="flex space-x-1 mt-1">
                  {alarm.days.map((day, index) => (
                    <span
                      key={index}
                      className={`text-xs ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} px-1.5 py-0.5 rounded transition-colors duration-500`}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`${darkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-500`}>
                <Bell className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderTimer = () => (
    <div
      className={`flex flex-col items-center justify-center h-full ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
    >
      <div className="text-7xl font-extralight mb-8">{formatTimerTime(timerTime)}</div>

      <div className="flex space-x-6 mb-10">
        <button
          className={`w-16 h-16 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center justify-center shadow-md transition-colors duration-200 transform active:scale-95`}
          onClick={() => setTimerRunning(!timerRunning)}
        >
          {timerRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
        </button>

        <button
          className={`w-16 h-16 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center justify-center shadow-md transition-colors duration-200 transform active:scale-95`}
          onClick={resetTimer}
        >
          <RotateCcw className="w-7 h-7" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full max-w-md">
        {[1, 5, 10, 15, 30, 60].map((min) => (
          <button
            key={min}
            className={`py-3 ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-100"} rounded-xl shadow-md transition-colors duration-200 transform active:scale-95`}
            onClick={() => setTimer(min * 60)}
          >
            {min} {min === 1 ? "min" : "mins"}
          </button>
        ))}
      </div>
    </div>
  )

  const renderStopwatch = () => (
    <div
      className={`flex flex-col items-center justify-center h-full ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
    >
      <div className="text-7xl font-extralight mb-8">{formatStopwatchTime()}</div>

      <div className="flex space-x-6">
        <button
          className={`w-16 h-16 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center justify-center shadow-md transition-colors duration-200 transform active:scale-95`}
          onClick={() => setStopwatchRunning(!stopwatchRunning)}
        >
          {stopwatchRunning ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
        </button>

        <button
          className={`w-16 h-16 rounded-full ${darkMode ? "bg-gray-800" : "bg-white"} flex items-center justify-center shadow-md transition-colors duration-200 transform active:scale-95`}
          onClick={resetStopwatch}
        >
          <RotateCcw className="w-7 h-7" />
        </button>
      </div>
    </div>
  )

  return (
    <AppLayout title="Reloj" onHome={onHome} darkMode={darkMode}>
      <div
        className={`flex flex-col h-full ${darkMode ? "bg-gray-900" : "bg-gray-100"} transition-colors duration-500`}
      >
        <div
          className={`flex ${darkMode ? "border-gray-800" : "border-gray-200"} border-b transition-colors duration-500`}
        >
          <button
            className={`flex-1 py-4 text-center ${activeTab === "clock" ? (darkMode ? "text-indigo-400 border-b-2 border-indigo-400" : "text-indigo-600 border-b-2 border-indigo-600") : ""} transition-colors duration-200`}
            onClick={() => setActiveTab("clock")}
          >
            <Clock className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Reloj</span>
          </button>

          <button
            className={`flex-1 py-4 text-center ${activeTab === "alarm" ? (darkMode ? "text-indigo-400 border-b-2 border-indigo-400" : "text-indigo-600 border-b-2 border-indigo-600") : ""} transition-colors duration-200`}
            onClick={() => setActiveTab("alarm")}
          >
            <Bell className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Alarma</span>
          </button>

          <button
            className={`flex-1 py-4 text-center ${activeTab === "timer" ? (darkMode ? "text-indigo-400 border-b-2 border-indigo-400" : "text-indigo-600 border-b-2 border-indigo-600") : ""} transition-colors duration-200`}
            onClick={() => setActiveTab("timer")}
          >
            <Timer className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Temporizador</span>
          </button>

          <button
            className={`flex-1 py-4 text-center ${activeTab === "stopwatch" ? (darkMode ? "text-indigo-400 border-b-2 border-indigo-400" : "text-indigo-600 border-b-2 border-indigo-600") : ""} transition-colors duration-200`}
            onClick={() => setActiveTab("stopwatch")}
          >
            <StopCircle className="w-5 h-5 mx-auto mb-1" />
            <span className="text-xs">Cronómetro</span>
          </button>
        </div>

        <div className="flex-1 overflow-auto hide-scrollbar">
          {activeTab === "clock" && renderClock()}
          {activeTab === "alarm" && renderAlarm()}
          {activeTab === "timer" && renderTimer()}
          {activeTab === "stopwatch" && renderStopwatch()}
        </div>
      </div>
    </AppLayout>
  )
}

