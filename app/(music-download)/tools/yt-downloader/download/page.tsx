"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
// import WaveSVG from "@/components/wave-svg"

// Sample data to pass to the options page
const sampleVideoData = {
  videoDetails: {
    title: "Sample YouTube Video",
    author: "Sample Channel",
    lengthSeconds: "180",
    thumbnailUrl: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  formats: {
    audio: [
      {
        itag: 140,
        mimeType: 'audio/mp4; codecs="mp4a.40.2"',
        quality: "AUDIO_QUALITY_MEDIUM",
        bitrate: 128000,
        contentLength: "2917504",
        container: "mp4",
        codecs: "mp4a.40.2",
      },
      {
        itag: 251,
        mimeType: 'audio/webm; codecs="opus"',
        quality: "AUDIO_QUALITY_HIGH",
        bitrate: 160000,
        contentLength: "3145728",
        container: "webm",
        codecs: "opus",
      },
    ],
    video: [
      {
        itag: 18,
        mimeType: 'video/mp4; codecs="avc1.42001E, mp4a.40.2"',
        qualityLabel: "360p",
        width: 640,
        height: 360,
        fps: 30,
        bitrate: 500000,
        contentLength: "10485760",
        hasAudio: true,
        container: "mp4",
        codecs: "avc1.42001E, mp4a.40.2",
      },
      {
        itag: 22,
        mimeType: 'video/mp4; codecs="avc1.64001F, mp4a.40.2"',
        qualityLabel: "720p",
        width: 1280,
        height: 720,
        fps: 30,
        bitrate: 2000000,
        contentLength: "20971520",
        hasAudio: true,
        container: "mp4",
        codecs: "avc1.64001F, mp4a.40.2",
      },
    ],
  },
}

export default function DownloadPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const url = searchParams.get("url") || ""

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!url) {
      router.push("/")
      return
    }

    // Simulate fetching data with progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 5
        return newProgress <= 100 ? newProgress : 100
      })
    }, 250) // Update every 250ms to reach 100% in about 5 seconds

    // After 5 seconds, redirect to options page with the data
    const timer = setTimeout(() => {
      // In a real app, you would fetch actual data from the API
      // For now, we'll use the sample data

      // Encode the data to pass via URL
      const encodedData = encodeURIComponent(JSON.stringify(sampleVideoData))
      router.push(`./options?url=${encodeURIComponent(url)}&data=${encodedData}`)
    }, 5000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [url, router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 dark:from-red-950 dark:to-green-950 flex flex-col items-center justify-center p-4 relative">
      {/* <WaveSVG className="absolute top-0 left-0 w-full h-full z-0" /> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <Card className="bg-white/90 dark:bg-gray-900/90 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Fetching Video Information
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Loading video data</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
            </div>

            <div className="flex flex-col items-center justify-center gap-3 py-4">
              <Loader2 className="h-10 w-10 text-green-600 dark:text-green-400 animate-spin" />
              <p className="text-center text-gray-700 dark:text-gray-300">Analyzing YouTube video...</p>
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                We're fetching all available formats and quality options
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

