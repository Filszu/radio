'use server';

import supabase from '@/config/supaBaseClient';
import { USong } from '@/types';
import { revalidatePath } from 'next/cache';

export default async function postSong(formData: FormData) {
    console.log('Posting song...');

    const songUrl = formData.get('songURL')?.toString();
    if (!songUrl) return null;

    // Check if the song URL is a valid YouTube or Spotify URL
    const youtubeRegex = /^(https?:\/\/)?(music\.youtube\.com\/watch\?v=)([\w-]+)(?:&.*)?$/;
    const spotifyTrackRegex = /^(https?:\/\/)?(www\.)?(open\.spotify\.com\/track\/)([\w]+)(\?.*)?$/;

    if (!songUrl) {
        console.error('Invalid song URL');
        return null;
    }

    let trimmedSongUrl = songUrl;
    const spotifyMatch = songUrl.match(spotifyTrackRegex);
    const youtubeMatch = songUrl.match(youtubeRegex);

    if (spotifyMatch) {
        trimmedSongUrl = `https://open.spotify.com/track/${spotifyMatch[4]}`;
    } else if (youtubeMatch) {
        trimmedSongUrl = `https://music.youtube.com/watch?v=${youtubeMatch[3]}`;
    } else {
        console.log('Invalid song URL');
        return null;
    }

    console.log('Song URL is valid', trimmedSongUrl);

    // Check if the song is already in the DB
    let { data: uSongs, error: error1 } = await supabase
        .from('uSongs')
        .select('id, url')
        .eq('url', trimmedSongUrl)
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
            .insert({ url: trimmedSongUrl })
            .select('id')
            .limit(1);

        if (error || error1) {
            console.error(error ?? error1);
            return null;
        }

        const insertedRowId = data[0].id;

        return {
            songId: insertedRowId,
            songStatus: 'new',
        };
    }

    // revalidatePath("/")
}
