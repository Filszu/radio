import getSpotifyToken from "@/config/spotifyClient"
import getSongInfoFromSpotify from "./getSongInfo"

export default async function putSongInfo({trackId, accessToken}:{trackId:string, accessToken:string}) {

   
    console.log("Spotify URL detected, fetching song info...")
    // const trackId  = songUrl.split("/")[4].split("?")[0]
    const access_token = await getSpotifyToken()
    await getSongInfoFromSpotify({trackId:'19SEn5eUuuixwxFPNtrq7D', accessToken: access_token})
    
}