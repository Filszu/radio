import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import WaveSVG from "../../components/wave-svg"
export default function DownloadLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-green-50 dark:from-red-950 dark:to-green-950 flex flex-col items-center justify-center p-4 relative">
      <WaveSVG className="absolute top-0 left-0 w-full h-full z-0" />

      <div className="z-10 w-full max-w-md">
        <Button variant="ghost" className="mb-6 text-gray-700 dark:text-gray-300" disabled>
          Back to Options
        </Button>

        <Card className="bg-white/90 dark:bg-gray-900/90 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent">
              Preparing Download
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Initializing...</span>
                  <span>0%</span>
                </div>
                <Progress value={5} className="h-2 bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="flex items-center justify-center">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin mr-2" />
                <p className="text-gray-700 dark:text-gray-300">Setting up download...</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3">
            <Button
              className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
              disabled
            >
              Download Again
            </Button>

            <Button variant="outline" className="w-full" disabled>
              Download Another File
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

