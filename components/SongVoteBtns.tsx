'use client'
import { useEffect, useTransition } from 'react'
import { Button } from './ui/button'
import voteSong from '@/lib/voteSong'
import { USong } from '@/database.types'
import { useToast } from './ui/use-toast'
import Link from 'next/link'
import { createPoPCookie } from '@/lib/cookies/popAdCookie'


type Props = {}

const SongVoteBtns = async ({songId}: {songId:USong["id"]}) =>
   {

    //*************** */
    // for ads
    // const isPoPCookie = await createPoPCookie();

    useEffect(() => {
        const fetchData = async () => {
            const isPoPCookie = await createPoPCookie();
            console.log(isPoPCookie);
        };
        fetchData();
    }, [])
    // ********************

    

    let [isPending, startTransition] = useTransition();

    // const [optimisticVotes, addOptimisticVotes] = useOptimistic(
    //   {votesCount, sending: false},
    //   (state, newVotesCount) => ({
    //     ...state,
    //     votesCount: newVotesCount,
    //     sending: true
    //   })
    // )
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

        <Link href={`https://ciac.me`} target='blank'>

            +
        </Link>
          
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