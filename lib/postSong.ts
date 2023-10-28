'use server'

import supabase from "@/config/supaBaseClient"
import { USong } from "@/database.types";
import { revalidatePath } from "next/cache";
import getSongInfoFromSpotify from "./getSongInfo";
import getSpotifyToken from "@/config/spotifyClient";

export default async function postSong(formData: FormData) {

    console.log("Posting song...")

    const songUrl= formData.get("songURL")?.toString()
    if(!songUrl) return null

    // Check if the song URL is a valid YouTube or Spotify URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
    const spotifyRegex = /^(https?:\/\/)?(www\.)?(open\.spotify\.com|spotify\.com\/track)\//;
    if (!songUrl || (!youtubeRegex.test(songUrl) && !spotifyRegex.test(songUrl))) {
        console.error("Invalid song URL");
        return null;
    }

    console.log("Song URL is valid", songUrl)

    const { error } = await supabase
    .from('uSongs')
    .insert({ url:`${songUrl}`, })

    if (error) {
        console.error(error);
        return null;
    }

   

    if(spotifyRegex.test(songUrl)) {
        console.log("Spotify URL detected, fetching song info...")
        // const trackId  = songUrl.split("/")[4].split("?")[0]
        const access_token = await getSpotifyToken()
        await getSongInfoFromSpotify({trackId:'19SEn5eUuuixwxFPNtrq7D', accessToken: access_token})
    }


    revalidatePath("/")
}

