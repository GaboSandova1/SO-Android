"use client"

import { useState } from "react"
import AppLayout from "./app-layout"
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Search,
  Home,
  Film,
  ShoppingBag,
  Plus,
} from "lucide-react"

interface InstagramAppProps {
  onHome: () => void
  darkMode: boolean
}

export default function InstagramApp({ onHome, darkMode }: InstagramAppProps) {
  const [activeTab, setActiveTab] = useState<"home" | "explore" | "reels" | "shop" | "profile">("home")

  return (
    <AppLayout title="Instagram" onHome={onHome} darkMode={darkMode}>
      <div
        className={`flex flex-col h-full ${darkMode ? "bg-black text-white" : "bg-white text-gray-900"} transition-colors duration-500`}
      >
        <div
          className={`flex justify-between items-center px-4 py-3 border-b ${darkMode ? "border-gray-800" : "border-gray-200"} transition-colors duration-500`}
        >
          <div className="text-2xl font-semibold font-serif">Instagram</div>
          <div className="flex space-x-4">
            <button>
              <Heart className="w-6 h-6" />
            </button>
            <button>
              <MessageCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto hide-scrollbar">
          {/* Stories */}
          <div className="flex space-x-4 p-4 overflow-x-auto hide-scrollbar">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-gray-300 to-gray-400 p-[2px] relative">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                  <Plus className="w-6 h-6 text-gray-800" />
                </div>
              </div>
              <span className="text-xs mt-1">Tu historia</span>
            </div>

            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-gray-100 p-[2px]">
                    <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
                      <img
                        src={`https://picsum.photos/100/100?random=${item}`}
                        alt="Story"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
                <span className="text-xs mt-1">usuario_{item}</span>
              </div>
            ))}
          </div>

          {/* Posts */}
          <div
            className={`border-t ${darkMode ? "border-gray-800" : "border-gray-200"} transition-colors duration-500`}
          >
            {[1, 2, 3].map((post) => (
              <div
                key={post}
                className={`border-b ${darkMode ? "border-gray-800" : "border-gray-200"} pb-4 mb-4 transition-colors duration-500`}
              >
                <div className="flex items-center p-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
                    <div className="w-full h-full rounded-full bg-gray-100 p-[1px]">
                      <img
                        src={`https://picsum.photos/100/100?random=${post + 10}`}
                        alt="Profile"
                        className="w-full h-full rounded-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="ml-2 text-sm font-medium">usuario_${post + 100}</div>
                  <div className="ml-auto">
                    <MoreHorizontal className="w-5 h-5" />
                  </div>
                </div>

                <div className="aspect-square bg-gray-200">
                  <img
                    src={`https://picsum.photos/600/600?random=${post + 20}`}
                    alt="Post"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-3">
                  <div className="flex justify-between mb-2">
                    <div className="flex space-x-4">
                      <Heart className="w-6 h-6" />
                      <MessageCircle className="w-6 h-6" />
                      <Send className="w-6 h-6" />
                    </div>
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-medium">{Math.floor(Math.random() * 10000) + 1000} Me gusta</div>
                  <div className="text-sm mt-1">
                    <span className="font-medium">usuario_${post + 100}</span>{" "}
                    {post === 1
                      ? "Explorando las montañas este fin de semana. La vista era increíble..."
                      : post === 2
                        ? "Paraíso encontrado. Nada como desconectar en estas playas cristalinas..."
                        : "La belleza de la naturaleza en su estado más puro. Estos colores son increíbles..."}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Ver los {Math.floor(Math.random() * 1000) + 100} comentarios
                  </div>
                  <div className="text-xs text-gray-500 mt-1">HACE {Math.floor(Math.random() * 10) + 1} HORAS</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div
          className={`flex justify-between items-center px-6 py-3 border-t ${darkMode ? "border-gray-800 bg-black" : "border-gray-200 bg-white"} transition-colors duration-500`}
        >
          <button onClick={() => setActiveTab("home")}>
            <Home className={`w-6 h-6 ${activeTab === "home" ? "text-pink-500" : ""}`} />
          </button>
          <button onClick={() => setActiveTab("explore")}>
            <Search className={`w-6 h-6 ${activeTab === "explore" ? "text-pink-500" : ""}`} />
          </button>
          <button onClick={() => setActiveTab("reels")}>
            <Film className={`w-6 h-6 ${activeTab === "reels" ? "text-pink-500" : ""}`} />
          </button>
          <button onClick={() => setActiveTab("shop")}>
            <ShoppingBag className={`w-6 h-6 ${activeTab === "shop" ? "text-pink-500" : ""}`} />
          </button>
          <button onClick={() => setActiveTab("profile")}>
            <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="https://picsum.photos/100/100?random=profile"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </button>
        </div>
      </div>
    </AppLayout>
  )
}

