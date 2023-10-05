import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import postSong from "@/lib/postSong"

import {AiOutlineYoutube} from 'react-icons/ai'
import {BsSpotify} from 'react-icons/bs'

type Props = {}

const NewSongDialog = async(props: Props) => {

 
  return (
    
    <Dialog>
    <DialogTrigger asChild>
      <Button>Dodaj nowy utwór</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
    <form action={postSong}>
      <DialogHeader>
        <DialogTitle>Dodaj nowy utwór</DialogTitle>
        <DialogDescription>
        W tym miejscu możesz dodać nową propozycję piosenki do listy
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
            defaultValue="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
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
        <Button type="submit">dodaj piosenkę</Button>
      </DialogFooter>
    </form>
    </DialogContent>
  </Dialog>
  
  )
}

export default NewSongDialog