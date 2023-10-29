// TODO: later check if song is already in db, and then just update the updated field
// 'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  // DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import getSpotifyToken from "@/config/spotifyClient"
import { AddedSongCookie } from "@/lib/cookies/addSongCookies"
import postSong from "@/lib/postSong"
import putSongInfo from "@/lib/putSong"
import { genSpotifyUrl } from "@/utils/genSpotifyUrl"
import { revalidatePath } from "next/cache"



import {AiOutlineYoutube} from 'react-icons/ai'
import {BsSpotify} from 'react-icons/bs'
import { submitNewSongForm } from "@/lib/submitNewSongForm"

import AddSongBtn from "./NewSongDialogBtn"
import NewSongDialogForm from "./NewSongDialogForm"
// import AddSongBtn from "./NewSongDialogBtn"


type Props = {}


const NewSongDialog = async(props: Props) => {
  
  // const [open, setOpen] = useState(false);

  
  
  
 

  // async function handleSubmit(formData: FormData){
  //   // 'use server'
  //   console.log('============submitting form')
  //   const submitingFormStatus:IActionMSG = await submitNewSongForm(formData)
   
  //   console.log(submitingFormStatus)


  //   // alert(submitingFormStatus.message)
   
    
  // }

  
  return (
    
    <Dialog 
    // open={open} onOpenChange={setOpen}
    >
     



    <DialogTrigger asChild>
      <Button>Dodaj nowy utwór</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <NewSongDialogForm/>
    </DialogContent>
  </Dialog>
  
  )
}





export default NewSongDialog