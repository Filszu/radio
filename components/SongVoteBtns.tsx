'use client'
import { useTransition } from 'react'
import { Button } from './ui/button'
import voteSong from '@/lib/voteSong'
import { USong } from '@/database.types'
type Props = {}

const SongVoteBtns = ({songId}: {songId:USong["id"]}) => {
    let [isPending, startTransition] = useTransition();
  return (
    <>
        <Button className='w-10 mx-1' 
            onClick={
                ()=>startTransition(()=>
                voteSong(songId, 'upvote' ))

                    
            }

        >
            +
        </Button>
        <Button className="w-10 mx-1" variant="destructive" 
                
        >
            -
        </Button>
    </>
    
  )
}

export default SongVoteBtns