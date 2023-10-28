'use server'
import getSpotifyToken from "@/config/spotifyClient"
import getSongInfoFromSpotify from "./getSongInfo"
import supabase from "@/config/supaBaseClient";
import { genSpotifyUrl } from "@/utils/genSpotifyUrl";



export default async function putSongInfo({songID, songURL, accessToken}:{songID:string, songURL: string, accessToken:string}) {

    

    const trackID = genSpotifyUrl(songURL)

    if(trackID){
    
    const songInfo:any = await getSongInfoFromSpotify({trackId:`${trackID}`, accessToken: accessToken})

    
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