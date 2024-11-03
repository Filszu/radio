// 'use client'

'use server'
import { cookies } from 'next/headers'

export async function createPoPCookie(){

    const cookiesList = cookies()


  

    const cookieName = `eventCount`
 

  const hasCookie = cookiesList.has(cookieName)
        
  const oneDay = 24 * 60 * 60 * 1000;
  const hrs12 = 12 * 60 * 60 * 1000;

  const min10 = 10 * 60 * 1000;


//   string to array from json
    if(hasCookie) {

        return true;
    }
 
    if(!hasCookie) {
            cookies().set(`${cookieName}`, `event`, { expires: Date.now() + hrs12 })
            return false;
    }
}