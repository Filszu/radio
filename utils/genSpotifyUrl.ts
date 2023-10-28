export function genSpotifyUrl(url:string)
{
    const spotifyUrl = "https://open.spotify.com/track/6gPqBegU4aDWoSYXeCyURA?si=467670ba568f4f91";

    // Use a regular expression to extract the track ID
    const trackIdPattern = /\/track\/(\w+)/;
    const match = spotifyUrl.match(trackIdPattern);

    if (match && match[1]) {
    const trackId = match[1];
        return trackId;
    } else {
        return null
    }
}
