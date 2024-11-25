import React from 'react';
import SongInfoBox from './SongInfoBox';
import { USong } from '@/database.types';
import { IPartySong } from '@/types';
import AdBanner from './ads/google/AdBanner';

const MusicList = ({
    songs,
    isAdmin,
   
}: {
    songs: USong[] | IPartySong[];
    isAdmin: boolean;
    
}) => {
    return (
        <section className="w-full flex flex-col gap-2 ">
            {songs.map((song, index) => (
                <>
                    <SongInfoBox
                        key={song.id}
                        // songId={song.id}
                        song={song}
                        isAdmin={isAdmin}
                        
                    />
                    {(index + 1) % 4 === 0 && (
                        <section className="w-full flex justify-center items-center flex-col h-auto overflow-clip">
                            {/* <p className="text-sm text-center"></p> */}

                            {/* <div className="w-12 bg-slate-300 h-32"></div> */}
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
