"use client"

import { useState, useEffect, useRef } from "react"
import AppLayout from "./app-layout"
import { Mic, Square, Play, Pause, Volume2, List, AlertCircle, Trash2 } from "lucide-react"

interface MicrophoneAppProps {
  onHome: () => void
  darkMode: boolean
}

interface Recording {
  id: number
  name: string
  duration: number
  date: string
  audioBlob?: Blob
  audioUrl?: string
}

export default function MicrophoneApp({ onHome, darkMode }: MicrophoneAppProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackTime, setPlaybackTime] = useState(0)
  const [permissionStatus, setPermissionStatus] = useState<"granted" | "denied" | "prompt" | "">("")
  const [errorMessage, setErrorMessage] = useState("")

  // Refs for audio recording and playback
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioStreamRef = useRef<MediaStream | null>(null)
  const audioElementRef = useRef<HTMLAudioElement | null>(null)

  // Initialize audio element
  useEffect(() => {
    audioElementRef.current = new Audio()
    audioElementRef.current.addEventListener("ended", () => {
      setIsPlaying(false)
      setPlaybackTime(0)
    })

    // Check for microphone permission
    const checkMicrophonePermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({ name: "microphone" as PermissionName })
        setPermissionStatus(permissionStatus.state)

        permissionStatus.onchange = () => {
          setPermissionStatus(permissionStatus.state)
        }
      } catch (error) {
        console.error("Error checking microphone permission:", error)
      }
    }

    checkMicrophonePermission()

    return () => {
      if (audioElementRef.current) {
        audioElementRef.current.pause()
        audioElementRef.current.removeEventListener("ended", () => {})
      }

      // Stop any active streams when component unmounts
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // Handle recording timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else if (!isRecording && recordingTime !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isRecording, recordingTime])

  // Handle playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && selectedRecording) {
      interval = setInterval(() => {
        if (audioElementRef.current) {
          const currentTime = Math.floor(audioElementRef.current.currentTime)
          setPlaybackTime(currentTime)

          if (currentTime >= selectedRecording.duration) {
            setIsPlaying(false)
            clearInterval(interval)
          }
        }
      }, 1000)
    } else if (!isPlaying) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isPlaying, selectedRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startRecording = async () => {
    try {
      setErrorMessage("")
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioStreamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const audioUrl = URL.createObjectURL(audioBlob)

        const newRecording: Recording = {
          id: Date.now(),
          name: `Grabación ${recordings.length + 1}`,
          duration: recordingTime,
          date: "Hoy",
          audioBlob,
          audioUrl,
        }

        setRecordings([newRecording, ...recordings])
        setRecordingTime(0)

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop())
        audioStreamRef.current = null
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      setErrorMessage("No se pudo acceder al micrófono. Por favor, verifica los permisos.")
      setIsRecording(false)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const playRecording = (recording: Recording) => {
    if (!recording.audioUrl) return

    if (audioElementRef.current) {
      audioElementRef.current.src = recording.audioUrl
      audioElementRef.current.play()
      setIsPlaying(true)
    }
  }

  const pausePlayback = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause()
      setIsPlaying(false)
    }
  }

  const togglePlayback = () => {
    if (!selectedRecording || !selectedRecording.audioUrl) return

    if (isPlaying) {
      pausePlayback()
    } else {
      playRecording(selectedRecording)
    }
  }

  const deleteRecording = (id: number) => {
    const recordingToDelete = recordings.find((rec) => rec.id === id)

    if (recordingToDelete && recordingToDelete.audioUrl) {
      URL.revokeObjectURL(recordingToDelete.audioUrl)
    }

    setRecordings(recordings.filter((rec) => rec.id !== id))

    if (selectedRecording && selectedRecording.id === id) {
      if (isPlaying && audioElementRef.current) {
        audioElementRef.current.pause()
      }
      setSelectedRecording(null)
      setIsPlaying(false)
      setPlaybackTime(0)
    }
  }

  const renderPermissionRequest = () => (
    <div
      className={`flex-1 flex flex-col items-center justify-center p-6 text-center ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
    >
      <div
        className={`w-20 h-20 rounded-full ${darkMode ? "bg-yellow-500/20" : "bg-yellow-100"} flex items-center justify-center mb-6 transition-colors duration-500`}
      >
        <AlertCircle
          className={`w-10 h-10 ${darkMode ? "text-yellow-400" : "text-yellow-500"} transition-colors duration-500`}
        />
      </div>

      <h3
        className={`text-xl font-medium mb-4 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
      >
        Permiso de micrófono requerido
      </h3>
      <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6 transition-colors duration-500`}>
        Para grabar audio, necesitamos acceso a tu micrófono. Por favor, concede el permiso cuando se te solicite.
      </p>

      <button
        className={`px-6 py-3 ${darkMode ? "bg-indigo-600 hover:bg-indigo-500" : "bg-indigo-500 hover:bg-indigo-400"} text-white rounded-xl shadow-lg transition-colors duration-200 transform active:scale-95`}
        onClick={startRecording}
      >
        Conceder acceso
      </button>
    </div>
  )

  return (
    <AppLayout title="Grabadora de Voz" onHome={onHome} darkMode={darkMode}>
      <div
        className={`flex flex-col h-full ${darkMode ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-gray-100 to-white"} text-${darkMode ? "white" : "gray-800"} transition-colors duration-500`}
      >
        {errorMessage && (
          <div
            className={`${darkMode ? "bg-red-500/20 border border-red-500/50 text-white" : "bg-red-100 border border-red-200 text-red-800"} p-4 m-4 rounded-xl transition-colors duration-500`}
          >
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {permissionStatus === "denied" ? (
          <div
            className={`flex-1 flex flex-col items-center justify-center p-6 text-center ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
          >
            <div
              className={`w-20 h-20 rounded-full ${darkMode ? "bg-red-500/20" : "bg-red-100"} flex items-center justify-center mb-6 transition-colors duration-500`}
            >
              <AlertCircle
                className={`w-10 h-10 ${darkMode ? "text-red-400" : "text-red-500"} transition-colors duration-500`}
              />
            </div>

            <h3
              className={`text-xl font-medium mb-4 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
            >
              Permiso denegado
            </h3>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-2 transition-colors duration-500`}>
              Has denegado el acceso al micrófono. Para usar esta aplicación, necesitas permitir el acceso en la
              configuración de tu navegador.
            </p>
            <p className={`text-sm ${darkMode ? "text-gray-500" : "text-gray-500"} transition-colors duration-500`}>
              Puedes cambiar esta configuración en la barra de direcciones o en la configuración de tu navegador.
            </p>
          </div>
        ) : selectedRecording ? (
          // Playback view
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div
              className={`w-36 h-36 rounded-full ${darkMode ? "bg-gradient-to-br from-indigo-500 to-purple-600" : "bg-gradient-to-br from-indigo-400 to-purple-500"} flex items-center justify-center mb-8 shadow-lg transition-colors duration-500`}
            >
              <Volume2 className="w-16 h-16 text-white" />
            </div>

            <div
              className={`text-xl font-medium mb-2 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
            >
              {selectedRecording.name}
            </div>
            <div className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6 transition-colors duration-500`}>
              {selectedRecording.date}
            </div>

            <div className="w-full mb-6">
              <div
                className={`w-full h-2 ${darkMode ? "bg-gray-700" : "bg-gray-300"} rounded-full overflow-hidden transition-colors duration-500`}
              >
                <div
                  className={`h-full ${darkMode ? "bg-indigo-500" : "bg-indigo-500"} transition-colors duration-500`}
                  style={{ width: `${(playbackTime / selectedRecording.duration) * 100}%` }}
                ></div>
              </div>
              <div
                className={`flex justify-between text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mt-2 transition-colors duration-500`}
              >
                <div>{formatTime(playbackTime)}</div>
                <div>{formatTime(selectedRecording.duration)}</div>
              </div>
            </div>

            <div className="flex space-x-6">
              <button
                className={`w-14 h-14 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"} flex items-center justify-center transition-colors duration-200 transform active:scale-95`}
                onClick={() => {
                  if (isPlaying && audioElementRef.current) {
                    audioElementRef.current.pause()
                  }
                  setSelectedRecording(null)
                  setIsPlaying(false)
                  setPlaybackTime(0)
                }}
              >
                <List
                  className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
                />
              </button>

              <button
                className={`w-20 h-20 rounded-full ${isPlaying ? (darkMode ? "bg-red-600 hover:bg-red-500" : "bg-red-500 hover:bg-red-400") : darkMode ? "bg-indigo-600 hover:bg-indigo-500" : "bg-indigo-500 hover:bg-indigo-400"} flex items-center justify-center text-white shadow-lg transition-colors duration-200 transform active:scale-95`}
                onClick={togglePlayback}
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
              </button>

              <button
                className={`w-14 h-14 rounded-full ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"} flex items-center justify-center transition-colors duration-200 transform active:scale-95`}
                onClick={() => deleteRecording(selectedRecording.id)}
              >
                <Trash2
                  className={`w-6 h-6 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
                />
              </button>
            </div>
          </div>
        ) : isRecording ? (
          // Recording view
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div
              className={`w-36 h-36 rounded-full ${darkMode ? "bg-gradient-to-br from-red-500 to-pink-600" : "bg-gradient-to-br from-red-400 to-pink-500"} flex items-center justify-center mb-8 shadow-lg animate-pulse-soft transition-colors duration-500`}
            >
              <Mic className="w-16 h-16 text-white" />
            </div>

            <div
              className={`text-4xl font-light mb-8 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
            >
              {formatTime(recordingTime)}
            </div>

            <button
              className={`w-20 h-20 rounded-full ${darkMode ? "bg-red-600 hover:bg-red-500" : "bg-red-500 hover:bg-red-400"} flex items-center justify-center text-white shadow-lg transition-colors duration-200 transform active:scale-95`}
              onClick={toggleRecording}
            >
              <Square className="w-8 h-8" />
            </button>
          </div>
        ) : permissionStatus === "prompt" ? (
          renderPermissionRequest()
        ) : (
          // Recordings list view
          <div className="flex-1 flex flex-col">
            <div className="p-4 flex-1 overflow-auto hide-scrollbar">
              <div
                className={`text-lg font-medium mb-4 ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
              >
                Grabaciones recientes
              </div>
              {recordings.length === 0 ? (
                <div
                  className={`text-center py-10 ${darkMode ? "text-gray-500" : "text-gray-500"} transition-colors duration-500`}
                >
                  <div className="text-5xl mb-4">🎙️</div>
                  <div className="text-lg">No hay grabaciones. Pulsa el botón de micrófono para empezar a grabar.</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {recordings.map((recording) => (
                    <div
                      key={recording.id}
                      className={`p-4 ${darkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-md flex items-center cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99]`}
                      onClick={() => {
                        setSelectedRecording(recording)
                        setPlaybackTime(0)
                        setIsPlaying(false)
                      }}
                    >
                      <div
                        className={`w-12 h-12 rounded-full ${darkMode ? "bg-indigo-600" : "bg-indigo-500"} flex items-center justify-center mr-4 flex-shrink-0 transition-colors duration-500`}
                      >
                        <Volume2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`font-medium ${darkMode ? "text-white" : "text-gray-800"} transition-colors duration-500`}
                        >
                          {recording.name}
                        </div>
                        <div
                          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"} flex justify-between mt-1 transition-colors duration-500`}
                        >
                          <span>{recording.date}</span>
                          <span>{formatTime(recording.duration)}</span>
                        </div>
                      </div>
                      <button
                        className={`ml-2 p-2 rounded-full ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"} transition-colors duration-200`}
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteRecording(recording.id)
                        }}
                      >
                        <Trash2
                          className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"} transition-colors duration-500`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 flex justify-center">
              <button
                className={`w-20 h-20 rounded-full ${darkMode ? "bg-indigo-600 hover:bg-indigo-500" : "bg-indigo-500 hover:bg-indigo-400"} flex items-center justify-center text-white shadow-lg transition-colors duration-200 transform active:scale-95`}
                onClick={toggleRecording}
              >
                <Mic className="w-8 h-8" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  )
}

