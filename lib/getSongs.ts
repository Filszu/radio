'use server';

import supabase from '@/config/supaBaseClient';
import { USong } from '@/database.types';
import { IPartySong } from '@/types';

export async function getSongs() {
    const { data, error } = await supabase
        .from('uSongs')
        .select('*')
        .eq('status', 'active')
        .limit(35)
        .order('created_at', { ascending: false })
        .order('votesPlus', { ascending: false });
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

export async function getSongsCustom({
    limit,
    asc,
    order,
    status,
}: GetSongsParams) {
    const { data: uSongs, error } = await supabase
        .from('uSongs')
        .select('*')
        .limit(limit ?? -1)
        .order(order, { ascending: asc ?? false });
    // .order('dailyVotesPlus', { ascending: false })

    if (error) throw error;

    return uSongs as USong[];
}

export async function getPartySongs() {
// {limit, asc, order, status}: GetSongsParams
    let { data: uPartySongs, error } = await supabase
        .from('uPartySongs')
        .select(
            `
          *,
          uSongs (
            title, artist, duration, url, thumbnail, url, explicit, addedTimes
          )
        `,
        )
        .limit(35)
        .order('created_at', { ascending: false })
        .order('votesPlus', { ascending: false });
    if (error) throw error;
    //

    // const songs = {
    //     uPartySongs,
    //     ...uSongs
    // }
    if (!uPartySongs) return null;

    const flattenedPartySongs = uPartySongs.map((song) => {
        const { uSongs, ...rest } = song;
        return { ...uSongs, ...rest };
    });

    return flattenedPartySongs as IPartySong[];

    // return uPartySongs as USong[];
}
