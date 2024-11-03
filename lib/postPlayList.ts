'use server';

import supabase from '@/config/supaBaseClient';
import { Playlists } from '@/types';

interface IPlaylist {
    hostId: number;
    songId: string;
}
export async function postPlayList(props: IPlaylist) {

    console.log("Posting to playlist", props);
    const hostId = props.hostId;
    const date = new Date().toISOString();
    const songId = props.songId;
    let { data, error } = await supabase
        .from('playlists')
        .insert({ party_id: hostId, song_id: songId, created_at: date })
        .select();
    

    if(error){
            console.log(error)
            // return new Error(`${error}`)
        
    }

    console.log(data);

    return "success";
}
