"use client"

import { Phone, User, X } from "lucide-react"
import { useEffect, useState } from "react"
import AppLayout from "./app-layout"

interface PhoneAppProps {
  onHome: () => void
  darkMode: boolean
}

export default function PhoneApp({ onHome, darkMode }: PhoneAppProps) {
  const [dialNumber, setDialNumber] = useState("")
  const [isInCall, setIsInCall] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [callFailed, setCallFailed] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isInCall && !callFailed) {
      timer = setInterval(() => {
        setCallDuration((prev) => {
          const newDuration = prev + 1
          // After 60 seconds (1 minute), fail the call
          if (newDuration >= 60) {
            setCallFailed(true)
            clearInterval(timer)
          }
          return newDuration
        })
      }, 1000)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [isInCall, callFailed])

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const addDigit = (digit: string) => {
    setDialNumber((prev) => prev + digit)
  }

  const deleteDigit = () => {
    setDialNumber((prev) => prev.slice(0, -1))
  }

  const startCall = () => {
    if (dialNumber) {
      setIsInCall(true)
    }
  }

  const endCall = () => {
    setIsInCall(false)
    setCallDuration(0)
    setCallFailed(false)
  }

  const contacts = [
    { name: "Carlos", number: "0414-5908099" },
    { name: "Laura", number: "0424-3811068" },
    { name: "Trabajo", number: "0424-3590701" },
  ]

  if (isInCall) {
    return (
      <AppLayout title="Llamada" onHome={onHome} hideHeader darkMode={darkMode}>
        <div
          className={`flex flex-col h-full ${darkMode ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-indigo-500 to-indigo-700"} transition-colors duration-500`}
        >
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div
              className={`w-28 h-28 rounded-full ${darkMode ? "bg-gradient-to-br from-cyan-500 to-cyan-700" : "bg-gradient-to-br from-cyan-400 to-cyan-600"} flex items-center justify-center mb-6 shadow-lg transition-colors duration-500`}
            >
              <User className="w-14 h-14 text-white" />
            </div>

            <div className="text-2xl font-medium mb-2 text-white">{dialNumber || "Número desconocido"}</div>

            {callFailed ? (
              <div className="text-red-400 mt-2">No se pudo realizar la llamada</div>
            ) : (
              <div className="text-gray-300">Llamando... {formatCallDuration(callDuration)}</div>
            )}
          </div>

          <div className="p-8">
            <button
              onClick={endCall}
              className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center mx-auto shadow-lg transition-colors duration-200 transform active:scale-95"
            >
              <X className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout title="Teléfono" onHome={onHome} darkMode={darkMode}>
      <div
        className={`flex flex-col h-full ${darkMode ? "bg-gray-900" : "bg-gray-100"} transition-colors duration-500`}
      >
        {dialNumber && (
          <div className="text-center py-8">
            <div
              className={`text-4xl font-light ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
            >
              {dialNumber}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 px-6 mt-auto mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "*", 0, "#"].map((num) => (
            <button
              key={num}
              className={`h-16 w-16 rounded-full ${darkMode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-white text-gray-800 hover:bg-gray-200"} flex items-center justify-center mx-auto shadow-md transition-colors duration-200 transform active:scale-95`}
              onClick={() => addDigit(num.toString())}
            >
              <span className="text-2xl">{num}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-center mb-8">
          <button
            className={`h-16 w-16 rounded-full ${darkMode ? "bg-cyan-600 hover:bg-cyan-500" : "bg-cyan-500 hover:bg-cyan-400"} flex items-center justify-center shadow-lg transition-colors duration-200 transform active:scale-95`}
            onClick={startCall}
          >
            <Phone className="w-8 h-8 text-white" />
          </button>
        </div>

        <div className="mb-6">
          <div
            className={`text-sm font-medium px-4 mb-2 ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-500`}
          >
            Contactos recientes
          </div>
          <div className="space-y-2">
            {contacts.map((contact) => (
              <div
                key={contact.name}
                className={`flex items-center px-4 py-3 ${darkMode ? "hover:bg-gray-800" : "hover:bg-white"} transition-colors duration-200 cursor-pointer`}
                onClick={() => {
                  setDialNumber(contact.number)
                }}
              >
                <div
                  className={`w-12 h-12 rounded-full ${darkMode ? "bg-gradient-to-br from-cyan-500 to-cyan-700" : "bg-gradient-to-br from-cyan-400 to-cyan-600"} flex items-center justify-center mr-4 shadow-md transition-colors duration-500`}
                >
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div
                    className={`font-medium ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
                  >
                    {contact.name}
                  </div>
                  <div
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-500`}
                  >
                    {contact.number}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

