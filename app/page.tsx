import Image from 'next/image'
import Logo from '../public/imgs/logo-elektron.jpg'
import { VotingList } from '@/components'
import { Button } from '@/components/ui/button'
import {  Music } from 'lucide-react'
import MusicList from '@/components/MusicList'
import NewSongDialog from '@/components/NewSongDialog'
import { getSongs } from '@/lib/getSongs'
import { USong } from '@/database.types'
import { revalidatePath } from 'next/cache'

import Link from 'next/link'
import { headers } from 'next/headers'
import getSongInfoFromSpotify from '@/lib/getSongInfo'

// export const dynamic = "force-dynamic"

export const revalidate = 30

export default async function Home() {
  
  // const songs:Promise<USong[]> = getSongs();

  // console.log(songs)
  // if(songs){
  //   console.log(songs)
  // }

  const songs:USong[] = await getSongs();

  if(songs){
    // console.log(songs)
  }else return Error('songs is not defined')


  

  //maybe i can use this to get ip address
  // https://api.ipify.org?format=json

  

  

 


  return (
    
    <>
        {/* <Link href="/add-new-song">xxxxxxxxx</Link> */}
        
        
        <NewSongDialog></NewSongDialog>

        
        {/* spacer */}
        <div className='h-10'></div>

        <MusicList songs={songs}/>

        
      </>

       


      
    
  )
}
