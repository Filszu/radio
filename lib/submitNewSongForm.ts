'use server';
import getSpotifyToken from '@/config/spotifyClient';
import { AddedSongCookie } from './cookies/addSongCookies';
import postSong from './postSong';
import { genSpotifyUrl } from '@/utils/genSpotifyUrl';
import putSongInfo from './putSong';
import { revalidatePath } from 'next/cache';
import { genYoutubeUrl } from '@/utils/genYTUrl';
import postNewPartySong from './submitNewPartySong';
import { IActionMSG } from '@/types';
import { genYtMusicUrl } from '@/utils/genYTMusicUrl';
import { getUPartySong } from './getUPartySong';
import putUPartySong from './putUPartySong';

interface ISubmitNewSongForm {
    formData: FormData;
    partyId: number;
    votingFinishAt: string;
}

export async function submitNewSongForm(props: ISubmitNewSongForm) {
    const { formData, partyId } = props;
    const returnMSG: IActionMSG = {
        message: 'New song added',
        title: 'Success',
        status: 200,
        type: 'success',
    };

    const canUserAddSong = await AddedSongCookie();
    // console.log(canUserAddSong)

    if (canUserAddSong > 5) {
        console.log('You can add only 3 songs per day');

        returnMSG.message = 'You can add only 3 songs per day';
        returnMSG.title = 'Error';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    if (genYoutubeUrl(formData.get('songURL') as string)) {
        returnMSG.message =
            "We're currently using only Spotify and YouTube Music. Sorry for the inconvenience.";
        returnMSG.title = 'Unsupported platform';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    const dbSong = await postSong(formData);

    console.log('$$$$$$$$$$$$$$$$$$$', dbSong);

    if (dbSong && dbSong.songId && dbSong.songStatus === 'exists') {
        // update ADDED TIMES
        // if song is added today (created_at is today)
        // update update time, and added times+1 instead of posting song
        const hasSongBeenAddedToday = await getUPartySong({
            USongId: dbSong.songId,
            partyId: partyId,
            dateOlderThan: props.votingFinishAt,
        });

        if (hasSongBeenAddedToday && hasSongBeenAddedToday.length > 0) {
            putUPartySong({
                id: hasSongBeenAddedToday[0].id,
                votesPlus: hasSongBeenAddedToday[0].votesPlus,
            });
        } else {
            // if song is not added today
            await postNewPartySong({
                songID: dbSong.songId,
                partyID: partyId,
            });
        }
    } else if (dbSong && dbSong.songId && dbSong.songStatus === 'new') {
        if (
            genSpotifyUrl(formData.get('songURL') as string) &&
            !genYoutubeUrl(formData.get('songURL') as string)
        ) {
            const accessToken = await getSpotifyToken();
            const res = await putSongInfo({
                songID: dbSong.songId,
                accessToken: accessToken,
                platform: 'spotify',
            });

            if (!res) {
                returnMSG.message = 'Cannot get song data from spotify';
                returnMSG.title = 'Error';
                returnMSG.status = 400;
                returnMSG.type = 'error';
                return returnMSG;
            }

            await postNewPartySong({
                songID: dbSong.songId,
                partyID: partyId,
            });
        }

        // ----------------- YOUTUBE MUSIC -----------------
        else if (genYtMusicUrl(formData.get('songURL') as string)) {
            console.log('to yt music');
            // const accessToken = process.env.YT_API_KEY!;
            const res = await putSongInfo({
                songID: dbSong.songId,
                accessToken: 'accessToken',
                platform: 'ytmusic',
            });

            if (!res) {
                returnMSG.message = 'Cannot get song data from yt music';
                returnMSG.title = 'Error';
                returnMSG.status = 400;
                returnMSG.type = 'error';
                return returnMSG;
            }

            await postNewPartySong({
                songID: dbSong.songId,
                partyID: partyId,
            });
        } else {
            returnMSG.message =
                'Sth went wrong. Please input correct SPOTIFY / YT MUSIC URL';
            returnMSG.title = 'Error';
            returnMSG.status = 400;
            returnMSG.type = 'error';
            return returnMSG;
        }
    } else {
        returnMSG.message = 'Sth went wrong. Unknown error';
        returnMSG.title = 'Error';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    console.log(returnMSG);
    return returnMSG;

    // revalidatePath("/")

    // setOpen(false)
}

export async function succesSubmition() {
    revalidatePath('/');
}
