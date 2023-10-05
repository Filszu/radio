'use server'

import supabase from "@/config/supaBaseClient"
import { USong } from "@/database.types";
import { revalidatePath } from "next/cache";

export default async function postSong(formData: FormData) {

    const songUrl = formData.get("songURL")
    

  



    
    const { error } = await supabase
    .from('uSongs')
    .insert({ url:`${songUrl}` })

    

    if (error) {
        console.error(error);
        return null;
    }


    revalidatePath("/")
    
}

