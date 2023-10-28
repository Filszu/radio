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

    const {data, error } = await supabase
    .from('uSongs')
    .insert({ url:`${songUrl}`, })
    .select('id').limit(1)

    if (error) {
        console.error(error);
        return null;
    }

    console.log(data)
    // data [ { id: 'ea2301b7-1fe8-4492-9d30-1a6f4cf571fe' } ]

    const inseredRowId = data[0].id
    console.log("inseredRowId", inseredRowId)
   


    


    revalidatePath("/")
}

