'use server';

import supabase from '@/config/supaBaseClient';
import { Playlists } from '@/types';

interface IPlaylist{
    hostId: number;
    date: string;

}
export async function getPlayList(props: IPlaylist) {

   
    const hostId = props.hostId;
    const date = props.date;
    let { data, error } = await supabase
        .from('playlists')
        .select(`*,
            uSongs: uSongs(*)
            `)
        .eq("party_id", hostId)
        .eq("created_at", date)

        

    if (error) return null;


    return data as Playlists[];
}
