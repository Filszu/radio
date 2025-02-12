'use server';

import supabase from '@/config/supaBaseClient';
import { USong } from '@/types';
import { revalidatePath } from 'next/cache';

export default async function postSong(formData: FormData) {
    console.log('Posting song...');

    const songUrl = formData.get('songURL')?.toString();
    if (!songUrl) return null;

    // Check if the song URL is a valid YouTube or Spotify URL

    const youtubeRegex = /^(https?:\/\/)?(music\.youtube\.com\/watch\?v=)\w+/;

    const spotifyRegex =
        /^(https?:\/\/)?(www\.)?(open\.spotify\.com|spotify\.com\/track)\//;

    if (!songUrl) {
        console.error('Invalid song URL');
        return null;
    }
    if (!youtubeRegex.test(songUrl) && !spotifyRegex.test(songUrl)) {
        if (!youtubeRegex.test(songUrl)) {
            console.log('Invalid youtube url');
            return null;
        }

        if (!spotifyRegex.test(songUrl)) {
            console.log('Invalid spotify url');
            return null;
        }
    }

    console.log('Song URL is valid', songUrl);

    // that means that the song is already in the DB
    let { data: uSongs, error: error1 } = await supabase
        .from('uSongs')
        .select('id, url')
        .eq('url', songUrl)
        .limit(1)
        .order('created_at', { ascending: false });

    if (uSongs && uSongs.length > 0) {
        console.log('Song already in DB');
        return {
            songId: uSongs[0].id,
            songStatus: 'exists',
        };
    } else {
        const { data, error } = await supabase
            .from('uSongs')
            .insert({ url: `${songUrl}` })
            .select('id')
            .limit(1);

        if (error || error1) {
            console.error(error ?? error1);
            return null;
        }

        const inseredRowId = data[0].id;

        return {
            songId: inseredRowId,
            songStatus: 'new',
        };
    }

    // revalidatePath("/")
}
