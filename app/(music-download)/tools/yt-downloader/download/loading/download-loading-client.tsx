"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Download, ArrowLeft, Check, FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"


interface DownloadLoadingClientProps {
  url: string
  itag: string
}

export default function DownloadLoadingClient({ url, itag }: DownloadLoadingClientProps) {
  const router = useRouter()

  const [progress, setProgress] = useState(0)
  const [downloadComplete, setDownloadComplete] = useState(false)
  const [downloadStarted, setDownloadStarted] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState("")
  const downloadLinkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // Create the download URL
    const fullDownloadUrl = `/api/track/download?url=${encodeURIComponent(url)}&itag=${itag}`
    setDownloadUrl(fullDownloadUrl)

    // Start progress animation
    let progressValue = 0
    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 5
      if (progressValue >= 95) {
        clearInterval(progressInterval)
        progressValue = 95
      }
      setProgress(progressValue)
    }, 300)

    // Simulate download preparation
    const timer = setTimeout(() => {
      setDownloadStarted(true)

      // Trigger download automatically
      if (downloadLinkRef.current) {
        downloadLinkRef.current.click()
      }

      // Complete the progress bar
      setTimeout(() => {
        setProgress(100)
        setDownloadComplete(true)
        clearInterval(progressInterval)
      }, 1500)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [url, itag])

  const handleBackToOptions = () => {
    router.push(`/download?url=${encodeURIComponent(url)}`)
  }

  const handleDownloadAgain = () => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.click()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 dark:from-red-950 dark:to-green-950 flex flex-col items-center justify-center p-4 relative">
      {/* <WaveSVG className="absolute top-0 left-0 w-full h-full z-0" /> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <Button variant="ghost" className="mb-6 text-gray-700 dark:text-gray-300" onClick={handleBackToOptions}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Options
        </Button>

        <Card className="bg-white/90 dark:bg-gray-900/90 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Downloading Your File
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Download progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="text-center">
                {!downloadStarted ? (
                  <p className="text-gray-700 dark:text-gray-300">Preparing your download...</p>
                ) : downloadComplete ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg flex flex-col items-center gap-2"
                  >
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                    <span className="text-green-800 dark:text-green-300 font-medium">Download Complete!</span>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      If your download didn't start automatically, click the button below.
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center">
                    <FileDown className="h-6 w-6 text-blue-500 animate-bounce mr-2" />
                    <p className="text-gray-700 dark:text-gray-300">Starting download...</p>
                  </div>
                )}
              </div>

              {/* Hidden download link */}
              <a
                ref={downloadLinkRef}
                href={downloadUrl}
                download
                className="hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download
              </a>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
              onClick={handleDownloadAgain}
              disabled={!downloadStarted}
            >
              <Download className="mr-2 h-5 w-5" />
              Download Again
            </Button>

            <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
              Download Another File
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

