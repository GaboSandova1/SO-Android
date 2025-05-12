"use client"

import { useState } from "react"
import AppLayout from "./app-layout"
import { Send, User, Search, MoreVertical, Phone, Video, ArrowLeft, Paperclip, Mic, Smile } from "lucide-react"

interface MessagingAppProps {
  onHome: () => void
  darkMode: boolean
}

interface Contact {
  id: number
  name: string
  lastMessage: string
  time: string
  unread: number
  avatar?: string
}

interface Message {
  id: number
  text: string
  time: string
  sent: boolean
}

export default function MessagingApp({ onHome, darkMode }: MessagingAppProps) {
  const [activeChat, setActiveChat] = useState<Contact | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [messages, setMessages] = useState<Record<number, Message[]>>({
    1: [
      { id: 1, text: "Hola, ¿cómo estás?", time: "10:30", sent: false },
      { id: 2, text: "¡Bien! ¿Y tú?", time: "10:32", sent: true },
      { id: 3, text: "Todo bien por aquí. ¿Nos vemos esta tarde?", time: "10:33", sent: false },
    ],
    2: [
      { id: 1, text: "¿Ya revisaste el commit que hice en el proyecto?", time: "09:15", sent: false },
      { id: 2, text: "Sí, todo se ve bien. Le mostrare los avances al cliente mas tarde.", time: "09:20", sent: true },
      { id: 3, text: "Perfecto, gracias!", time: "09:21", sent: false },
    ],
    3: [
      { id: 1, text: "¿Recuerdas traer el pastel para la fiesta?", time: "Ayer", sent: false },
      { id: 2, text: "¡No lo olvidaré! Ya lo encargué.", time: "Ayer", sent: true },
    ],
    4: [
      { id: 1, text: "La reunión se cambió para el jueves a las 10am", time: "Lun", sent: false },
      { id: 2, text: "Gracias por avisar", time: "Lun", sent: true },
    ],
    5: [
      { id: 1, text: "¿Viste el partido anoche?", time: "Dom", sent: false },
      { id: 2, text: "¡Sí! Fue increíble ese gol en el último minuto", time: "Dom", sent: true },
    ],
  })

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Mariangel H",
      lastMessage: "Todo bien por aquí. ¿Nos vemos esta tarde?",
      time: "10:33",
      unread: 1,
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80",
    },
    {
      id: 2,
      name: "Miguel Tovar",
      lastMessage: "Perfecto, gracias!",
      time: "09:21",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&w=1000&q=80",
    },
    {
      id: 3,
      name: "Mamá",
      lastMessage: "¡No lo olvidaré! Ya lo encargué.",
      time: "Ayer",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
    {
      id: 4,
      name: "Trabajo",
      lastMessage: "Gracias por avisar",
      time: "Lun",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
    {
      id: 5,
      name: "Gustavo Paez",
      lastMessage: "¡Sí! Fue increíble ese gol en el último minuto",
      time: "Dom",
      unread: 0,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
  ]

  const sendMessage = () => {
    if (!messageInput.trim() || !activeChat) return

    const newMessage: Message = {
      id: Date.now(),
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      sent: true,
    }

    setMessages((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage],
    }))

    setMessageInput("")

    // Simulate reply after 1-3 seconds
    const replyDelay = Math.floor(Math.random() * 2000) + 1000
    setTimeout(() => {
      const replies = [
        "Ok, entendido 👍",
        "¡Genial!",
        "Claro, no hay problema",
        "¿Podemos hablar más tarde?",
        "Gracias por avisarme",
        "¿A qué hora nos vemos?",
        "Estoy ocupado ahora, te escribo luego",
      ]

      const randomReply = replies[Math.floor(Math.random() * replies.length)]

      const replyMessage: Message = {
        id: Date.now(),
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sent: false,
      }

      setMessages((prev) => ({
        ...prev,
        [activeChat.id]: [...(prev[activeChat.id] || []), replyMessage],
      }))
    }, replyDelay)
  }

  const renderChatList = () => (
    <>
      <div className={`p-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"} transition-colors duration-500`}>
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"} w-5 h-5 transition-colors duration-500`}
          />
          <input
            type="text"
            placeholder="Buscar"
            className={`w-full ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-white text-gray-800 placeholder-gray-500"} rounded-xl py-3 pl-10 pr-4 text-sm shadow-md transition-colors duration-500`}
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto hide-scrollbar">
        {contacts.map((contact) => (
          <button
            key={contact.id}
            className={`flex items-center p-4 w-full ${darkMode ? "hover:bg-gray-800 border-b border-gray-800" : "hover:bg-gray-100 border-b border-gray-200"} transition-colors duration-200`}
            onClick={() => setActiveChat(contact)}
          >
            <div className="relative flex-shrink-0">
              {contact.avatar ? (
                <img
                  src={contact.avatar || "/placeholder.svg"}
                  alt={contact.name}
                  className="w-14 h-14 rounded-full object-cover shadow-md"
                  loading="lazy"
                />
              ) : (
                <div
                  className={`w-14 h-14 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-300"} flex items-center justify-center shadow-md transition-colors duration-500`}
                >
                  <User
                    className={`w-7 h-7 ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-500`}
                  />
                </div>
              )}
              {contact.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-xs">{contact.unread}</span>
                </div>
              )}
            </div>
            <div className="ml-4 flex-1 text-left min-w-0">
              <div
                className={`font-medium ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
              >
                {contact.name}
              </div>
              <div
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} truncate transition-colors duration-500`}
              >
                {contact.lastMessage}
              </div>
            </div>
            <div
              className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-500"} ml-2 flex-shrink-0 transition-colors duration-500`}
            >
              {contact.time}
            </div>
          </button>
        ))}
      </div>
    </>
  )

  const renderChat = () => (
    <div className="flex flex-col h-full">
      <div
        className={`flex items-center p-3 ${darkMode ? "bg-gray-800 border-b border-gray-700" : "bg-white border-b border-gray-200"} transition-colors duration-500`}
      >
        <button onClick={() => setActiveChat(null)} className="mr-2 flex-shrink-0">
          <ArrowLeft
            className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
          />
        </button>

        {activeChat?.avatar ? (
          <img
            src={activeChat.avatar || "/placeholder.svg"}
            alt={activeChat.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0 shadow-md"
            loading="lazy"
          />
        ) : (
          <div
            className={`w-10 h-10 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-300"} flex items-center justify-center flex-shrink-0 shadow-md transition-colors duration-500`}
          >
            <User
              className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-500`}
            />
          </div>
        )}

        <div className="ml-3 flex-1 min-w-0">
          <div
            className={`font-medium truncate ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
          >
            {activeChat?.name}
          </div>
          <div className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-500`}>
            En línea
          </div>
        </div>

        <div className="flex space-x-3 flex-shrink-0">
          <button
            className={`w-8 h-8 rounded-full ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} flex items-center justify-center transition-colors duration-200`}
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            className={`w-8 h-8 rounded-full ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} flex items-center justify-center transition-colors duration-200`}
          >
            <Video className="w-4 h-4" />
          </button>
          <button
            className={`w-8 h-8 rounded-full ${darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"} flex items-center justify-center transition-colors duration-200`}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        className={`flex-1 overflow-auto p-4 ${darkMode ? "bg-gray-900" : "bg-gray-100"} hide-scrollbar transition-colors duration-500`}
      >
        <div className="space-y-4">
          {activeChat &&
            messages[activeChat.id]?.map((message) => (
              <div key={message.id} className={`flex ${message.sent ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl p-3 shadow-md ${
                    message.sent
                      ? darkMode
                        ? "bg-indigo-600 text-white rounded-tr-none"
                        : "bg-indigo-500 text-white rounded-tr-none"
                      : darkMode
                        ? "bg-gray-800 text-white rounded-tl-none"
                        : "bg-white text-gray-800 rounded-tl-none"
                  } transition-colors duration-500`}
                >
                  <div className="text-sm">{message.text}</div>
                  <div
                    className={`text-xs mt-1 text-right ${
                      message.sent
                        ? darkMode
                          ? "text-indigo-200"
                          : "text-indigo-100"
                        : darkMode
                          ? "text-gray-400"
                          : "text-gray-500"
                    } transition-colors duration-500`}
                  >
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`p-3 ${darkMode ? "bg-gray-800 border-t border-gray-700" : "bg-white border-t border-gray-200"} flex items-center w-full transition-colors duration-500`}
      >
        <button
          className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} flex-shrink-0 transition-colors duration-200`}
        >
          <Smile className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-500`} />
        </button>
        <button
          className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} flex-shrink-0 transition-colors duration-200`}
        >
          <Paperclip
            className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-500`}
          />
        </button>
        <div className="flex-1 mx-2 min-w-0">
          <input
            type="text"
            placeholder="Mensaje"
            className={`w-full ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-800 placeholder-gray-500"} rounded-full px-4 py-2 transition-colors duration-500`}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
        </div>
        {messageInput ? (
          <button
            className={`p-2 rounded-full ${darkMode ? "bg-indigo-600 hover:bg-indigo-500" : "bg-indigo-500 hover:bg-indigo-400"} flex-shrink-0 transition-colors duration-200`}
            onClick={sendMessage}
          >
            <Send className="w-6 h-6 text-white" />
          </button>
        ) : (
          <button
            className={`p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"} flex-shrink-0 transition-colors duration-200`}
          >
            <Mic className={`w-6 h-6 ${darkMode ? "text-gray-400" : "text-gray-600"} transition-colors duration-500`} />
          </button>
        )}
      </div>
    </div>
  )

  return (
    <AppLayout title="Mensajes" onHome={onHome} hideHeader={!!activeChat} darkMode={darkMode}>
      {activeChat ? renderChat() : renderChatList()}
    </AppLayout>
  )
}

