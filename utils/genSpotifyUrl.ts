export function genSpotifyUrl(url:string)
{
    
    // Use a regular expression to extract the track ID
    const trackIdPattern = /\/track\/(\w+)/;
    const match = url.match(trackIdPattern);

    if (match && match[1]) {
    const trackId = match[1];
        return trackId;
    } else {
        return null
    }
}
