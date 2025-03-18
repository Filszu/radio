import { notFound } from "next/navigation"
import ytdl from "@distube/ytdl-core"
import DownloadPageClient from "./download-page-client"

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

export default async function VideoInfoFetcher({ url }: { url: string }) {
  try {
    // Fetch video info on the server
    const info = await ytdl.getInfo(url)

    // Extract video details
    const videoDetails: VideoDetails = {
      title: info.videoDetails.title,
      author: info.videoDetails.author.name,
      lengthSeconds: info.videoDetails.lengthSeconds,
      thumbnailUrl: info.videoDetails.thumbnails[0]?.url,
    }

    // Extract available formats
    const formats: Formats = {
      audio: info.formats
        .filter((format) => format.hasAudio && !format.hasVideo)
        .map((format) => ({
          itag: format.itag,
          mimeType: format.mimeType || "",
          quality: format.audioQuality || "unknown",
          bitrate: format.audioBitrate,
          contentLength: format.contentLength || "0",
          container: format.container || "",
          codecs: format.audioCodec || "",
        })),
      video: info.formats
        .filter((format) => format.hasVideo)
        .map((format) => ({
          itag: format.itag,
          mimeType: format.mimeType || "",
          qualityLabel: format.qualityLabel,
          width: format.width,
          height: format.height,
          fps: format.fps,
          bitrate: format.bitrate,
          contentLength: format.contentLength || "0",
          hasAudio: format.hasAudio,
          container: format.container || "",
          codecs: format.codecs || "",
        })),
    }

    // Pass the data to the client component
    return <DownloadPageClient url={url} videoDetails={videoDetails} formats={formats} />
  } catch (error) {
    console.error("Error fetching video info:", error)
    notFound()
  }
}

