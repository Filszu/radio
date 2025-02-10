export function genYtMusicUrl(url: string) {
    
    console.log("genYtMusicUrl from", url);
    // Use a regular expression to extract the video ID
    const videoIdPattern = /watch\?v=([\w-]+)/;
    const match = url.match(videoIdPattern);

    if (match && match[1]) {
        const videoId = match[1];
        return videoId;
    } else {
        return null;
    }
}
