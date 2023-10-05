'use server'

import supabase from "@/config/supaBaseClient"
import { USong } from "@/database.types";

async function voteSong(song: USong, voteType: 'upvote' | 'downvote'): Promise<USong> {
    const { data, error } = await supabase
        .from('uSongs')
        .update({
            votesMinus: (song.votesMinus ?? 0) + (voteType === 'downvote' ? 1 : 0),
            votesPlus: (song.votesPlus ?? 0) +  (voteType === 'upvote' ? 1 : 0),
            dailyVotesMinus : (song.dailyVotesMinus ?? 0) + (voteType === 'downvote' ? 1 : 0),
            dailyVotesPlus : (song.dailyVotesPlus ?? 0) + (voteType === 'upvote' ? 1 : 0),
            
        })
        .eq('id', song.id)
        .single();

    if (error) {
        throw error;
    }

    return data;
}

export default voteSong;

