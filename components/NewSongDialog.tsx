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
import {
    
  Headphones,
  Music2,


} from 'lucide-react'


import NewSongDialogForm from "./NewSongDialogForm"
// import AddSongBtn from "./NewSongDialogBtn"


type Props = {
  partyId: number
}


const NewSongDialog = async(props: Props) => {
  


  
  return (
    
    <Dialog 
    >
     



    <DialogTrigger asChild>
      <Button className="font-bold">Add new SONG
        <Music2/>
        </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <NewSongDialogForm
      partyId={props.partyId}
      />
    </DialogContent>
  </Dialog>
  
  )
}





export default NewSongDialog