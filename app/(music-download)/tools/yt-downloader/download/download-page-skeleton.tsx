import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import WaveSVG from "../components/wave-svg"

export default function DownloadPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 dark:from-red-950 dark:to-green-950 flex flex-col items-center justify-center p-4 relative">
      <WaveSVG className="absolute top-0 left-0 w-full h-full z-0" />

      <div className="z-10 w-full max-w-2xl">
        <Button variant="ghost" className="mb-6 text-gray-700 dark:text-gray-300" disabled>
          Back to Home
        </Button>

        <Card className="bg-white/90 dark:bg-gray-900/90 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Loading Video Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-100 to-red-100 dark:from-green-900/30 dark:to-red-900/30 p-4 rounded-lg flex gap-4">
                <Skeleton className="h-[90px] w-[120px] rounded-md flex-shrink-0" />
                <div className="flex-grow space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center">
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-md" />
                </div>
              </div>

              <div className="flex justify-center items-center">
                <Loader2 className="h-8 w-8 text-green-600 dark:text-green-400 animate-spin mr-2" />
                <span className="text-gray-700 dark:text-gray-300">Fetching video information...</span>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
              disabled
            >
              Download Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

