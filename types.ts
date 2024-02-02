import { UPartySong, USong } from './database.types';

interface ISong {
    title: string;
    artist: string;
    duration: number;
    votesPlus?: number;
    votesMinus?: number;
    id: number;
    url: string;
    thumbnail?: string;
}
interface IActionMSG {
    title: string;
    message: string;
    type: 'info' | 'error' | 'success';
    status: number;
}
// *** *** **

interface IUserActions {
    postedSongs: number;
    votedSongs: Array<string>;
}

// export interface IPartySong extends UPartySong {
//     uSongInfo: USong;
// }


export interface IPartySong extends UPartySong {
    uSongs:{
        addedTimes: number | null
          artist: string | null
          created_at?: string
          dailyVotesMinus?: number
          dailyVotesPlus?: number
          duration: string | null
          explicit: boolean | null
          id?: string
          status?: string | null
          thumbnail: string | null
          title: string | null
          updatedAt?: string | null
          url: string
          votesMinus?: number
          votesPlus?: number
    }
}