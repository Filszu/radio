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
import Image from 'next/image';
import SongAdminOptions from './SongAdminOptions';
import { IPartySong } from '@/types';



const SongInfoBox =({song,isAdmin}: {song:USong | IPartySong, isAdmin:boolean}) => {

  
  function substrWord(str: string, maxLen: number, startingPos: number = 0){
    return str.length > maxLen ? str.substring(startingPos, maxLen-3) + '...' : str
  }
  
  return (
    <div className="border rounded-lg p-4 shadow-md w-full hover:border-primary group hover:ease-out duration-300 border-yellow-400">
      <div className="flex  items-center space-x-4 justify-center flex-wrap md:justify-between">
      {song.thumbnail&&<Image src={song.thumbnail} alt="Song Thumbnail" className="w-16 h-16 rounded-lg" width={150} height={150}/>}
        <div className=''>
          <Link href={song.url} target='blank'>
            <h2 className="text-lg font-semibold duration-300 group-hover:text-primary flex content-center items-center">{
            // substrWord(song.title??song.url,80)
            song.title?substrWord(song.title,80):substrWord(song.url,40,8)
            
            } 
            
            
            {song.explicit&&<BsExplicitFill className={"text-red-500 ml-2"}/>}
            {song.status&&song.status=="banned"&&<span className='text-red-500 ml-2'>Banned</span>}
            </h2>
            
          </Link>
          {song.artist&&<h3 className="text-gray-600 md:flex md:justify-center ">{song.artist}</h3>}
          <p className="text-gray-600 md:flex md:justify-center text-sm">{song.duration}</p>
        </div>
       
        <div className='flex items-center'>
            <div className='flex items-center' >
              <BiSolidUpvote/> 
              
              <span className='mx-1'></span>
              {(song.votesPlus-song.votesMinus)}
              <span className='mx-1'></span>
              
              </div>
              <SongVoteBtns songId={song.id}/>
              
           
        </div>
      </div>
      {isAdmin&&<SongAdminOptions songId={song.id} song={song}/>}
    </div>
  )
}





export default SongInfoBox