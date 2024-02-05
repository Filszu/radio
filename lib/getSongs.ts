'use server';

import supabase from '@/config/supaBaseClient';
import { USong } from '@/database.types';
import { GetSongsParams, IPartySong } from '@/types';

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

export async function getSongsCustom({
    limit,
    asc,
    order,
    status,
    staringIndex,
}: GetSongsParams) {
    const { data: uSongs, error } = await supabase
        .from('uSongs')
        .select('*')
        .eq('status', 'active')
        .range(staringIndex ?? 0, limit ?? 10)
        // .limit(limit ?? 15)
        .order(order ?? 'created_at', { ascending: asc ?? false })
        .order('votesPlus', { ascending: false });

    if (error) throw error;

    return uSongs as USong[];
}

export async function getPartySongs({
    limit,
    asc,
    order,
    status,
    staringIndex,
    dateOlderThan,
}: GetSongsParams) {
    console.log('GET REQUEST getPartySongs');
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

        // .eq('status', status ? status : 'active')
        .in('status', [status])
        // .in('created_at', ['2024-05-02'])
        .gte('created_at', dateOlderThan?? '2020-10-11')
        .range(staringIndex ?? 0, limit ?? 10)
        // .limit(limit ?? 15)
        .order(order ?? 'created_at', { ascending: asc ?? false })
        .order('votesPlus', { ascending: false });

    if (error) throw error;
    //

    // const songs = {
    //     uPartySongs,
    //     ...uSongs
    // }
    if (!uPartySongs) throw error;

    const flattenedPartySongs = uPartySongs.map((song) => {
        const { uSongs, ...rest } = song;
        return { ...uSongs, ...rest };
    });

    return flattenedPartySongs as IPartySong[];

    // return uPartySongs as USong[];
}
