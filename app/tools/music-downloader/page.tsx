import React from 'react'
// import { Downloader } from 'ytdl-mp3';
import ytdl from '@distube/ytdl-core';


const page = async() => {
    const info = await ytdl.getInfo("https://music.youtube.com/watch?v=WpYeekQkAdc&si=2fxqYbfEWae3Wlgr");

    const downloadLink = await ytdl.downloadFromInfo(info, { filter: 'audioonly' });

  

    console.log(info)
    console.log("Download Link")
    console.log(downloadLink)

    console.log("---------Download")
    const download = await ytdl('https://www.youtube.com/watch?v=WpYeekQkAdc')
    console.log(download)

  return (
    <div>
        {JSON.stringify(downloadLink)}

        <br />
        {/* {JSON.stringify(info)} */}

    </div>
  )
}

export default page