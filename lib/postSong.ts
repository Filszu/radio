'use server'

import supabase from "@/config/supaBaseClient"
import { USong } from "@/database.types";

export default async function postSong(formData: FormData) {

    const {error } = await supabase
        .from("USongs")
        .insert({
            url: formData.get("url"),

        });

    if (error) {
        console.error(error);
        return null;
    }

    // return data?.[0] ?? null;
    
}

