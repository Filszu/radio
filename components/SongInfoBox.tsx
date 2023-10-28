// 'use client';
import React from 'react'
import { USong } from '@/database.types'
import voteSong from '@/lib/voteSong'
import { Button } from './ui/button';
import { revalidatePath } from 'next/cache';
import {BiSolidUpvote} from 'react-icons/bi'
import { BsExplicitFill } from 'react-icons/bs';
import VoteBtn from './VoteBtn';
import SongVoteBtns from './SongVoteBtns';
import Link from 'next/link';



const SongInfoBox =(song: USong) => {

  
  function substrWord(str: string, maxLen: number, startingPos: number = 0){
    return str.length > maxLen ? str.substring(startingPos, maxLen-3) + '...' : str
  }
  
  return (
    <div className="border rounded-lg p-4 shadow-md w-full hover:border-primary group hover:ease-out duration-300">
      <div className="flex  items-center space-x-4 justify-between flex-wrap">
        <img src={song.thumbnail??""} alt="Song Thumbnail" className="w-16 h-16 rounded-lg" />
        <div className=''>
          <Link href={song.url} target='blank'>
            <h2 className="text-lg font-semibold duration-300 group-hover:text-primary flex content-center items-center">{substrWord(song.title??song.url,80)} 
            
            <BsExplicitFill className={song.explicit?"text-red-500 ml-2":""}/>
            </h2>
          </Link>
          <p className="text-gray-600 md:flex md:justify-center">{song.duration}</p>
        </div>
        <div>
          <h2>
            <Link href={song.url} target='blank' className='text-white no-underline'>
              {/* {song.title?song.title:song.url.substring(13, 50) + '...'} */}
              {/* {song.title?"":substrWord(song.url, 50)} */}

            </Link>
            {
          //  substring
           
          
          }</h2>
        </div>
        <div className='flex items-center'>
            <div className='flex items-center' >
              <BiSolidUpvote/> 
              
              <span className='mx-1'></span>
              {(song.dailyVotesPlus-song.dailyVotesMinus)}
              <span className='mx-1'></span>
              
              </div>
              <SongVoteBtns songId={song.id}/>
            {/* <Button className='w-10 mx-1' 
            // onClick={()=>{
                  // voteSong(song.id, 'upvote')
            // }}
            // onClick={async()=>{
            //   'use server'
            //   // alert('plus')
            //   voteSong(song.id, song, 'upvote' )
            //   // revalidatePath('/')
            // }
            // }

            formAction={async()=>{
              'use server'
              voteSong(song.id, song, 'upvote' )
            }
            }

            >+</Button>
            <Button className="w-10 mx-1" variant="destructive" 
            onClick={async()=>{
                'use server'
                alert('minus')
                
                voteSong(song.id,song, 'downvote')
                // revalidatePath('/')
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