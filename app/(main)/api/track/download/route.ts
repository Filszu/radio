import { type NextRequest, NextResponse } from "next/server"
import ytdl from "@distube/ytdl-core"

export async function GET(request: NextRequest) {
  try {
    // Get URL parameters
    const searchParams = request.nextUrl.searchParams
    const url = searchParams.get("url")
    const itag = searchParams.get("itag")

    // Validate URL
    if (!url) {
      return NextResponse.json({ error: "URL parameter is required" }, { status: 400 })
    }

    // Check if URL is from YouTube
    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      return NextResponse.json({ error: "Only YouTube URLs are supported" }, { status: 400 })
    }

    // If itag is provided, download directly with that itag
    if (itag) {
      try {
        const videoInfo = await ytdl.getInfo(url)
        const videoTitle = videoInfo.videoDetails.title
        const sanitizedTitle = videoTitle.replace(/[^\w\s]/gi, "") || "youtube_download"
   

        // Find the format
        const format = videoInfo.formats.find((f) => f.itag === Number.parseInt(itag))
        if (!format) {
          return NextResponse.json({ error: "Selected format not available" }, { status: 400 })
        }

        // Determine content type and file extension
        const mimeType = format.mimeType || ""
        const isAudio = mimeType.includes("audio") || (!format.hasVideo && format.hasAudio)
        const isMP4 = mimeType.includes("mp4")

        let fileExtension = "mp4"
        if (isAudio) {
          fileExtension = "mp3"
        } else if (!isMP4) {
          fileExtension = "webm"
        }

        // Set content type
        let contentType = "video/mp4"
        if (isAudio) {
          contentType = "audio/mpeg"
        } else if (!isMP4) {
          contentType = "video/webm"
        }

        // Create a readable stream from the ytdl download
        const stream = ytdl(url, { quality: itag })

        // Return the stream as a response
        return new Response(stream as unknown as ReadableStream, {
          headers: {
            "Content-Disposition": `attachment; filename="${sanitizedTitle}.${fileExtension}"`,
            "Content-Type": contentType,
          },
        })
      } catch (err) {
        console.error("Download error:", err)
        return NextResponse.json({ error: "Failed to download the video" }, { status: 500 })
      }
    }

    // Get video info
    const info = await ytdl.getInfo(url)

    // Extract video details
    const videoDetails = {
      title: info.videoDetails.title,
      author: info.videoDetails.author.name,
      lengthSeconds: info.videoDetails.lengthSeconds,
      thumbnailUrl: info.videoDetails.thumbnails[0]?.url,
      videoDetails: info.videoDetails,
    }

    // Extract available formats
    const formats = {
      audio: info.formats
        .filter((format) => format.hasAudio && !format.hasVideo)
        .map((format) => ({
          itag: format.itag,
          mimeType: format.mimeType,
          quality: format.audioQuality || "unknown",
          bitrate: format.audioBitrate,
          contentLength: format.contentLength,
          container: format.container,
          codecs: format.audioCodec,
        })),
      video: info.formats
        .filter((format) => format.hasVideo)
        .map((format) => ({
          itag: format.itag,
          mimeType: format.mimeType,
          qualityLabel: format.qualityLabel,
          width: format.width,
          height: format.height,
          fps: format.fps,
          bitrate: format.bitrate,
          contentLength: format.contentLength,
          hasAudio: format.hasAudio,
          container: format.container,
          codecs: format.codecs,
        })),
    }

    // Return the video info and available formats
    return NextResponse.json({
      success: true,
      videoDetails,
      formats,
    })
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json({ error: "Failed to process YouTube URL" }, { status: 500 })
  }
}

