'use server'

import supabase from "@/config/supaBaseClient"
import { USong } from "@/database.types";


export async function getSongs() {
    const {data, error} = await supabase.from("uSongs").select('*').limit(15).order('created_at', { ascending: false });
    // .order('dailyVotesPlus', { ascending: false })

    if (error) throw error;

    //  console.log(data[0])
    return data as USong[];

    

}