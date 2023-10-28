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
                const res = await voteSong(songId, 'upvote' );

                if(res==="error"){
                    toast({
                        title: "Nie możesz głosować na ten utwór!",
                        description: "Zaglosowałeś już na ten utwór!",
                        variant: "destructive",
                      })
                }else{
                  toast({
                    title: "Twój głos został oddany!",
                    description: "+1",
                    variant: "success",
                  })
                }
                
                
                })
                

                
            }

        >
            +
        </Button>
        <Button className="w-10 mx-1" variant="destructive" 
            onClick={
            ()=>startTransition(async ()=>{
            const res = await voteSong(songId, 'downvote' );

            if(res==="error"){
              toast({
                  title: "Nie możesz głosować na ten utwór!",
                  description: "Zaglosowałeś już na ten utwór!",
                  variant: "destructive",
                })
              }
            else{
              toast({
                title: "Twój głos został oddany!",
                description: "-1",
                variant: "success",
              })
            }
            
                       
            })
        }
                
        >
            -
        </Button>
    </>
    
  )
}

export default SongVoteBtns