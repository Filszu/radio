'use server'

import supabase from "@/config/supaBaseClient"
import { USong } from "@/database.types";



export async function getSongs() {
    const {data, error} = await supabase.from("uSongs").select('*').eq('status', 'active').limit(15).order('created_at', { ascending: false })
    // .order('dailyVotesPlus', { ascending: false })

    if (error) throw error;


    //  console.log(data[0])
    return data as USong[];

    

}

interface GetSongsParams {
    limit?: number;
    asc?: boolean;
    order: string;
    status?: string;
    
}

export async function getSongsCustom(
    {limit, asc, order, status}: GetSongsParams) {
    const {data:uSongs, error} = await supabase.from("uSongs").select('*').limit(limit??-1).order(order, { ascending: asc??false })
    // .order('dailyVotesPlus', { ascending: false })

    if (error) throw error;

    return uSongs as USong[];
}