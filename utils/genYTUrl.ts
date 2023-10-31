//gen yt url
export function genYoutubeUrl(url:string)
{
    
    // Use a regular expression to extract the track ID
    const trackIdPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
    const match = url.match(trackIdPattern);

    if (match && match[1]) {
    const trackId = match[1];
        return trackId;
    } else {
        return null
    }
}
