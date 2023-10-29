// "add song client comp btn"

'use client'
import { useToast } from "@/components/ui/use-toast"
import { Button } from "./ui/button"



const AddSongBtn = () => {
    const { toast } = useToast()

    return (
        <>
        <Button  
        onClick={()=>
            toast({
                title: "xxx",
                description: "xxxx",
                variant: "destructive",
              })
        } 
        type="submit">xxxxxxx
        </Button>
        </>
    )
}

export default AddSongBtn