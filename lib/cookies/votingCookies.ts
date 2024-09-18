'use server'
import { cookies } from 'next/headers'
import { popAdCookie } from './popAdCookie'


// async function votedSongCookie(){
//     const cookieStore = cookies()

//     const cookiesList = cookies()
//   const hasCookie = cookiesList.has('theme')
    
// }


export async function createVotedSongCookie({songID}:{songID:string}){

    const cookiesList = cookies()



    // console.log("cookiesList",cookiesList)

  

    const songCookieName = `votedSong${songID}`
    // console.log("songCookieName",songCookieName)

    // const allCookies = cookiesList.getAll()

  
    // await popAdCookie(allCookies)

  const hasCookie = cookiesList.has(songCookieName)
//   console.log("hasCookie",hasCookie)
        
  const oneDay = 24 * 60 * 60 * 1000;
  const hrs12 = 12 * 60 * 60 * 1000;

  const min10 = 10 * 60 * 1000;


//   string to array from json
    if(hasCookie) {

        return true;
    }
 
    if(!hasCookie) {
            cookies().set(`${songCookieName}`, `voted`, { expires: Date.now() + hrs12 })
            return false;
    }
}