import React from 'react';
import SongInfoBox from './SongInfoBox';
import { USong } from '@/types';
import { IPartySong } from '@/types';
import AdBanner from './ads/google/AdBanner';

const MusicList = ({
    songs,
    isAdmin,
    isSandbox,
}: {
    songs: USong[] | IPartySong[];
    isAdmin: boolean;
    isSandbox?: boolean;
}) => {
    const songsAdsRatio = Math.floor(Math.random() * (6 - 4 + 1)) + 4; //radnom from 4 to 6 songs per ad

    return (
        <section className="w-full flex flex-col gap-2 ">
            {songs.map((song, index) => (
                <>
                    <SongInfoBox
                        key={song.id}
                        // songId={song.id}
                        song={song}
                        isAdmin={isAdmin}
                        isSandbox={isSandbox ?? false}
                    />
                    {(index + 1) % songsAdsRatio === 0 && (
                        <section className="w-full flex justify-center items-center flex-col h-auto overflow-clip">
                            {/* <p className="text-sm text-center"></p> */}
                            {/* <div className="w-12 bg-slate-300 h-32"></div> */}
                            {/* AD */}
                            <AdBanner
                                dataAdFormat="auto"
                                dataFullWidthResponsive={true}
                                dataAdSlot="6454429063"
                            />
                        </section>
                    )}
                </>
            ))}

            {/* <SongInfoBox
            title="My Awesome Song"
            thumbnail="https://example.com/song-thumbnail.jpg"
            duration={3.45}
            artist="The Greatest Artist"
            votesPlus={123}
            votesMinus={12}
            id={78452}
            url="https://example.com/song.mp3"

            

            /> */}
        </section>
    );
};

export default MusicList;
