'use client'
import { useTransition } from 'react'
import { Button } from './ui/button'
import voteSong from '@/lib/voteSong'
import { USong } from '@/database.types'
import { useToast } from './ui/use-toast'
type Props = {}

const SongVoteBtns = ({songId}: {songId:USong["id"]}) => {
    let [isPending, startTransition] = useTransition();
    const { toast } = useToast();
  return (
    <>
        <Button className='w-10 mx-1' 
            onClick={
                
                ()=>
                startTransition(async ()=>{
                await voteSong(songId, 'upvote' );
                toast({
                    title: "Twój głos został oddany!",
                    description: "+1",
                    variant: "success",
                  })
                })
                

                
            }

        >
            +
        </Button>
        <Button className="w-10 mx-1" variant="destructive" 
            onClick={
            ()=>startTransition(async ()=>{
            await voteSong(songId, 'downvote' );

            toast({
                title: "Twój głos został oddany!",
                description: "-1",
                variant: "destructive",
              })
                       
            })
        }
                
        >
            -
        </Button>
    </>
    
  )
}

export default SongVoteBtns