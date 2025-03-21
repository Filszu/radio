'use server';

import supabase from '@/config/supaBaseClient';
import { USong } from '@/types';
import { revalidatePath } from 'next/cache';
import { createVotedSongCookie } from './cookies/votingCookies';
import { createUserActions, markSongAsVoted } from './userActions';

async function getVotes(songID: string) {
    const { data, error } = await supabase
        .from('uPartySongs')
        .select('votesPlus,votesMinus')
        .eq('id', songID)
        .limit(1);

    if (error) {
        throw error;
    }

    return data[0];
}

async function voteSong(
    songID: string,
    voteType: 'upvote' | 'downvote',
    limitedVotes: boolean,
) {
    console.log('voteSong', songID, voteType);
    // const { data, error } = await supabase
    //     .from('uSongs')
    //     // .update({
    //     //     votesMinus: (songData.votesMinus ?? 0) + (voteType === 'downvote' ? 1 : 0),
    //     //     votesPlus: (songData.votesPlus ?? 0) +  (voteType === 'upvote' ? 1 : 0),
    //     //     dailyVotesMinus : (songData.dailyVotesMinus ?? 0) + (voteType === 'downvote' ? 1 : 0),
    //     //     dailyVotesPlus : (songData.dailyVotesPlus ?? 0) + (voteType === 'upvote' ? 1 : 0),
    //     .rpc('votesPlus')

    // select current values of votesPlus and votesMinus dailyVotesPlus and dailyVotesMinus

    const isSongCookie = await createVotedSongCookie({ songID });
    // const isVotingAction
    const isSongInUserActionsDB = await markSongAsVoted(songID);
    // console.log("isSongCookie",isSongCookie);

    // ALOWS user to vote multiple times
    if (limitedVotes) {
        console.log('limitedVotes', limitedVotes);
       

        if (isSongCookie) return 'error';

        if (isSongInUserActionsDB) return 'error';
    }

    const votes = await getVotes(songID);

    if (!votes) return null;

    //new votes value

    if (voteType === 'upvote') {
        votes.votesPlus += 1;
        // votes.dailyVotesPlus += 1
    } else {
        votes.votesMinus += 1;
        // votes.dailyVotesMinus += 1
    }

    const { data, error } = await supabase
        .from('uPartySongs')
        .update({
            votesMinus: votes.votesMinus,
            votesPlus: votes.votesPlus,
            // dailyVotesMinus : votes.dailyVotesMinus,
            // dailyVotesPlus : votes.dailyVotesPlus,
        })
        .eq('id', songID);

    revalidatePath('/');

    // return data;
}

export default voteSong;
