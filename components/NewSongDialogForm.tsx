'use client'
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
import { useToast } from "./ui/use-toast"
import { IActionMSG } from "@/types"
type Props = {
  partyId: number
  votingFinishAt: string;
}

const NewSongDialogForm = async(props: Props) => {

     const { toast } = useToast();
     async function handleSubmit(formData: FormData){
    // 'use server'
    console.log('============submitting form')
    const submitingFormStatus:IActionMSG | undefined= await submitNewSongForm(
      {
        formData: formData,
        partyId: props.partyId,
        votingFinishAt: props.votingFinishAt
      }
    )
   
    console.log(submitingFormStatus)

    if(submitingFormStatus){
      toast({
        title: `${submitingFormStatus.title}`,
        description: `${submitingFormStatus.message}`,
        variant: `${submitingFormStatus.status===200 ? "success" : "destructive"}`,
      })   
    }
   


    // alert(submitingFormStatus.message)
   
    
  }

   
  return (
    <form 
    action={handleSubmit}
    >
      <DialogHeader>
        <DialogTitle>Add a new song</DialogTitle>
        <DialogDescription>
        Here you can add a new song suggestion to the list
        <br />
        <div className="flex justify-center items-baseline">
            <AiOutlineYoutube size={40}/>
            <span className="mx-5"></span>
            <BsSpotify size={40}/>
        </div>
        
        
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          
          <Label htmlFor="songURL" className="text-right">
            song url
          </Label>
          
          <Input
            id="songURL"
            name="songURL"
            // defaultValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            defaultValue={"https://open.spotify.com/track/05EG9LwFCVjkoYEWzsrHHO?si=b821993f06934e52"}
            className="col-span-3"
          />
        </div>
        {/* <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Username
          </Label>
          <Input
            id="username"
            defaultValue="@peduarte"
            className="col-span-3"
          />
        </div> */}
      </div>
      <DialogFooter>
        
        <DialogTrigger asChild>
          <Button type="submit">Add song🎵</Button>
          
        </DialogTrigger>

        
        
        
      </DialogFooter>
    </form>
  )
}

export default NewSongDialogForm