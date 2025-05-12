"use client"

import { useState } from "react"
import AppLayout from "./app-layout"

interface CalculatorAppProps {
  onHome: () => void
  darkMode: boolean
}

export default function CalculatorApp({ onHome, darkMode }: CalculatorAppProps) {
  const [display, setDisplay] = useState("0")
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === "0" ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.")
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes(".")) {
      setDisplay(display + ".")
    }
  }

  const clear = () => {
    setDisplay("0")
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const handleOperator = (nextOperator: string) => {
    const inputValue = Number.parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = performCalculation()
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (operator === "+") {
      return firstOperand! + inputValue
    } else if (operator === "-") {
      return firstOperand! - inputValue
    } else if (operator === "×") {
      return firstOperand! * inputValue
    } else if (operator === "÷") {
      return firstOperand! / inputValue
    }

    return inputValue
  }

  const handleEquals = () => {
    if (!operator || firstOperand === null) return

    const result = performCalculation()
    setDisplay(String(result))
    setFirstOperand(result)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  return (
    <AppLayout title="Calculadora" onHome={onHome} darkMode={darkMode}>
      <div
        className={`flex flex-col h-full ${darkMode ? "bg-gray-900" : "bg-gray-100"} transition-colors duration-500`}
      >
        <div
          className={`text-right p-6 text-4xl font-light ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
        >
          {display}
        </div>

        <div className="grid grid-cols-4 gap-2 p-4 mt-auto mb-4">
          <button
            onClick={clear}
            className={`h-16 rounded-full ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"} flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
          >
            AC
          </button>
          <button
            className={`h-16 rounded-full ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"} flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
          >
            +/-
          </button>
          <button
            className={`h-16 rounded-full ${darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-800"} flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
          >
            %
          </button>
          <button
            onClick={() => handleOperator("÷")}
            className={`h-16 rounded-full ${darkMode ? "bg-amber-500" : "bg-amber-500"} text-white flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
          >
            ÷
          </button>

          {[7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => inputDigit(num.toString())}
              className={`h-16 rounded-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleOperator("×")}
            className={`h-16 rounded-full ${darkMode ? "bg-amber-500" : "bg-amber-500"} text-white flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
          >
            ×
          </button>

          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => inputDigit(num.toString())}
              className={`h-16 rounded-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleOperator("-")}
            className={`h-16 rounded-full ${darkMode ? "bg-amber-500" : "bg-amber-500"} text-white flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
          >
            -
          </button>

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => inputDigit(num.toString())}
              className={`h-16 rounded-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleOperator("+")}
            className={`h-16 rounded-full ${darkMode ? "bg-amber-500" : "bg-amber-500"} text-white flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
          >
            +
          </button>

          <button
            onClick={() => inputDigit("0")}
            className={`col-span-2 h-16 rounded-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className={`h-16 rounded-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
          >
            .
          </button>
          <button
            onClick={handleEquals}
            className={`h-16 rounded-full ${darkMode ? "bg-amber-500" : "bg-amber-500"} text-white flex items-center justify-center text-xl font-medium shadow-md transition-colors duration-200 transform active:scale-95`}
          >
            =
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

