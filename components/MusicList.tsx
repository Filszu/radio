import React from 'react'
import SongInfoBox from './SongInfoBox'
import { Database, USong } from '@/database.types'




const MusicList = (props: USong[]) => {
  return (
    <section className='w-full'>
        <SongInfoBox
            title="My Awesome Song"
            thumbnail="https://example.com/song-thumbnail.jpg"
            duration={3.45}
            artist="The Greatest Artist"
            votesPlus={123}
            votesMinus={12}
            id={1}
            url="https://example.com/song.mp3"

            

            />

    </section>
  )
}

export default MusicList