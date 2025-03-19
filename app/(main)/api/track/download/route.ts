import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return new Response("Hello, world!");
}
// export const dynamic = "force-dynamic";

// import { type NextRequest, NextResponse } from "next/server";
// import ytdl from "@distube/ytdl-core";

// export async function GET(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const url = searchParams.get("url");
//     const itag = searchParams.get("itag");

//     if (!url) {
//       return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
//     }

//     if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
//       return NextResponse.json({ error: "Only YouTube URLs are supported" }, { status: 400 });
//     }

//     if (itag) {
//       try {
//         const videoInfo = await ytdl.getInfo(url);
//         const videoTitle = videoInfo.videoDetails.title;
//         const sanitizedTitle = videoTitle.replace(/[^\w\s]/gi, "") || "youtube_download";

//         const format = videoInfo.formats.find((f) => f.itag === Number.parseInt(itag));
//         if (!format) {
//           return NextResponse.json({ error: "Selected format not available" }, { status: 400 });
//         }

//         const mimeType = format.mimeType || "";
//         const isAudio = mimeType.includes("audio") || (!format.hasVideo && format.hasAudio);
//         const isMP4 = mimeType.includes("mp4");

//         let fileExtension = isAudio ? "mp3" : isMP4 ? "mp4" : "webm";
//         let contentType = isAudio ? "audio/mpeg" : isMP4 ? "video/mp4" : "video/webm";

//         const stream = ytdl(url, { quality: itag });

//         return new Response(stream as unknown as ReadableStream, {
//           headers: {
//             "Content-Disposition": `attachment; filename="${sanitizedTitle}.${fileExtension}"`,
//             "Content-Type": contentType,
//           },
//         });
//       } catch (err) {
//         console.error("Download error:", err);
//         return NextResponse.json({ error: "Failed to download the video" }, { status: 500 });
//       }
//     }

//     const info = await ytdl.getInfo(url);
//     const videoDetails = {
//       title: info.videoDetails.title,
//       author: info.videoDetails.author.name,
//       lengthSeconds: info.videoDetails.lengthSeconds,
//       thumbnailUrl: info.videoDetails.thumbnails[0]?.url,
//       videoDetails: info.videoDetails,
//     };

//     const formats = {
//       audio: info.formats
//         .filter((format) => format.hasAudio && !format.hasVideo)
//         .map((format) => ({
//           itag: format.itag,
//           mimeType: format.mimeType,
//           quality: format.audioQuality || "unknown",
//           bitrate: format.audioBitrate,
//           contentLength: format.contentLength,
//           container: format.container,
//           codecs: format.audioCodec,
//         })),
//       video: info.formats
//         .filter((format) => format.hasVideo)
//         .map((format) => ({
//           itag: format.itag,
//           mimeType: format.mimeType,
//           qualityLabel: format.qualityLabel,
//           width: format.width,
//           height: format.height,
//           fps: format.fps,
//           bitrate: format.bitrate,
//           contentLength: format.contentLength,
//           hasAudio: format.hasAudio,
//           container: format.container,
//           codecs: format.codecs,
//         })),
//     };

//     return NextResponse.json({ success: true, videoDetails, formats });
//   } catch (error) {
//     console.error("Download error:", error);
//     return NextResponse.json({ error: "Failed to process YouTube URL" }, { status: 500 });
//   }
// }
