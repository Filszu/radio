import { getPartySongs } from '@/lib/getSongs';
import { IPartySong } from '@/types';
import React from 'react'
import MusicList from './MusicList';

type Props = {}
export const revalidate = 30;
const TopSongsList = async(props: Props) => {

    const songs: IPartySong[] = await getPartySongs({
        limit: 10,
        order: 'votesPlus',
        status: 'active',
    });
  return (
    
    <section className='w-full'>
        <h2 className='uppercase text-2xl mt-8 mb-8 text-center'>Top Songs</h2>
        <MusicList songs={songs} isAdmin={false} />
    </section>
  )
}

export default TopSongsList