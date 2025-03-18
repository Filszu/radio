import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-green-50 dark:from-red-950 dark:to-green-950">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 text-green-600 dark:text-green-400 animate-spin" />
        <p className="text-lg text-gray-700 dark:text-gray-300">Preparing download page...</p>
      </div>
    </div>
  )
}

