"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Download, ArrowLeft, Check, Video, Music, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import WaveSVG from "../components/wave-svg"
import Image from "next/image"

interface VideoDetails {
  title: string
  author: string
  lengthSeconds: string
  thumbnailUrl: string
}

interface Format {
  itag: number
  mimeType: string
  qualityLabel?: string
  quality?: string
  width?: number
  height?: number
  fps?: number
  bitrate?: number
  contentLength: string
  hasAudio?: boolean
  container: string
  codecs: string
}

interface Formats {
  audio: Format[]
  video: Format[]
}

interface DownloadPageClientProps {
  url: string
  videoDetails: VideoDetails
  formats: Formats
}

export default function DownloadPageClient({ url, videoDetails, formats }: DownloadPageClientProps) {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("audio")
  const [selectedFormat, setSelectedFormat] = useState<number | null>(() => {
    // Set default selected format to highest bitrate audio
    if (formats.audio.length > 0) {
      const highestBitrateAudio = formats.audio.reduce((prev, current) =>
        (prev.bitrate || 0) > (current.bitrate || 0) ? prev : current,
      )
      return highestBitrateAudio.itag
    }
    return null
  })

  const handleDownload = () => {
    if (!selectedFormat) return

    // Redirect to the download loading page with the necessary parameters
    router.push(`/download/loading?url=${encodeURIComponent(url)}&itag=${selectedFormat}`)
  }

  const formatFileSize = (bytes: string) => {
    const size = Number.parseInt(bytes)
    if (isNaN(size) || size === 0) return "Unknown size"

    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`
  }

  const formatDuration = (seconds: string) => {
    const totalSeconds = Number.parseInt(seconds)
    if (isNaN(totalSeconds)) return "00:00"

    const minutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 dark:from-red-950 dark:to-green-950 flex flex-col items-center justify-center p-4 relative">
      <WaveSVG className="absolute top-0 left-0 w-full h-full z-0" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-2xl"
      >
        <Button variant="ghost" className="mb-6 text-gray-700 dark:text-gray-300" onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="bg-white/90 dark:bg-gray-900/90 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Download YouTube Video
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-green-100 to-red-100 dark:from-green-900/30 dark:to-red-900/30 p-4 rounded-lg flex gap-4"
              >
                {videoDetails.thumbnailUrl && (
                  <div className="flex-shrink-0">
                    <Image
                      src={videoDetails.thumbnailUrl || "/placeholder.svg"}
                      alt={videoDetails.title}
                      width={120}
                      height={90}
                      className="rounded-md object-cover"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <h3 className="font-medium text-lg text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
                    {videoDetails.title}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <p>Channel: {videoDetails.author}</p>
                    <p>Duration: {formatDuration(videoDetails.lengthSeconds)}</p>
                  </div>
                </div>
              </motion.div>

              <Tabs defaultValue="audio" value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="audio" className="flex items-center gap-2">
                    <Music className="h-4 w-4" />
                    Audio
                  </TabsTrigger>
                  <TabsTrigger value="video" className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    Video
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="audio" className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Select audio quality</span>
                    </div>

                    <Select
                      value={selectedFormat?.toString()}
                      onValueChange={(value) => setSelectedFormat(Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select audio quality" />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.audio
                          .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))
                          .map((format) => (
                            <SelectItem key={format.itag} value={format.itag.toString()}>
                              {format.quality === "AUDIO_QUALITY_MEDIUM"
                                ? "Medium"
                                : format.quality === "AUDIO_QUALITY_HIGH"
                                  ? "High"
                                  : format.quality === "AUDIO_QUALITY_LOW"
                                    ? "Low"
                                    : "Standard"}
                              {format.bitrate ? ` (${Math.round(format.bitrate / 1000)} kbps)` : ""} -{" "}
                              {formatFileSize(format.contentLength)}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="video" className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Select video quality</span>
                    </div>

                    <Select
                      value={selectedFormat?.toString()}
                      onValueChange={(value) => setSelectedFormat(Number.parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select video quality" />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.video
                          .sort((a, b) => {
                            // First sort by whether it has audio (videos with audio first)
                            if (a.hasAudio && !b.hasAudio) return -1
                            if (!a.hasAudio && b.hasAudio) return 1

                            // Then sort by height (resolution)
                            return (b.height || 0) - (a.height || 0)
                          })
                          .map((format) => (
                            <SelectItem key={format.itag} value={format.itag.toString()}>
                              {format.qualityLabel || "Unknown"}
                              {format.hasAudio ? " (with audio)" : " (no audio)"} -{" "}
                              {formatFileSize(format.contentLength)}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>
              </Tabs>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg flex items-center"
              >
                <Check className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-800 dark:text-green-300">Ready to download!</span>
              </motion.div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
              disabled={!selectedFormat}
              onClick={handleDownload}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Now
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

