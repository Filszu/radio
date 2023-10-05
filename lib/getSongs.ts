'use server'

import supabase from "@/config/supaBaseClient"
import { USong } from "@/database.types";


export async function getSongs() {
    const {data, error} = await supabase.from("uSongs").select('*').limit(5);

    // console.log(data)

    // if error throw server error
    if (error) throw error;

    // console.log(typeof(data))

    // obiekt 1
    // console.log("obiekt 1 ------------------------")
    //  console.log(data[0])
    return data as USong[];

    

}