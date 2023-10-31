import React from 'react'

const SongInfoBoxPlaceholder = () => {
  return (
    <div className="border rounded-lg p-4 shadow-md w-full hover:border-primary group hover:ease-out duration-300 animate-pulse">
      <div className="flex items-center space-x-4 justify-center flex-wrap md:justify-between">
        <div className="w-16 h-16 rounded-lg bg-gray-300"></div> {/* Placeholder for thumbnail */}
        <div className=''>
          <div className="text-lg font-semibold duration-300 group-hover:text-primary flex content-center items-center">
            <div className="w-40 h-6 bg-gray-300"></div> {/* Placeholder for song title */}
          </div>
          <div className="text-gray-600 rounded-md md:flex md:justify-center">
            <div className="w-20 h-4 bg-gray-300"></div> {/* Placeholder for song duration */}
          </div>
        </div>
        <div className='flex items-center'>
          <div className='flex items-center'>
            <div className="w-6 h-6 bg-gray-300"></div> {/* Placeholder for upvote icon */}
            <div className='mx-1'></div>
            <div className="w-6 h-6 bg-gray-300"></div> {/* Placeholder for vote count */}
            <div className='mx-1'></div>
          </div>
          <div className="w-10 h-8 bg-gray-300"></div> {/* Placeholder for upvote button */}
          <div className="w-10 h-8 bg-gray-300"></div> {/* Placeholder for downvote button */}
        </div>
      </div>
    </div>
  )
}

export default SongInfoBoxPlaceholder