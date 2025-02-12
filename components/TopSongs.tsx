import { getPartySongs } from '@/lib/getSongs';
import { IPartySong } from '@/types';
import React from 'react';
import MusicList from './MusicList';
import SongInfoBox from './SongInfoBox';

type Props = {
    partyId: number
    votingFinishAt?: string | null;
  }
export const revalidate = 30;
const TopSongsList = async (props: Props) => {

    const todayDate = new Date().toISOString().split('T')[0];

    const olderThan = props.votingFinishAt??todayDate;

    console.log("older than",olderThan, "\ntoday",todayDate);
    
    const songs: IPartySong[] = await getPartySongs({
        limit: 3,
        order: 'votesPlus',
        status: 'active',
        dateOlderThan: olderThan,
        partyId: props.partyId,

    });


    console.log("songs",songs);

    if(!songs || songs.length<3) return <></>
    return (
        
        <section className="w-full">
            <div className="uppercase  mt-8 mb-8 text-center">
                <h2 className="text-2xl">Top Songs</h2>
                <h3>Most liked songs today</h3>
            </div>

            <section className="w-full flex flex-col gap-2 ">
                <SongInfoBox
                    key={songs[0].id}
                    // songId={song.id}
                    song={songs[0]}
                    isAdmin={false}
                    styles="border-amber-400  border-2 "
                />
                {/* 'border-amber-400' */}
                <SongInfoBox
                    key={songs[1].id}
                    // songId={song.id}
                    song={songs[1]}
                    isAdmin={false}
                    styles="border-slate-400  border-2 "
                />
                <SongInfoBox
                    key={songs[2].id}
                    // songId={song.id}
                    song={songs[2]}
                    isAdmin={false}
                    styles="border-amber-700 border-2 "
                />
            </section>
        </section>
    );
};

export default TopSongsList;
