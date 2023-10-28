'use server'

import supabase from "@/config/supaBaseClient"
import { USong } from "@/database.types";
import { revalidatePath } from "next/cache";

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

    revalidatePath("/")
}

