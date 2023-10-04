import Image from 'next/image'
import Logo from '../public/imgs/logo-elektron.jpg'
import { VotingList } from '@/components'
import { Button } from '@/components/ui/button'
import { Music } from 'lucide-react'
import MusicList from '@/components/MusicList'

export default function Home() {
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
      
          
        
        <MusicList />


       


      
    </main>
  )
}
