'use server'

import supabase from "@/config/supaBaseClient"
import { USong } from "@/database.types";

async function voteSong(songID:string, songData: USong,voteType: 'upvote' | 'downvote'): Promise<USong> {

    console.log("voteSong",songID, voteType)
    const { data, error } = await supabase
        .from('uSongs')
        .update({
            votesMinus: (songData.votesMinus ?? 0) + (voteType === 'downvote' ? 1 : 0),
            votesPlus: (songData.votesPlus ?? 0) +  (voteType === 'upvote' ? 1 : 0),
            dailyVotesMinus : (songData.dailyVotesMinus ?? 0) + (voteType === 'downvote' ? 1 : 0),
            dailyVotesPlus : (songData.dailyVotesPlus ?? 0) + (voteType === 'upvote' ? 1 : 0),
            
        })
        .eq('id', songID)
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export default voteSong;

