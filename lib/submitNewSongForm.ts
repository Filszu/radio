'use server'
import getSpotifyToken from "@/config/spotifyClient"
import { AddedSongCookie } from "./cookies/addSongCookies"
import postSong from "./postSong"
import { genSpotifyUrl } from "@/utils/genSpotifyUrl"
import putSongInfo from "./putSong"
import { revalidatePath } from "next/cache"

export async function submitNewSongForm(formData: FormData){
    
    const returnMSG:IActionMSG = {
        message:"Dodano nowy utwór",
        title:"Success",
        status:200,
        type:"success",


    }

    const canUserAddSong = await AddedSongCookie()
    console.log(canUserAddSong)
    if(canUserAddSong>130){
      console.log('You can add only 3 songs per day')
      return 
    }

    const rowID = await postSong(formData)

    console.log("$$$$$$$$$$$$$$$$$$$", rowID)
    


    if(rowID){
      if(genSpotifyUrl(formData.get('songURL') as string))
      {
         const accessToken = await getSpotifyToken()
        const res = await putSongInfo({songID: rowID, accessToken:accessToken})

      }

      
      
     
      
      

    }

    console.log(returnMSG)
    return returnMSG;
    
    // revalidatePath("/")


    // setOpen(false)
  }

  export async function succesSubmition(){
    revalidatePath("/")
  }