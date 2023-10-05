// 'use client';
import React from 'react'
import { USong } from '@/database.types'
import voteSong from '@/lib/voteSong'
import { Button } from './ui/button';
import { revalidatePath } from 'next/cache';
import {BiSolidUpvote} from 'react-icons/bi'
import VoteBtn from './VoteBtn';


const SongInfoBox =(song: USong) => {
  
  return (
    <div className="border rounded-lg p-4 shadow-md w-full hover:border-primary group hover:ease-out duration-300">
      <div className="flex  items-center space-x-4 justify-between flex-wrap">
        {/* <img src={props.thumbnail??""} alt="Song Thumbnail" className="w-16 h-16 rounded-lg" /> */}
        <div className=''>
          <h2 className="text-lg font-semibold duration-300 group-hover:text-primary">{song.title}</h2>
          <p className="text-gray-600 md:flex md:justify-center">{song.duration}</p>
        </div>
        <div>
          <h2>{song.url}</h2>
        </div>
        <div className='flex items-center'>
            <div className='flex items-center' >
              <BiSolidUpvote/> 
              <span className='mx-1'></span>
              {(song.dailyVotesPlus-song.dailyVotesMinus)}
              <span className='mx-1'></span>
              
              </div>
            <Button className='w-10 mx-1' 
            // onClick={()=>{
                  // voteSong(song.id, 'upvote')
            // }}
            onClick={async()=>{
              'use server'
              alert('plus')
              voteSong(song.id, song, 'upvote' )
              revalidatePath('/')
            }
            }

            >+</Button>
            <Button className="w-10 mx-1" variant="destructive" 
            onClick={async()=>{
                'use server'
                alert('minus')
                
                voteSong(song.id,song, 'downvote')
                revalidatePath('/')
            }}
            >
              -</Button>

            {/* <VoteBtn clickEvent={()=>alert("x")}>
                xx
            </VoteBtn> */}
        </div>
      </div>
    </div>
  )
}

export default SongInfoBox