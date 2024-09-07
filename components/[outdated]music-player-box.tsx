'use client'

import { Disc } from "lucide-react"

interface MusicPlayerBoxProps {
  partyName: string
  partyUrl: string
  partyCreator: string
}

export function MusicPlayerBox({ partyName = "Summer Vibes", partyUrl = "https://party.com/summer-vibes", partyCreator = "DJ Cool" }: MusicPlayerBoxProps) {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-lg shadow-lg max-w-sm mx-auto">
      <div className="flex items-center justify-center mb-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center animate-spin-slow">
            <Disc className="w-16 h-16 text-white" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full" />
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">{partyName}</h2>
        <p className="text-sm text-white mb-1">
          <a href={partyUrl} className="underline hover:text-purple-200 transition-colors duration-200">
            {partyUrl}
          </a>
        </p>
        <p className="text-sm text-white opacity-75">Created by {partyCreator}</p>
      </div>
    </div>
  )
}