"use client"

import { useState } from "react"
import AppLayout from "./app-layout"
import { X, Download, Share2, Heart, Trash2 } from "lucide-react"
import { usePhotos } from "../photo-context"

interface GalleryAppProps {
  onHome: () => void
  darkMode: boolean
}

export default function GalleryApp({ onHome, darkMode }: GalleryAppProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const { photos, toggleLike, deletePhoto } = usePhotos()

  const handleToggleLike = (id: string) => {
    toggleLike(id)
  }

  const handleDeletePhoto = (id: string) => {
    if (selectedPhoto) {
      setSelectedPhoto(null)
    }
    deletePhoto(id)
  }

  const getPhotoById = (url: string | null) => {
    if (!url) return null
    return photos.find((photo) => photo.url === url)
  }

  const selectedPhotoData = getPhotoById(selectedPhoto)

  return (
    <AppLayout title="Galería" onHome={onHome} darkMode={darkMode}>
      {selectedPhoto ? (
        <div className="relative h-full bg-black pb-4 hide-scrollbar">
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 z-10 flex justify-between items-center">
            <button
              className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
              onClick={() => setSelectedPhoto(null)}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <div className="flex space-x-4">
              <button className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-white" />
              </button>
              <button className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                <Download className="w-5 h-5 text-white" />
              </button>
              {selectedPhotoData && (
                <>
                  <button
                    className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
                    onClick={() => handleToggleLike(selectedPhotoData.id)}
                  >
                    <Heart
                      className={`w-5 h-5 ${selectedPhotoData.liked ? "text-red-500 fill-red-500" : "text-white"}`}
                    />
                  </button>
                  <button
                    className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
                    onClick={() => handleDeletePhoto(selectedPhotoData.id)}
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </>
              )}
            </div>
          </div>

          <img src={selectedPhoto || "/placeholder.svg"} alt="Selected" className="w-full h-full object-contain" />
        </div>
      ) : (
        <div className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} transition-colors duration-500`}>
          <div className="p-4 flex justify-between items-center">
            <div
              className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-500`}
            >
              {photos.length} fotos
            </div>
            <div className="flex space-x-4">
              <button
                className={`text-sm ${darkMode ? "text-indigo-400" : "text-indigo-600"} transition-colors duration-500`}
              >
                Seleccionar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-1 p-1">
            {photos.map((photo) => (
              <button key={photo.id} className="aspect-square relative" onClick={() => setSelectedPhoto(photo.url)}>
                <img
                  src={photo.url || "/placeholder.svg"}
                  alt={`Gallery image ${photo.id}`}
                  className="w-full h-full object-cover"
                />
                {photo.liked && (
                  <div className="absolute top-2 right-2">
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  )
}

