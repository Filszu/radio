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
    if(canUserAddSong>300){
      console.log('You can add only 3 songs per day')

      returnMSG.message = "Możesz dodać tylko 3 utwory dziennie"
    returnMSG.title = "Error"
    returnMSG.status = 400
    returnMSG.type = "error"
      return returnMSG
    }

    const rowID = await postSong(formData)

    console.log("$$$$$$$$$$$$$$$$$$$", rowID)
    


    if(rowID){
      if(genSpotifyUrl(formData.get('songURL') as string))
      {

         const accessToken = await getSpotifyToken()
        const res = await putSongInfo({songID: rowID, accessToken:accessToken})

        if(!res){
            returnMSG.message = "Cannot get song data from spotify"
            returnMSG.title = "Error"
            returnMSG.status = 400
            returnMSG.type = "error"
            return returnMSG
        }



      }else{
        
      }

    }else{
        
      returnMSG.message = "Sth went wrong"
      returnMSG.title = "Error"
      returnMSG.status = 400
      returnMSG.type = "error"
    return returnMSG
    }

    console.log(returnMSG)
    return returnMSG;
    
    // revalidatePath("/")


    // setOpen(false)
  }

  export async function succesSubmition(){
    revalidatePath("/")
  }