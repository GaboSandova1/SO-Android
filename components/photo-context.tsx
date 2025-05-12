"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Photo {
  id: string
  url: string
  date: string
  liked: boolean
}

interface PhotoContextType {
  photos: Photo[]
  addPhoto: (url: string) => void
  toggleLike: (id: string) => void
  deletePhoto: (id: string) => void
}

const PhotoContext = createContext<PhotoContextType | undefined>(undefined)

export function usePhotos() {
  const context = useContext(PhotoContext)
  if (context === undefined) {
    throw new Error("usePhotos must be used within a PhotoProvider")
  }
  return context
}

export function PhotoProvider({ children }: { children: ReactNode }) {
  // Fotos predeterminadas
  const defaultPhotos: Photo[] = [
    {
      id: "1",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
      date: "Hace 2 días",
      liked: false,
    },
    {
      id: "2",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHw%3D&w=1000&q=80",
      date: "Hace 3 días",
      liked: true,
    },
    {
      id: "3",
      url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80",
      date: "Hace 5 días",
      liked: false,
    },
    {
      id: "4",
      url: "https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8&w=1000&q=80",
      date: "Hace 1 semana",
      liked: false,
    },
  ]

  const [photos, setPhotos] = useState<Photo[]>(defaultPhotos)

  const addPhoto = (url: string) => {
    const newPhoto: Photo = {
      id: Date.now().toString(),
      url,
      date: "Justo ahora",
      liked: false,
    }
    setPhotos([newPhoto, ...photos])
  }

  const toggleLike = (id: string) => {
    setPhotos(photos.map((photo) => (photo.id === id ? { ...photo, liked: !photo.liked } : photo)))
  }

  const deletePhoto = (id: string) => {
    setPhotos(photos.filter((photo) => photo.id !== id))
  }

  return <PhotoContext.Provider value={{ photos, addPhoto, toggleLike, deletePhoto }}>{children}</PhotoContext.Provider>
}

