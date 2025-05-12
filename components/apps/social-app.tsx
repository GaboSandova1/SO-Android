import { Heart, MessageCircle, Send } from "lucide-react"
import AppLayout from "./app-layout"

interface SocialAppProps {
  type: "youtube" | "instagram" | "facebook"
  onHome: () => void
}

export default function SocialApp({ type, onHome }: SocialAppProps) {
  const getTitle = () => {
    switch (type) {
      case "youtube":
        return "YouTube"
      case "instagram":
        return "Instagram"
      case "facebook":
        return "Facebook"
    }
  }

  const renderYouTube = () => (
    <div className="flex flex-col h-full hide-scrollbar">
      <div className="p-2">
        <div className="aspect-video bg-gray-200 rounded-lg mb-2">
          <img
            src="https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            alt="Video thumbnail"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="font-medium">Never Gonna Give You Up - Rick Astley</div>
        <div className="text-sm text-gray-500">Rick Astley • 1.2B vistas • hace 13 años</div>
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="p-2">
        <div className="aspect-video bg-gray-200 rounded-lg mb-2">
          <img
            src="https://i.ytimg.com/vi/jNQXAC9IVRw/maxresdefault.jpg"
            alt="Video thumbnail"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="font-medium">Me at the zoo</div>
        <div className="text-sm text-gray-500">jawed • 250M vistas • hace 18 años</div>
      </div>

      <div className="border-t border-gray-200"></div>

      <div className="p-2">
        <div className="aspect-video bg-gray-200 rounded-lg mb-2">
          <img
            src="https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg"
            alt="Video thumbnail"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="font-medium">PSY - GANGNAM STYLE(강남스타일)</div>
        <div className="text-sm text-gray-500">officialpsy • 4.6B vistas • hace 11 años</div>
      </div>
    </div>
  )

  const renderInstagram = () => (
    <div className="flex flex-col h-full hide-scrollbar">
      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center p-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-white p-[2px]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="ml-2 text-sm font-medium">natgeo</div>
        </div>

        <div className="aspect-square bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0dXJlJTIwcGhvdG9ncmFwaHl8ZW58MHx8MHx8&w=1000&q=80"
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-2">
          <div className="flex space-x-4 mb-2">
            <Heart className="w-6 h-6" />
            <MessageCircle className="w-6 h-6" />
            <Send className="w-6 h-6" />
          </div>
          <div className="text-sm font-medium">1,234,567 Me gusta</div>
          <div className="text-sm">
            <span className="font-medium">natgeo</span> Explorando las maravillas de nuestro planeta. Esta impresionante
            vista fue capturada por nuestro fotógrafo en las montañas de Patagonia durante el amanecer...
          </div>
          <div className="text-xs text-gray-500 mt-1">Ver los 12,345 comentarios</div>
        </div>
      </div>

      <div className="border-b border-gray-200 pb-3">
        <div className="flex items-center p-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600 p-[2px]">
            <div className="w-full h-full rounded-full bg-white p-[2px]">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          <div className="ml-2 text-sm font-medium">traveler</div>
        </div>

        <div className="aspect-square bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFyaXN8ZW58MHx8MHx8&w=1000&q=80"
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-2">
          <div className="flex space-x-4 mb-2">
            <Heart className="w-6 h-6" />
            <MessageCircle className="w-6 h-6" />
            <Send className="w-6 h-6" />
          </div>
          <div className="text-sm font-medium">456,789 Me gusta</div>
          <div className="text-sm">
            <span className="font-medium">traveler</span> París nunca decepciona. La Ciudad de la Luz sigue siendo uno
            de mis destinos favoritos en Europa...
          </div>
          <div className="text-xs text-gray-500 mt-1">Ver los 5,678 comentarios</div>
        </div>
      </div>
    </div>
  )

  const renderFacebook = () => (
    <div className="flex flex-col h-full hide-scrollbar">
      <div className="border-b border-gray-200 p-3">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-2 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">Juan Pérez</div>
            <div className="text-xs text-gray-500">Hace 2 h • 🌎</div>
          </div>
        </div>

        <div className="text-sm mb-3">
          ¡Increíble día en la playa! El clima estuvo perfecto y la puesta de sol fue espectacular. #verano #playa
          #atardecer
        </div>

        <div className="rounded-lg overflow-hidden bg-gray-200 mb-2">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2h8ZW58MHx8MHx8&w=1000&q=80"
            alt="Post"
            className="w-full object-cover"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-500 pt-1">
          <div>215 Me gusta</div>
          <div>43 comentarios</div>
        </div>

        <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
          <button className="flex items-center text-sm text-gray-500">
            <Heart className="w-4 h-4 mr-1" />
            Me gusta
          </button>
          <button className="flex items-center text-sm text-gray-500">
            <MessageCircle className="w-4 h-4 mr-1" />
            Comentar
          </button>
          <button className="flex items-center text-sm text-gray-500">
            <Send className="w-4 h-4 mr-1" />
            Compartir
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 p-3">
        <div className="flex items-center mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 mr-2 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium">María García</div>
            <div className="text-xs text-gray-500">Hace 5 h • 🌎</div>
          </div>
        </div>

        <div className="text-sm mb-3">
          ¡Mi nueva receta de pastel de chocolate fue todo un éxito! Aquí les comparto el resultado final. Si alguien
          quiere la receta, déjenme un comentario. 🍰 #repostería #chocolate #homemade
        </div>

        <div className="rounded-lg overflow-hidden bg-gray-200 mb-2">
          <img
            src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2hvY29sYXRlJTIwY2FrZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt="Post"
            className="w-full object-cover"
          />
        </div>

        <div className="flex justify-between text-sm text-gray-500 pt-1">
          <div>432 Me gusta</div>
          <div>78 comentarios</div>
        </div>

        <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
          <button className="flex items-center text-sm text-gray-500">
            <Heart className="w-4 h-4 mr-1" />
            Me gusta
          </button>
          <button className="flex items-center text-sm text-gray-500">
            <MessageCircle className="w-4 h-4 mr-1" />
            Comentar
          </button>
          <button className="flex items-center text-sm text-gray-500">
            <Send className="w-4 h-4 mr-1" />
            Compartir
          </button>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (type) {
      case "youtube":
        return renderYouTube()
      case "instagram":
        return renderInstagram()
      case "facebook":
        return renderFacebook()
      default:
        return null
    }
  }

  return (
    <AppLayout title={getTitle()} onHome={onHome}>
      <div className="pb-2">{renderContent()}</div>
    </AppLayout>
  )
}

