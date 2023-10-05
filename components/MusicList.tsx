import React from 'react';
import SongInfoBox from './SongInfoBox';
import { USong } from '@/database.types';



const MusicList: React.FC<Promise<USong[]>> = ({ songs }) => {


  return (
    <section className='w-full'>
      
      {songs.map((song) => (
        <SongInfoBox
          key={song.id}
          title={song.title}
          thumbnail={song.thumbnail}
          duration={song.duration}
          artist={song.artist}
          votesPlus={song.votesPlus}
          votesMinus={song.votesMinus}
          id={song.id}
          url={song.url}
        />

        
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

