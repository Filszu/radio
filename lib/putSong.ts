'use server'
import getSpotifyToken from "@/config/spotifyClient"
import getSongInfoFromSpotify from "./getSongInfo"
import supabase from "@/config/supaBaseClient";

const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
const spotifyRegex = /^(https?:\/\/)?(www\.)?(open\.spotify\.com|spotify\.com\/track)\//;

export default async function putSongInfo({songID, songURL, accessToken}:{songID:string, songURL: string, accessToken:string}) {

    

    if(spotifyRegex.test(songURL)) {
      // const trackId  = songUrl.split("/")[4].split("?")[0]
    // const access_token = await getSpotifyToken()
    const songInfo:any = await getSongInfoFromSpotify({trackId:'19SEn5eUuuixwxFPNtrq7D', accessToken: accessToken})

    
    const { data, error } = await supabase
    .from('uSongs')
    .update({ 
        title: songInfo.title??null,
        thumbnail: songInfo.thumbnail??null,
        artist: songInfo.artist??null,
        explicit: songInfo.explicit??null,
        duration: songInfo.duration??null,



    })
    .eq('id', songID)
    .select()
    
    }else{
        return Error("Invalid song URL")
    }

    


    
    
    
}