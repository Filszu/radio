'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { RiSettings4Fill } from 'react-icons/ri';
import { Label } from '@radix-ui/react-label';
import { Input } from './ui/input';
import putSongAdmin from '@/lib/putSongAdmin';
import { USong } from '@/types';
import { IPartySong } from '@/types';
import { PiShootingStarBold } from 'react-icons/pi';
import { postPlayList } from '@/lib/postPlayList';
import { useToast } from './ui/use-toast';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from './ui/select';

const SongAdminOptions = ({
    songId,
    song,
}: {
    songId: string;
    song: USong | IPartySong;
}) => {
    async function handleSubmit(formData: FormData) {
        console.log('submitting admin form');

        const res = await putSongAdmin({
            formData: formData,
            id: songId,
        });

        if (res) {
            toast({
                title: 'Success',
                description: JSON.stringify(res) + 'Song has been updated',
                variant: 'default',
            });
        }
    }

    const { toast } = useToast();
    async function addSongToPlaylist() {
        console.log('adding song to playlist');
        let partyId;
        if ('partyId' in song) {
            partyId = (song as IPartySong).partyId;
            console.log((song as IPartySong).partyId);
        } else {
            toast({
                title: 'Error',
                description: 'partyId not found',
                variant: 'destructive',
            });
            return;
        }

        let usongid;
        if ('USongId' in song) {
            usongid = (song as IPartySong).USongId;
        } else {
            toast({
                title: 'Error',
                description: 'USongId not found',
                variant: 'destructive',
            });
            return;
        }

        const res = await postPlayList({
            hostId: partyId,
            songId: usongid,
        });

        if (res) {
            toast({
                title: 'Success',
                description: 'Song has been added to playlist',
                variant: 'success',
            });
        } else {
            toast({
                title: 'Error',
                description:
                    'An error occurred while adding the song to the playlist.',
                variant: 'destructive',
            });
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mt-2 w-full flex justify-center flex-col">
            {/* {JSON.stringify(song)}
            
            song.id <br />{song.id}<br />
            u song id <br />{song.USongId} */}
            <div className="flex w-full">
                <Button
                    className="flex-1"
                    onClick={() => {
                        setIsOpen(!isOpen);
                    }}
                >
                    <RiSettings4Fill size={20} />
                    Edit
                </Button>
                <form action={addSongToPlaylist}>
                    <Button type="submit" className="w-14 bg-yellow-400">
                        <PiShootingStarBold size={20} />
                    </Button>
                </form>
            </div>

            {isOpen && (
                <div className="border rounded-lg p-4 shadow-md w-300 hover:border-primary group hover:ease-out duration-300 mt-2">
                    <h2>edit song with id {songId}</h2>
                    <br />
                    <form action={handleSubmit}>
                        <Label htmlFor="votesPlus">Votes Plus</Label>
                        <Input
                            name="votesPlus"
                            id="votesPlus"
                            type="number"
                            placeholder="votesPlus"
                            defaultValue={song.votesPlus}
                        />

                        <Label htmlFor="votesMinus">Votes minus</Label>
                        <Input
                            name="votesMinus"
                            id="votesMinus"
                            type="number"
                            placeholder="votesMinus"
                            defaultValue={song.votesMinus}
                        />

                        <Label htmlFor="dailyVotesPlus">Daily votes Plus</Label>
                        <Input
                            name="dailyVotesPlus"
                            id="dailyVotesPlus"
                            type="number"
                            placeholder="dailyVotesPlus"
                            defaultValue={song.dailyVotesPlus}
                        />

                        <Label htmlFor="dailyVotesMinus">
                            Daily votes minus
                        </Label>
                        <Input
                            name="dailyVotesMinus"
                            id="dailyVotesMinus"
                            type="number"
                            placeholder="dailyVotesMinus"
                            defaultValue={song.dailyVotesMinus}
                        />

                        <Label htmlFor="status">Status</Label>
                        <Select
                            name="status"
                            defaultValue={song.status ?? 'active'}
                            onValueChange={(value) => console.log(value)} // Replace with your desired handler
                        >
                            <SelectTrigger id="status">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="banned">Banned</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button type="submit" className="mt-4">
                            Submit
                        </Button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SongAdminOptions;
