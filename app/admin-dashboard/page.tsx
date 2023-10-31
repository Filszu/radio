import React from 'react'

type Props = {}
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { getAdminCookie } from '@/lib/cookies/adminCookies'
import MusicList from '@/components/MusicList'
import { Music } from 'lucide-react'
import { USong } from '@/database.types'
import { getSongs, getSongsCustom } from '@/lib/getSongs'
import { redirect } from 'next/navigation'
const Page = async(props: Props) => {



    const isLogged = await getAdminCookie()
    if(!isLogged) redirect('/admin-login')



    const songs:USong[] = await getSongsCustom({limit: 100, order: 'created_at',});

  return (
     
    <section className='w-full'>
    <h1 className='text-center'>Admin Dashboard</h1>
    {/* <Music size={64} /> */}
    <MusicList songs={songs} isAdmin={true}/>
    </section>
       
  )
}

export default Page