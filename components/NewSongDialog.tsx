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