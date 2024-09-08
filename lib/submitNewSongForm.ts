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

interface ISubmitNewSongForm {
    formData: FormData;
    partyId: number;
}

export async function submitNewSongForm(props: ISubmitNewSongForm) {

    const { formData, partyId } = props;
    const returnMSG: IActionMSG = {
        message: 'Dodano nowy utwór',
        title: 'Success',
        status: 200,
        type: 'success',
    };

    const canUserAddSong = await AddedSongCookie();
    // console.log(canUserAddSong)

    if (canUserAddSong > 3) {
        console.log('You can add only 3 songs per day');

        returnMSG.message = 'Możesz dodać tylko 3 utwory dziennie';
        returnMSG.title = 'Error';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    if (genYoutubeUrl(formData.get('songURL') as string)) {
        returnMSG.message =
            'Obenie korzystamy tylko z Spotify. Przepraszamy za utrudnienia.';
        returnMSG.title = 'Co nie masz spotify, biedaku?';
        returnMSG.status = 400;
        returnMSG.type = 'error';
        return returnMSG;
    }

    const dbSong = await postSong(formData);

    console.log('$$$$$$$$$$$$$$$$$$$', dbSong);

    if (dbSong && dbSong.songId && dbSong.songStatus === 'exists') {
        // update ADDED TIMES
        await postNewPartySong({
            songID: dbSong.songId,
            partyID: partyId,
        });
    } else if (dbSong && dbSong.songId && dbSong.songStatus === 'new') {
        if (genSpotifyUrl(formData.get('songURL') as string)) {
            const accessToken = await getSpotifyToken();
            const res = await putSongInfo({
                songID: dbSong.songId,
                accessToken: accessToken,
            });
            await postNewPartySong({
              songID: dbSong.songId,
              partyID: partyId,
          });

            if (!res) {
                returnMSG.message = 'Cannot get song data from spotify';
                returnMSG.title = 'Error';
                returnMSG.status = 400;
                returnMSG.type = 'error';
                return returnMSG;
            }
        } else {
        }
    } else {
        returnMSG.message = 'Sth went wrong. Please input correct SPOTIFY URL';
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
