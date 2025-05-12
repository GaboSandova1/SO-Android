"use client"

import { useState, useRef, useEffect } from "react"
import AppLayout from "./app-layout"
import { FlipHorizontal, ImageIcon, CameraIcon, Zap, ZapOff } from "lucide-react"
import { usePhotos } from "../photo-context"

interface CameraAppProps {
  onHome: () => void
  darkMode: boolean
}

export default function CameraApp({ onHome, darkMode }: CameraAppProps) {
  const [mode, setMode] = useState<"photo" | "video">("photo")
  const [isCapturing, setIsCapturing] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [flashOn, setFlashOn] = useState(false)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const { addPhoto } = usePhotos()

  // Inicializar la cámara
  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = {
          video: {
            facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints)

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          streamRef.current = stream
          setCameraReady(true)
          setPermissionDenied(false)
        }
      } catch (error) {
        console.error("Error accessing camera:", error)
        setPermissionDenied(true)
        setCameraReady(false)
      }
    }

    startCamera()

    // Limpiar al desmontar
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [facingMode])

  const takePhoto = () => {
    if (!cameraReady || !videoRef.current || !canvasRef.current) return

    setIsCapturing(true)

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    // Establecer dimensiones del canvas para que coincida con el video
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Dibujar el frame actual del video en el canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Convertir a URL de datos
    const photoUrl = canvas.toDataURL("image/jpeg")

    // Añadir a la galería
    addPhoto(photoUrl)

    // Efecto de flash
    setTimeout(() => {
      setIsCapturing(false)
    }, 200)
  }

  const switchCamera = () => {
    // Detener la cámara actual
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
    }

    // Cambiar la cámara
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
  }

  const toggleFlash = () => {
    setFlashOn((prev) => !prev)

    // Implementar el flash si está disponible
    if (streamRef.current) {
      const track = streamRef.current.getVideoTracks()[0]
      if (track && "applyConstraints" in track) {
        try {
          const capabilities = track.getCapabilities()
          if (capabilities && capabilities.torch) {
            track.applyConstraints({
              advanced: [{ torch: !flashOn }],
            })
          }
        } catch (error) {
          console.error("Flash not supported:", error)
        }
      }
    }
  }

  const renderPermissionDenied = () => (
    <div
      className={`flex flex-col items-center justify-center h-full p-6 text-center ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
    >
      <div
        className={`w-20 h-20 rounded-full ${darkMode ? "bg-red-500/20" : "bg-red-100"} flex items-center justify-center mb-6 transition-colors duration-500`}
      >
        <CameraIcon
          className={`w-10 h-10 ${darkMode ? "text-red-400" : "text-red-500"} transition-colors duration-500`}
        />
      </div>

      <h3
        className={`text-xl font-medium mb-4 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
      >
        Acceso a la cámara denegado
      </h3>
      <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6 transition-colors duration-500`}>
        Para usar la cámara, necesitas permitir el acceso en la configuración de tu navegador.
      </p>
    </div>
  )

  return (
    <AppLayout title="Cámara" onHome={onHome} hideHeader darkMode={darkMode}>
      <div className="relative h-full flex flex-col">
        {permissionDenied ? (
          renderPermissionDenied()
        ) : (
          <>
            <div className="flex-1 bg-black flex items-center justify-center">
              {isCapturing && <div className="absolute inset-0 bg-white opacity-50 z-10"></div>}

              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  onCanPlay={() => setCameraReady(true)}
                />

                <canvas ref={canvasRef} className="hidden" />

                <div className="absolute top-4 right-4 flex flex-col gap-4">
                  <button
                    className={`w-12 h-12 rounded-full ${darkMode ? "bg-black/50" : "bg-white/50"} backdrop-blur-sm flex items-center justify-center transition-colors duration-200`}
                    onClick={switchCamera}
                  >
                    <FlipHorizontal className="w-6 h-6 text-white" />
                  </button>
                  <button
                    className={`w-12 h-12 rounded-full ${darkMode ? "bg-black/50" : "bg-white/50"} backdrop-blur-sm flex items-center justify-center transition-colors duration-200`}
                    onClick={toggleFlash}
                  >
                    {flashOn ? <Zap className="w-6 h-6 text-yellow-400" /> : <ZapOff className="w-6 h-6 text-white" />}
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`${darkMode ? "bg-black" : "bg-gray-900"} p-6 flex items-center justify-between transition-colors duration-500`}
            >
              <button
                className={`w-12 h-12 rounded-full ${darkMode ? "bg-gray-800" : "bg-gray-700"} flex items-center justify-center transition-colors duration-200`}
              >
                <ImageIcon className="w-6 h-6 text-white" />
              </button>

              <button
                className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transform transition-all duration-200 hover:scale-105 active:scale-95"
                onClick={takePhoto}
                disabled={!cameraReady || isCapturing}
              >
                <div className="w-16 h-16 rounded-full bg-white"></div>
              </button>

              <button
                className={`w-12 h-12 rounded-full ${darkMode ? "bg-gray-800" : "bg-gray-700"} flex items-center justify-center transition-colors duration-200`}
              >
                <FlipHorizontal className="w-6 h-6 text-white" />
              </button>
            </div>

            <div
              className={`${darkMode ? "bg-black" : "bg-gray-900"} py-4 flex justify-center transition-colors duration-500`}
            >
              <div className="flex space-x-8">
                <button
                  className={`text-white text-sm ${mode === "photo" ? "font-bold" : "opacity-70"} transition-opacity duration-200`}
                  onClick={() => setMode("photo")}
                >
                  FOTO
                </button>
                <button
                  className={`text-white text-sm ${mode === "video" ? "font-bold" : "opacity-70"} transition-opacity duration-200`}
                  onClick={() => setMode("video")}
                >
                  VIDEO
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}

