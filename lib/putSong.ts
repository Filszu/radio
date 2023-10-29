'use server'
import getSpotifyToken from "@/config/spotifyClient"
import getSongInfoFromSpotify from "./getSongInfo"
import supabase from "@/config/supaBaseClient";
import { genSpotifyUrl } from "@/utils/genSpotifyUrl";



export default async function putSongInfo({songID, accessToken}:{songID:string, accessToken:string}) {

    

    // get song row basing on id
    const { data, error } = await supabase
    .from('uSongs')
    .select('url')
    .eq('id', songID)
    .limit(1)

    if (error) {
        console.error(error);
        return null;
    }

    

    const trackID = genSpotifyUrl(data[0].url)

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

    return "success"
    
    }else{
        return Error("Invalid song URL")
    }

    


    
    
    
}