import React from 'react'
import { Button } from './ui/button'
import { USong } from '@/database.types'



const SongInfoBox =(song: USong) => {
  
  return (
    <div className="border rounded-lg p-4 shadow-md w-full hover:border-primary group hover:ease-out duration-300">
      <div className="flex  items-center space-x-4 justify-between flex-wrap">
        {/* <img src={props.thumbnail??""} alt="Song Thumbnail" className="w-16 h-16 rounded-lg" /> */}
        <div className=''>
          <h2 className="text-lg font-semibold duration-300 group-hover:text-primary">{song.title}</h2>
          <p className="text-gray-600 md:flex md:justify-center">{song.duration}</p>
        </div>
        <div className='flex'>
            <Button className='w-10 mx-1'>+</Button>
            <Button className="w-10 mx-1" variant="destructive">-</Button>
        </div>
      </div>
    </div>
  )
}

export default SongInfoBox