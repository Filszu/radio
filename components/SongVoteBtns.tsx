'use client';
import { useTransition } from 'react';
import { Button } from './ui/button';
import voteSong from '@/lib/voteSong';
import { USong } from '@/types';
import { useToast } from './ui/use-toast';
type Props = {};
const SongVoteBtns = ({ songId }: { songId: USong['id'] }) => {
    let [isPending, startTransition] = useTransition();
    // const [optimisticVotes, addOptimisticVotes] = useOptimistic(
    //   {votesCount, sending: false},
    //   (state, newVotesCount) => ({
    //     ...state,
    //     votesCount: newVotesCount,
    //     sending: true
    //   })
    // )
    const { toast } = useToast();
    return (
        <>
            <Button
                className="w-10 mx-1"
                onClick={() =>
                    startTransition(async () => {
                        const res = await voteSong(songId, 'upvote');
                        if (res === 'error') {
                            toast({
                                title: 'You can\'t vote for this song!',
                                description: 'You have already voted for this song!',
                                variant: 'destructive',
                            });
                        } else {
                            toast({
                                title: 'Your vote has been delivered!',
                                description: '+1',
                                variant: 'success',
                            });
                        }
                    })
                }
            >
                +
            </Button>
            <Button
                className="w-10 mx-1"
                variant="destructive"
                onClick={() =>
                    startTransition(async () => {
                        const res = await voteSong(songId, 'downvote');

                        if (res === 'error') {
                            toast({
                                title: 'You can\'t vote for this song!',
                                description: 'You have already voted for this song!',
                                variant: 'destructive',
                            });
                        } else {
                            toast({
                                title: 'Your vote has been delivered!',
                                description: '-1',
                                variant: 'success',
                            });
                        }
                    })
                }
            >
                -
            </Button>
        </>
    );
};
export default SongVoteBtns;
