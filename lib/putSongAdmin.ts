'use server'

import supabase from "@/config/supaBaseClient";
import { revalidatePath } from "next/cache";

interface songToUpdate{
    formData: FormData,
    id: string
}
// maybe check admin pass 
export default async function putSongAdmin({formData, id}: songToUpdate) {

    console.log("formData", formData)
    console.log("id", id)

    let votesPlus,votesMinus,dailyVotesPlus,dailyVotesMinus,status;
    if(formData.get("votes")||formData.get("status"))
    {
       

      
        if(formData.get("status")){
            status = formData.get("status")?.toString()
        }

        if(formData.get("votesPlus")){
            votesPlus = formData.get("votesPlus")?.toString()
        }
        if(formData.get("votesMinus")){
            votesMinus = formData.get("votesMinus")?.toString()
        }
        if(formData.get("dailyVotesPlus")){
            dailyVotesPlus = formData.get("dailyVotesPlus")?.toString()
        }
        if(formData.get("dailyVotesMinus")){
            dailyVotesMinus = formData.get("dailyVotesMinus")?.toString()
        }
        
        
        try{

            console.log(votesPlus,votesMinus,dailyVotesPlus,dailyVotesMinus,status)
            const { data:uSongs, error } = await supabase
            .from('uSongs')
            .update(
             {
                votesPlus: votesPlus??0,
                votesMinus: votesMinus??0,
                dailyVotesPlus: dailyVotesPlus??0,
                dailyVotesMinus: dailyVotesMinus??0,

                status: status??"active"
     
             }
             )
            .eq('id', id)
            .select()

            if(error){
                    console.log(error)
                    return new Error(`${error}`)
                
            }
            if(uSongs){
                console.log(uSongs)
                return "success"
         
            }

            revalidatePath("/admin-dashboard")
            revalidatePath("/")

        }
         catch(error){
             console.log(error)
             return new Error("Error updating song")
         }
    }

   
    



    


    
    
   
    


    
    
    
}