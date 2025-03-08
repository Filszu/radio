import React from 'react';
import { USong } from '@/types';
import { Button } from './ui/button';
import { BiSolidUpvote } from 'react-icons/bi';
import { BsExplicitFill } from 'react-icons/bs';
import VoteBtn from './VoteBtn';
import SongVoteBtns from './SongVoteBtns';
import Link from 'next/link';
import Image from 'next/image';
import SongAdminOptions from './SongAdminOptions';
import { IPartySong } from '@/types';
import { cn } from '@/lib/utils';
import { FaSpotify } from 'react-icons/fa';
import { SiYoutubemusic } from 'react-icons/si';

const SongInfoBox = ({
    song,
    isAdmin,
    styles,
}: {
    song: USong | IPartySong;
    isAdmin: boolean;
    styles?: string;
}) => {
    function substrWord(str: string, maxLen: number, startingPos: number = 0) {
        return str.length > maxLen
            ? str.substring(startingPos, maxLen - 3) + '...'
            : str;
    }

    return (
        <div
            className={cn(
                'border rounded-lg p-4 shadow-md w-full hover:border-primary group transition-transform duration-300',
                styles ?? '',
            )}
        >
            <div className="flex flex-col sm:flex-row items-center  gap-4 sm:justify-between">
                {song.thumbnail && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                            src={song.thumbnail}
                            alt={`${song.title} - ${song.artist}`}
                            className="rounded-lg object-cover"
                            width={150}
                            height={150}
                        />
                        <div className="absolute bottom-1 right-1 p-1">
                            {song.url.includes('spotify') ? (
                                <FaSpotify className="text-green-500" />
                            ) : (
                                <SiYoutubemusic className="text-red-500" />
                            )}
                        </div>
                    </div>
                )}
                <div className="flex-1 text-center">
                    <Link href={song.url} target="_blank" className="block">
                        <h2 className="text-lg font-semibold group-hover:text-primary flex items-center justify-center gap-2">
                            {song.title
                                ? substrWord(song.title, 80)
                                : substrWord(song.url, 40, 8)}
                            {song.explicit && (
                                <BsExplicitFill className="text-red-500" />
                            )}
                            {song.status === 'banned' && (
                                <span className="text-red-500">Banned</span>
                            )}
                        </h2>
                    </Link>
                    {song.artist && (
                        <h3 className="text-gray-600 text-sm">{song.artist}</h3>
                    )}
                    <p className="text-gray-600 text-xs">{song.duration}</p>
                </div>
                <div className="flex items-center gap-1">
                    <div className="flex items-center md:flex-row flex-col-reverse">
                        <div className="text-sm md:text-base md:mx-1 flex justify-center items-center">
                            ({song.votesPlus + song.votesMinus})
                        </div>
                        <div className="flex items-center">
                            <BiSolidUpvote />

                            <span className="md:mx-1"></span>
                            {song.votesPlus - song.votesMinus}
                            <span className="mx-1"></span>
                        </div>
                    </div>
                    <SongVoteBtns songId={song.id} />
                </div>
            </div>
            {isAdmin && <SongAdminOptions songId={song.id} song={song} />}
        </div>
    );
};

export default SongInfoBox;
