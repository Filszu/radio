// "add song client comp btn"

'use client'
import { useToast } from "@/components/ui/use-toast"
import { Button } from "./ui/button"



const AddSongBtn = (action:void) => {
    const { toast } = useToast()

    return (
        <Button formAction={action} type="submit">xxxxxxx</Button>
    )
}

export default AddSongBtn