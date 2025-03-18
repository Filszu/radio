'use client';
import { Progress } from '@/components/ui/progress'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Loading_page = async() => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const url = searchParams.get("url") || ""
  
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState("")
    const [metadata, setMetadata] = useState<any>(null)
    const [format, setFormat] = useState("mp3")
    const [quality, setQuality] = useState("high")
    const [downloadReady, setDownloadReady] = useState(false)
  
    useEffect(() => {
      if (!url) {
        router.push("/")
        return
      }
  
      // Simulate fetching metadata
      const timer = setTimeout(() => {
        try {
          // This is just a simulation - in a real app, you'd fetch actual metadata
          if (url.includes("youtube") || url.includes("spotify")) {
            setMetadata({
              title: "Sample Music Track",
              artist: "Various Artists",
              duration: "3:45",
              source: url.includes("youtube") ? "YouTube" : "Spotify",
            })
            setLoading(false)
          } else {
            throw new Error("Invalid URL. Please provide a valid YouTube or Spotify link.")
          }
        } catch (err: any) {
          setError(err.message)
          setLoading(false)
        }
      }, 1500)
  
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressInterval)
            return 100
          }
          return prev + 5
        })
      }, 150)
  
      return () => {
        clearTimeout(timer)
        clearInterval(progressInterval)
      }
    }, [url, router])
  
    useEffect(() => {
      if (progress === 100) {
        setTimeout(() => {
          setDownloadReady(true)
        }, 500)
      }
    }, [progress])
  

  return (
    <div className="space-y-4">
                <p className="text-center text-gray-700 dark:text-gray-300">
                  Fetching information 
                  
                  {/* from {url.includes("youtube") ? "YouTube" : "Spotify"}... */}
                </p>
                <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
              </div>
  )
}

export default Loading_page