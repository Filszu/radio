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

// export const dynamic = "force-dynamic"



export default async function Home() {
  
  // const songs:Promise<USong[]> = getSongs();

  // console.log(songs)
  // if(songs){
  //   console.log(songs)
  // }

  const songs:USong[] = await getSongs();

  if(songs){
    console.log(songs)
  }else return Error('songs is not defined')


  //maybe i can use this to get ip address
  // https://api.ipify.org?format=json

  const ip = headers().get("x-forwarded-for");

  console.log("-------------------------------------------------------------------------")
  console.log(ip)
  

  

 


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-14">
      <header className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm md:flex md:justify-between">
      {/* <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex md:justify-between">
      </div> */}
        <div className='flex items-center justify-center w-full md:flex md:w-auto'>
          <Image src={Logo} width={50} height={50} alt="logo elktrona" className='m-5'/>
          <h1>Radio Elektron</h1>
        </div>
        <div className='flex items-center justify-center'><h2 className=''>Głosuj na ulubione utwory</h2></div>
        
      
      </header>
      
        <div className='h-10'></div>  
        {/* <Link href="/add-new-song">xxxxxxxxx</Link> */}
        
        
        <NewSongDialog></NewSongDialog>

        
        {/* spacer */}
        <div className='h-10'></div>

        <MusicList songs={songs}/>

        


       


      
    </main>
  )
}
