import { StaticImageData } from 'next/image';
import { Database, UPartySong, USong } from './database.types';

export interface ISong {
    title: string;
    artist: string;
    duration: number;
    votesPlus?: number;
    votesMinus?: number;
    id: number;
    url: string;
    thumbnail?: string;
}
export interface IActionMSG {
    title: string;
    message: string;
    type: 'info' | 'error' | 'success';
    status: number;
}
// *** *** **

export interface IUserActions {
    postedSongs: number;
    votedSongs: Array<string>;
}

// export interface IPartySong extends UPartySong {
//     uSongInfo: USong;
// }

export interface IPartySong extends UPartySong {
    addedTimes: number | null;
    artist: string | null;
    dailyVotesMinus?: number;
    dailyVotesPlus?: number;
    duration: string | null;
    explicit: boolean | null;
    thumbnail: string | null;
    title: string | null;
    url: string;
    
  
}

export interface GetSongsParams {
    limit?: number;
    asc?: boolean;
    order?: string;
    status?: string | Array<string>;
    staringIndex?: number;
    dateOlderThan?: string;
}


export interface IAdUnit{
    image: string | StaticImageData;
    url: string;
    description?: string;
    name: string;
}



export interface IpartyMessageRequest {
    partyId: number | string;
    limit?: number;
    startingIndex?: number;
    asc?: boolean;
    order?: 'created_at' | string;
}

export type PartyMessage = Database["public"]["Tables"]["messages"]["Row"]
