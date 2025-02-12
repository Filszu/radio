import supabase from '@/config/supaBaseClient';
import { UPartySong, USong } from '@/types';
import { GetSongsParams, IPartySong } from '@/types';
export async function getUPartySong({
    limit,
    asc,
    order,
    status,
    staringIndex,
    dateOlderThan,
    partyId,
    USongId,
}: GetSongsParams) {
    console.log('GET REQUEST getUPartySong');

    console.log('USongId', USongId);

    let { data: uPartySongs, error } = await supabase
        .from('uPartySongs')
        .select(`*`)

        .eq('partyId', partyId ?? 1)
        .eq('USongId', USongId ?? '')
        // .in('status', [status])

        .gte('created_at', dateOlderThan ?? '2025-02-11')
        // .range(staringIndex ?? 0, limit ?? 10)
        .limit(limit ?? 1)
        .order(order ?? 'created_at', { ascending: asc ?? false })
        .order('votesPlus', { ascending: false });

    if (error) throw error;
    //

    // const songs = {
    //     uPartySongs,
    //     ...uSongs
    // }
    if (!uPartySongs) throw error;

    console.log('the SONG', uPartySongs);

    return uPartySongs as UPartySong[];

    // return uPartySongs as USong[];
}
