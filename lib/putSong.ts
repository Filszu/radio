'use server';

import { getSongInfoFromYtMusic, getSongInfoFromSpotify } from './getSongInfo';

import supabase from '@/config/supaBaseClient';
import { genYtMusicUrl } from '@/utils/genYTMusicUrl';
import { genSpotifyUrl } from '@/utils/genSpotifyUrl';

export default async function putSongInfo({
    songID,
    accessToken,
    platform,
}: {
    songID: string;
    accessToken: string;
    platform: 'spotify' | 'ytmusic';
}) {
    // get song row basing on id
    const { data, error } = await supabase
        .from('uSongs')
        .select('url')
        .eq('id', songID)
        .limit(1);

    if (error) {
        console.error(error);
        return null;
    }

    let songInfo: any = null;
    if (platform === 'spotify') {
        const trackID = genSpotifyUrl(data[0].url);
        if (trackID) {
            songInfo = await getSongInfoFromSpotify({
                trackId: trackID,
                accessToken,
            });
        }
    } else if (platform === 'ytmusic') {
        const videoID = genYtMusicUrl(data[0].url);
        if (videoID) {
            songInfo = await getSongInfoFromYtMusic({
                videoId: videoID,
                accessToken,
            });
        }
    }

    if (!songInfo || songInfo === null) {
        return null;
        return Error('Invalid song URL or unable to fetch song info');
    }

    const { error: updateError } = await supabase
        .from('uSongs')
        .update({
            title: songInfo.title ?? null,
            thumbnail: songInfo.thumbnail ?? null,
            artist: songInfo.artist ?? null,
            explicit: songInfo.explicit ?? null,
            duration: songInfo.duration ?? null,
        })
        .eq('id', songID)
        .select();

    if (updateError) return null;
    return 'success';
}
