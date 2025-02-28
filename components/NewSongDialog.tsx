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
  votingFinishAt: string;
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
    <DialogContent className="sm:max-w-[505px] p-10 md:max-w-[805px] md:p-20">
      <NewSongDialogForm
      partyId={props.partyId}
      votingFinishAt={props.votingFinishAt}
      />
    </DialogContent>
  </Dialog>
  
  )
}





export default NewSongDialog